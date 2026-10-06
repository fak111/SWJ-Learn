#!/usr/bin/env python3
"""口语试卷录音页的本地服务：零依赖，只监听 127.0.0.1。

    python3 speak/server.py        # 打开 http://127.0.0.1:8765

数据目录默认 ~/temp/eng（SPEAK_DATA 可覆盖），不进仓库：
    papers/<paper>.json               试卷，AI 写入
    sessions/<paper>/<slot>.<ext>     录音，页面上传
    sessions/<paper>/submitted.json   提交标记，AI 侧据此开始分析
    sessions/<paper>/<slot>.feedback.json  即时反馈（本机 Whisper 转写 + 本机 claude -p 写反馈）
    profile.md / mappings.md / pronunciation.md  学生背景与学过的说法（Claude 维护，写反馈时带上）
    history.jsonl                     每次即时反馈出过的问题，写反馈时带上
    tts/<sha1>.mp3                    英文发音缓存（MiniMax，需环境变量 MINIMAX_API_KEY）
"""
import hashlib
import json
import os
import re
import subprocess
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = Path(os.environ.get('SPEAK_DATA', '~/temp/eng')).expanduser()
PORT = int(os.environ.get('PORT', '8765'))
ID = re.compile(r'^[a-z0-9_-]{1,64}$')
EXT = {'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/ogg': 'ogg'}
MIME = {v: k for k, v in EXT.items()}
MAX_BYTES = 50 * 1024 * 1024  # ponytail: 5 分钟 opus 约 3MB，留足余量
VOICE = 'English_Trustworthy_Man'  # MiniMax 系统音色里的通用美式口音
TTS_TEXT = re.compile(r"[A-Za-z0-9 ,.'’?!:;()-]{1,300}")  # 只读英文，挡住中文和超长文本
SILENCE_DB = -45  # 峰值低于它算没声音；实测说话峰值约 0 dB、静音 -91 dB，麦克风偏小再调


def paper_ids():
    # p2 排在 p10 前面
    return sorted((p.stem for p in (DATA / 'papers').glob('*.json') if ID.match(p.stem)), key=lambda s: (len(s), s))


def rec_files(paper, slot=None):
    d = DATA / 'sessions' / paper
    return [p for p in d.glob(f'{slot or "*"}.*') if p.suffix[1:] in MIME] if d.is_dir() else []


def atomic_write(path, data):
    tmp = path.with_name(f'.{path.name}.part')
    tmp.write_bytes(data)
    os.replace(tmp, path)


def unsubmit(paper):
    """录音改了，旧的提交就作废，要重新点提交。"""
    (DATA / 'sessions' / paper / 'submitted.json').unlink(missing_ok=True)


class ServiceError(Exception):
    """外部服务（MiniMax、本机转写）出错；消息直接给页面看。"""
    def __init__(self, msg, status=502):
        super().__init__(msg)
        self.status = status


def minimax_post(path, payload, timeout):
    key = os.environ.get('MINIMAX_API_KEY')
    if not key:
        raise ServiceError('服务没拿到 MINIMAX_API_KEY')
    req = urllib.request.Request(f'https://api.minimaxi.com{path}', data=json.dumps(payload).encode(), headers={
        'Authorization': f'Bearer {key}', 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            d = json.load(r)
    except (urllib.error.URLError, TimeoutError, ValueError) as e:
        raise ServiceError(f'MiniMax 请求失败：{e}') from e
    base = d.get('base_resp') or {}
    if base.get('status_code') == 1008:
        raise ServiceError('MiniMax 余额不足，充值后再点')
    if base.get('status_code') == 1002:
        raise ServiceError('MiniMax 限流，稍等几秒再点', 429)
    if base.get('status_code') != 0:
        raise ServiceError(f"MiniMax 返回错误 {base.get('status_code')} {base.get('status_msg')}")
    return d


def minimax(text):
    """合成一段 mp3。"""
    d = minimax_post('/v1/t2a_v2', {
        'model': 'speech-2.6-hd', 'text': text, 'stream': False, 'language_boost': 'English', 'output_format': 'hex',
        'voice_setting': {'voice_id': VOICE, 'speed': 1.0, 'vol': 1.0, 'pitch': 0},
        'audio_setting': {'sample_rate': 24000, 'bitrate': 128000, 'format': 'mp3', 'channel': 1},
    }, timeout=30)
    if not (d.get('data') or {}).get('audio'):
        raise ServiceError('MiniMax 没返回音频')
    return bytes.fromhex(d['data']['audio'])


def tts(text):
    """同一句只合成一次，缓存在数据目录。"""
    f = DATA / 'tts' / (hashlib.sha1(f'{VOICE}|{text}'.encode()).hexdigest() + '.mp3')
    if not f.exists():
        audio = minimax(text)
        f.parent.mkdir(parents=True, exist_ok=True)
        atomic_write(f, audio)
    return f.read_bytes()


def is_silent(audio):
    """Whisper 遇到静音会编出「Thank you.」之类，先用音量挡掉。"""
    try:
        p = subprocess.run(['ffmpeg', '-v', 'info', '-i', str(audio), '-af', 'volumedetect', '-f', 'null', '-'],
                           capture_output=True, text=True, timeout=60)
    except (OSError, subprocess.SubprocessError) as e:
        raise ServiceError(f'测音量失败：{e}') from e
    m = re.search(r'max_volume: (-inf|-?[\d.]+) dB', p.stderr)
    if p.returncode or not m:  # 解码失败不能当成静音，否则真故障会被说成「检查麦克风」
        raise ServiceError(f"测音量失败：{(p.stderr.strip().splitlines() or ['ffmpeg 没输出'])[-1]}")
    return float(m.group(1)) < SILENCE_DB


def transcribe(audio, lang='en'):
    """本机 Whisper 转写（mlx-whisper，模型已缓存在本机，不联网）。"""
    with tempfile.TemporaryDirectory() as tmp:
        cmd = ['uvx', '--from', 'mlx-whisper', '--with', 'httpx[socks]', 'mlx_whisper', str(audio),
               '--model', 'mlx-community/whisper-large-v3-turbo-q4', '--language', lang,
               '--output-format', 'txt', '--output-dir', tmp, '--output-name', 'out',
               '--condition-on-previous-text', 'False', '--verbose', 'False']
        try:
            subprocess.run(cmd, env={**os.environ, 'HF_HUB_OFFLINE': '1', 'UV_HTTP_TIMEOUT': '300'},
                           capture_output=True, timeout=180, check=True)
            return Path(tmp, 'out.txt').read_text().strip().replace('\n', ' ')
        except (OSError, subprocess.SubprocessError) as e:
            raise ServiceError(f'本机转写失败：{e}') from e


def claude(prompt):
    """用本机 Claude Code（主人的额度）写反馈：不读设置、不开工具和 MCP，只要一段文字。"""
    cmd = ['claude', '-p', '--model', 'sonnet', '--setting-sources', '', '--tools', '',
           '--strict-mcp-config', '--no-session-persistence']
    try:  # 提示词走 stdin：内容以「-」开头也不会被当成命令行选项
        p = subprocess.run(cmd, cwd=DATA, input=prompt, capture_output=True, text=True, timeout=120)
    except (OSError, subprocess.SubprocessError) as e:
        raise ServiceError(f'Claude 没响应：{e}') from e
    if p.returncode:
        raise ServiceError(f"Claude 出错：{((p.stderr or p.stdout).strip().splitlines() or ['没有输出'])[-1]}")
    return p.stdout


FEEDBACK_RULES = """只输出 JSON，不要其他文字：
{"cheer": "一句话：这次具体进步在哪；他说对了以前出过问题的说法就点出来",
 "good": ["1-2 条：引用他英文里真的说对的原话，加一句中文说好在哪"],
 "upgrades": [{"thought": "他想表达的意思（中文）", "said": "他的原话片段", "natural": "地道自然的英文说法，六级词汇能懂", "old": false}],
 "sounds": [{"heard": "转写里不像真实单词的片段", "word": "他应该是想说的英文词", "tip": "一句中文：怎么读"}]}
规则：
1. upgrades 最多 3 条，只挑影响听懂的；old 为 true 表示他以前出过同样的问题。
2. 先对照题目和中文猜他想表达什么；转写像某个词但写错了，归为 sounds，不归 upgrades。
3. 每处只给一个自然说法，不给多个版本；不重写整段。
4. 不用「错」「不对」这类字眼；先肯定，再给往上走的台阶。"""


def read_data(name):
    f = DATA / name
    return f.read_text().strip() if f.exists() else '暂无'


def history_digest():
    """以前的即时反馈里出过的问题，让模型认得出老问题、也看得到进步。"""
    f = DATA / 'history.jsonl'
    lines, sounds = [], []
    for line in f.read_text().splitlines() if f.exists() else []:
        try:
            r = json.loads(line)
            t = r['time'][:10]
            lines += [f"- {t} {u['thought']}：他说「{u['said']}」→ {u['natural']}" for u in r['upgrades']]
            sounds += [f"- {t} 发音：{x['heard']} → {x['word']}" for x in r['sounds']]
        except (ValueError, KeyError, TypeError):
            continue  # 坏行（写到一半崩掉、字段不全）跳过，别让以后所有反馈都挂
    lines += sounds
    return '\n'.join(lines[-60:]) or '暂无'  # ponytail: 只带最近 60 条，记录多了再按问题去重


def append_history(paper, slot, q, said, result):
    rec = {'time': time.strftime('%Y-%m-%dT%H:%M:%S'), 'paper': paper, 'slot': slot, 'question': q.get('prompt', ''),
           'said': said, 'upgrades': result['upgrades'], 'sounds': result['sounds']}
    with (DATA / 'history.jsonl').open('a') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')


def targets(q):
    """本题的目标说法：提示里的「试着用上」、要点、映射、点评（发音小练的例句在点评里）。"""
    maps = [f"{m.get('thought', '')}：{m.get('natural', '')}" for m in q.get('mappings') or []]
    return '\n'.join(t for t in [q.get('hint', ''), *(q.get('points') or []), *maps, q.get('note', '')] if t)


def feedback_prompt(q, zh, en):
    return f"""{read_data('profile.md')}

## 他学过的说法（映射表）
{read_data('mappings.md')}

## 他已知的发音问题
{read_data('pronunciation.md')}

## 他以前的问题（最近的即时反馈记录）
{history_digest()}

## 这一题
题目：{q.get('prompt', '')}
本题想让他用上的说法（只用来理解他的意思，不要硬塞进改写里）：
{targets(q) or '无'}
他先用中文说的（转写，可能有错字）：{zh or '（没录中文）'}
他接着用英文说的（语音转写，发音不清的词可能被写错）：{en}

{FEEDBACK_RULES}"""


def parse_feedback(content):
    """模型回复 → {cheer, good, upgrades, sounds}。做对的最多 2 条且不能和台阶冲突；台阶、发音各最多 3 条。"""
    m = re.search(r'\{.*\}', content, re.S)
    try:
        d = json.loads(m.group()) if m else None
    except ValueError:
        d = None
    if not isinstance(d, dict):
        raise ServiceError('反馈格式不对，点重试')
    s = lambda v: v if isinstance(v, str) else ''  # noqa: E731
    ups = [{'thought': s(u.get('thought')), 'said': s(u.get('said')), 'natural': s(u.get('natural')), 'old': u.get('old') is True}
           for u in d.get('upgrades') or [] if isinstance(u, dict) and s(u.get('natural'))][:3]
    said = [u['said'].lower() for u in ups if len(u['said']) >= 4]  # 太短的片段（如 a、it）几乎每句都含，会误删表扬
    good = [g for g in d.get('good') or [] if isinstance(g, str)
            and not any(x in g.lower() or g.lower() in x for x in said)][:2]
    sounds = [{'heard': s(x.get('heard')), 'word': s(x.get('word')), 'tip': s(x.get('tip'))}
              for x in d.get('sounds') or [] if isinstance(x, dict) and s(x.get('word'))][:3]
    return {'cheer': s(d.get('cheer')), 'good': good, 'upgrades': ups, 'sounds': sounds}


def feedback(paper, slot):
    """转写一段英文录音（带上同题的中文）并让 Claude 写反馈，存成 <slot>.feedback.json，记进历史。"""
    if slot.endswith('-zh'):
        raise ServiceError('中文段不出反馈', 400)
    recs = rec_files(paper, slot)
    if not recs:
        raise ServiceError('这段还没录', 404)
    rec, mtime = recs[0], recs[0].stat().st_mtime
    qs = json.loads((DATA / 'papers' / f'{paper}.json').read_text()).get('questions', [])
    i, q = next(((i, q) for i, q in enumerate(qs) for s in q.get('slots') or DEFAULT_SLOTS if slot_key(q, i, s) == slot),
                (0, None))
    if q is None:  # 题位对不上题目：别带着空上下文悄悄出反馈
        raise ServiceError('试卷里找不到这道题', 404)
    said = '' if is_silent(rec) else transcribe(rec)
    result = {'transcript': said, 'cheer': '', 'good': [], 'upgrades': [], 'sounds': []}
    if re.search(r'[A-Za-z]{2}', said):
        zh_recs = rec_files(paper, slot_key(q, i, {'id': 'zh'}))
        zh = '' if not zh_recs or is_silent(zh_recs[0]) else transcribe(zh_recs[0], 'zh')
        result.update(parse_feedback(claude(feedback_prompt(q, zh, said))))
    # 转写期间被重录或删了：这份反馈作废，不落盘、不进历史
    if rec_files(paper, slot) == [rec] and rec.stat().st_mtime == mtime:
        atomic_write(rec.with_name(f'{slot}.feedback.json'), json.dumps(result, ensure_ascii=False).encode())
        if said:
            append_history(paper, slot, q, said, result)
    return result


DEFAULT_SLOTS = [{'id': 'zh'}, {'id': 'en'}]


def slot_key(q, i, s):
    """和页面上 `${q.id ?? 'q' + (i + 1)}-${s.id}` 一模一样，才能从题位找回题目。"""
    qid = q.get('id')
    return f"{f'q{i + 1}' if qid is None else qid}-{s.get('id')}"


def drop_feedback(paper, slot):
    (DATA / 'sessions' / paper / f'{slot}.feedback.json').unlink(missing_ok=True)


class Handler(BaseHTTPRequestHandler):
    def reply(self, code, body=b'', ctype='application/json; charset=utf-8'):
        if not isinstance(body, bytes):
            body = json.dumps(body, ensure_ascii=False).encode()
        self.send_response(code)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def parse(self):
        """返回 (动作, 试卷, 题位)；路径不合法返回 None。"""
        # 防 DNS rebinding：只认本机名访问
        if self.headers.get('Host', '').rsplit(':', 1)[0] not in ('127.0.0.1', 'localhost'):
            return None
        # 挡外部网页借浏览器打本地接口（比如嵌 <audio> 刷 MiniMax 余额）；curl / AI 侧不带这个头，放行
        if self.headers.get('Sec-Fetch-Site', 'same-origin') not in ('same-origin', 'none'):
            return None
        parts = self.path.split('?')[0].strip('/').split('/')
        if parts == ['']:
            return ('index', None, None)
        if parts[0] != 'api' or len(parts) < 2 or not all(ID.match(p) for p in parts[2:]):
            return None
        action, rest = parts[1], parts[2:]
        if action in ('papers', 'tts') and not rest:
            return (action, None, None)
        if action in ('paper', 'submit') and len(rest) == 1:
            return (action, rest[0], None)
        if action in ('rec', 'feedback') and len(rest) == 2:
            return (action, rest[0], rest[1])
        return None

    def do_GET(self):
        r = self.parse()
        if not r:
            return self.reply(404, {'error': 'not found'})
        action, paper, slot = r
        if action == 'index':
            return self.reply(200, (HERE / 'index.html').read_bytes(), 'text/html; charset=utf-8')
        if action == 'papers':
            return self.reply(200, paper_ids())
        if action == 'tts':
            text = urllib.parse.parse_qs(urllib.parse.urlsplit(self.path).query).get('text', [''])[0].strip()
            if not TTS_TEXT.fullmatch(text):
                return self.reply(400, {'error': '只能读 300 字符以内的英文'})
            try:
                return self.reply(200, tts(text), 'audio/mpeg')
            except ServiceError as e:
                return self.reply(e.status, {'error': str(e)})
        if action == 'paper':
            f = DATA / 'papers' / f'{paper}.json'
            if not f.exists():
                return self.reply(404, {'error': 'no such paper'})
            return self.reply(200, {
                'paper': json.loads(f.read_text()),
                'recordings': sorted(p.stem for p in rec_files(paper)),
                'submitted': (DATA / 'sessions' / paper / 'submitted.json').exists(),
                'feedback': {f.name.removesuffix('.feedback.json'): json.loads(f.read_text())
                             for f in (DATA / 'sessions' / paper).glob('*.feedback.json')},
            })
        if action == 'rec':
            files = rec_files(paper, slot)
            if not files:
                return self.reply(404, {'error': 'no recording'})
            return self.reply(200, files[0].read_bytes(), MIME[files[0].suffix[1:]])
        self.reply(404, {'error': 'not found'})

    def do_PUT(self):
        r = self.parse()
        if not r or r[0] != 'rec':
            return self.reply(404, {'error': 'not found'})
        _, paper, slot = r
        if not (DATA / 'papers' / f'{paper}.json').exists():
            return self.reply(404, {'error': 'no such paper'})
        ext = EXT.get(self.headers.get('Content-Type', '').split(';')[0].strip())
        try:
            size = int(self.headers.get('Content-Length') or 0)
        except ValueError:
            size = 0  # 下面按 413 拒绝
        if not ext:
            return self.reply(415, {'error': 'unsupported audio type'})
        if not 0 < size <= MAX_BYTES:
            return self.reply(413, {'error': 'bad size'})
        body = self.rfile.read(size)
        if len(body) != size:  # 客户端中途断开：不许半截文件盖掉好录音
            return self.reply(400, {'error': 'incomplete upload'})
        d = DATA / 'sessions' / paper
        d.mkdir(parents=True, exist_ok=True)
        new = d / f'{slot}.{ext}'
        atomic_write(new, body)
        for old in rec_files(paper, slot):
            if old != new:
                old.unlink()
        unsubmit(paper)
        drop_feedback(paper, slot)
        self.reply(200, {'saved': new.name, 'bytes': size})

    def do_DELETE(self):
        r = self.parse()
        if not r or r[0] != 'rec':
            return self.reply(404, {'error': 'not found'})
        for f in rec_files(r[1], r[2]):
            f.unlink()
        unsubmit(r[1])
        drop_feedback(r[1], r[2])
        self.reply(200, {'deleted': r[2]})

    def do_POST(self):
        r = self.parse()
        if not r or r[0] not in ('submit', 'feedback'):
            return self.reply(404, {'error': 'not found'})
        if not (DATA / 'papers' / f'{r[1]}.json').exists():
            return self.reply(404, {'error': 'no such paper'})
        if r[0] == 'feedback':
            try:
                return self.reply(200, feedback(r[1], r[2]))
            except ServiceError as e:
                return self.reply(e.status, {'error': str(e)})
        paper = r[1]
        slots = sorted(p.stem for p in rec_files(paper))
        if not slots:
            return self.reply(400, {'error': 'nothing recorded'})
        mark = {'paper': paper, 'slots': slots, 'submitted_at': time.strftime('%Y-%m-%dT%H:%M:%S%z')}
        atomic_write(DATA / 'sessions' / paper / 'submitted.json', json.dumps(mark, ensure_ascii=False, indent=2).encode())
        self.reply(200, mark)


if __name__ == '__main__':
    print(f'口语试卷：http://127.0.0.1:{PORT}  数据：{DATA}')
    ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
