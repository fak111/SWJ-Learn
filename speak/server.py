#!/usr/bin/env python3
"""口语试卷录音页的本地服务：零依赖，只监听 127.0.0.1。

    python3 speak/server.py        # 打开 http://127.0.0.1:8765

数据目录默认 ~/temp/eng（SPEAK_DATA 可覆盖），不进仓库：
    papers/<paper>.json               试卷，AI 写入
    sessions/<paper>/<slot>.<ext>     录音，页面上传
    sessions/<paper>/submitted.json   提交标记，AI 侧据此开始分析
    sessions/<paper>/<slot>.feedback.json  即时反馈（本机 Whisper 转写 + MiniMax 改正）
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


def chat(system, user):
    """MiniMax 文本模型；去掉回复里的思考过程。"""
    d = minimax_post('/v1/text/chatcompletion_v2', {'model': 'MiniMax-M2', 'messages': [
        {'role': 'system', 'content': system}, {'role': 'user', 'content': user}]}, timeout=90)
    try:
        return d['choices'][0]['message']['content'].split('</think>')[-1].strip()
    except (KeyError, IndexError, TypeError) as e:
        raise ServiceError('MiniMax 没返回内容') from e


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


def transcribe(audio):
    """本机 Whisper 转写英文（mlx-whisper，模型已缓存在本机，不联网）。"""
    with tempfile.TemporaryDirectory() as tmp:
        cmd = ['uvx', '--from', 'mlx-whisper', '--with', 'httpx[socks]', 'mlx_whisper', str(audio),
               '--model', 'mlx-community/whisper-large-v3-turbo-q4', '--language', 'en',
               '--output-format', 'txt', '--output-dir', tmp, '--output-name', 'out',
               '--condition-on-previous-text', 'False', '--verbose', 'False']
        try:
            subprocess.run(cmd, env={**os.environ, 'HF_HUB_OFFLINE': '1', 'UV_HTTP_TIMEOUT': '300'},
                           capture_output=True, timeout=180, check=True)
            return Path(tmp, 'out.txt').read_text().strip().replace('\n', ' ')
        except (OSError, subprocess.SubprocessError) as e:
            raise ServiceError(f'本机转写失败：{e}') from e


FEEDBACK_PROMPT = """你是一位耐心的英语口语教练，学生是中国成年人（六级水平），目标是「能把意思说清楚」，不追求完美和华丽。
给你：题目、本题学生正在学的目标说法、学生这段英语口语的语音转写（转写可能把发音不清的词写错）。
只输出 JSON，不要其他文字：
{"good": ["1-2 条：他说对了什么，引用原话；必须是真的说对了的完整片段"],
 "fixes": [{"said": "他的原话片段", "better": "改正后的说法", "why": "一句中文：为什么改"}],
 "sounds": ["转写里不像真实单词的地方：原转写 → 他应该是想说的词"]}
规则：
1. fixes 最多 3 条，只挑影响听懂的错误；不影响理解的小错忽略。
2. better 优先用「目标说法」里的原词；没有对应的就用六级词汇的简单说法。绝不引入比目标说法更难的习语。
3. 学生想表达的意思优先对照目标说法来猜：转写像目标说法但写错了，就判为发音不清，放进 sounds，不放进 fixes。
4. 只改那一处，不重写整段。"""


def targets(q):
    """本题的目标说法：提示里的「试着用上」、要点、映射、点评（发音小练的例句在点评里）。"""
    maps = [f"{m.get('thought', '')}：{m.get('can', '')} / {m.get('natural', '')}" for m in q.get('mappings') or []]
    return '\n'.join(t for t in [q.get('hint', ''), *(q.get('points') or []), *maps, q.get('note', '')] if t)


def parse_feedback(content):
    """MiniMax 回复 → {good, fixes, sounds}。规则：做对的最多 2 条且不能和改正冲突，改正最多 3 条。"""
    m = re.search(r'\{.*\}', content, re.S)
    try:
        d = json.loads(m.group()) if m else None
    except ValueError:
        d = None
    if not isinstance(d, dict):
        raise ServiceError('反馈格式不对，点重试')
    fixes = [{k: str(f.get(k, '')) for k in ('said', 'better', 'why')}
             for f in d.get('fixes') or [] if isinstance(f, dict) and f.get('said') and f.get('better')][:3]
    said = [f['said'].lower() for f in fixes]
    good = [g for g in d.get('good') or [] if isinstance(g, str)
            and not any(x in g.lower() or g.lower() in x for x in said)][:2]
    return {'good': good, 'fixes': fixes, 'sounds': [x for x in d.get('sounds') or [] if isinstance(x, str)][:3]}


def feedback(paper, slot):
    """转写一段英文录音并出改正，存成 <slot>.feedback.json。"""
    if slot.endswith('-zh'):
        raise ServiceError('中文段不出反馈', 400)
    recs = rec_files(paper, slot)
    if not recs:
        raise ServiceError('这段还没录', 404)
    rec, mtime = recs[0], recs[0].stat().st_mtime
    qs = json.loads((DATA / 'papers' / f'{paper}.json').read_text()).get('questions', [])
    q = next((q for i, q in enumerate(qs) for s in q.get('slots') or DEFAULT_SLOTS if slot_key(q, i, s) == slot), {})
    said = '' if is_silent(rec) else transcribe(rec)
    result = {'transcript': said, 'good': [], 'fixes': [], 'sounds': []}
    if re.search(r'[A-Za-z]{2}', said):
        result.update(parse_feedback(chat(FEEDBACK_PROMPT, f"题目：{q.get('prompt', '')}\n本题目标说法：\n{targets(q)}\n转写：{said}")))
    # 转写期间被重录或删了：这份反馈作废，不落盘
    if rec_files(paper, slot) == [rec] and rec.stat().st_mtime == mtime:
        atomic_write(rec.with_name(f'{slot}.feedback.json'), json.dumps(result, ensure_ascii=False).encode())
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
