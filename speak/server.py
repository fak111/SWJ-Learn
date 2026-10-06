#!/usr/bin/env python3
"""口语试卷录音页的本地服务：零依赖，只监听 127.0.0.1。

    python3 speak/server.py        # 打开 http://127.0.0.1:8765

数据目录默认 ~/temp/eng（SPEAK_DATA 可覆盖），不进仓库：
    papers/<paper>.json               试卷，AI 写入
    sessions/<paper>/<slot>.<ext>     录音，页面上传
    sessions/<paper>/submitted.json   提交标记，AI 侧据此开始分析
    tts/<sha1>.mp3                    英文发音缓存（MiniMax，需环境变量 MINIMAX_API_KEY）
"""
import hashlib
import json
import os
import re
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


class TTSError(Exception):
    def __init__(self, msg, status=502):
        super().__init__(msg)
        self.status = status


def minimax(text):
    """调 MiniMax 合成一段 mp3；失败抛 TTSError，消息直接给页面看。"""
    key = os.environ.get('MINIMAX_API_KEY')
    if not key:
        raise TTSError('服务没拿到 MINIMAX_API_KEY')
    body = json.dumps({
        'model': 'speech-2.6-hd', 'text': text, 'stream': False, 'language_boost': 'English', 'output_format': 'hex',
        'voice_setting': {'voice_id': VOICE, 'speed': 1.0, 'vol': 1.0, 'pitch': 0},
        'audio_setting': {'sample_rate': 24000, 'bitrate': 128000, 'format': 'mp3', 'channel': 1},
    }).encode()
    req = urllib.request.Request('https://api.minimaxi.com/v1/t2a_v2', data=body, headers={
        'Authorization': f'Bearer {key}', 'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            d = json.load(r)
    except (urllib.error.URLError, TimeoutError, ValueError) as e:
        raise TTSError(f'MiniMax 请求失败：{e}') from e
    base = d.get('base_resp') or {}
    if base.get('status_code') == 1008:
        raise TTSError('MiniMax 余额不足，充值后再点')
    if base.get('status_code') == 1002:
        raise TTSError('MiniMax 限流，稍等几秒再点', 429)
    if base.get('status_code') != 0 or not (d.get('data') or {}).get('audio'):
        raise TTSError(f"MiniMax 返回错误 {base.get('status_code')} {base.get('status_msg')}")
    return bytes.fromhex(d['data']['audio'])


def tts(text):
    """同一句只合成一次，缓存在数据目录。"""
    f = DATA / 'tts' / (hashlib.sha1(f'{VOICE}|{text}'.encode()).hexdigest() + '.mp3')
    if not f.exists():
        audio = minimax(text)
        f.parent.mkdir(parents=True, exist_ok=True)
        atomic_write(f, audio)
    return f.read_bytes()


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
        if action == 'rec' and len(rest) == 2:
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
            except TTSError as e:
                return self.reply(e.status, {'error': str(e)})
        if action == 'paper':
            f = DATA / 'papers' / f'{paper}.json'
            if not f.exists():
                return self.reply(404, {'error': 'no such paper'})
            return self.reply(200, {
                'paper': json.loads(f.read_text()),
                'recordings': sorted(p.stem for p in rec_files(paper)),
                'submitted': (DATA / 'sessions' / paper / 'submitted.json').exists(),
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
        self.reply(200, {'saved': new.name, 'bytes': size})

    def do_DELETE(self):
        r = self.parse()
        if not r or r[0] != 'rec':
            return self.reply(404, {'error': 'not found'})
        for f in rec_files(r[1], r[2]):
            f.unlink()
        unsubmit(r[1])
        self.reply(200, {'deleted': r[2]})

    def do_POST(self):
        r = self.parse()
        if not r or r[0] != 'submit':
            return self.reply(404, {'error': 'not found'})
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
