#!/usr/bin/env python3
"""口语试卷录音页的本地服务：零依赖，只监听 127.0.0.1。

    python3 speak/server.py        # 打开 http://127.0.0.1:8765

数据目录默认 ~/temp/eng（SPEAK_DATA 可覆盖），不进仓库：
    papers/<paper>.json               试卷，AI 写入
    sessions/<paper>/<slot>.<ext>     录音，页面上传
    sessions/<paper>/submitted.json   提交标记，AI 侧据此开始分析
"""
import json
import os
import re
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = Path(os.environ.get('SPEAK_DATA', '~/temp/eng')).expanduser()
PORT = int(os.environ.get('PORT', '8765'))
ID = re.compile(r'^[a-z0-9_-]{1,64}$')
EXT = {'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/ogg': 'ogg'}
MIME = {v: k for k, v in EXT.items()}
MAX_BYTES = 50 * 1024 * 1024  # ponytail: 5 分钟 opus 约 3MB，留足余量


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
        parts = self.path.split('?')[0].strip('/').split('/')
        if parts == ['']:
            return ('index', None, None)
        if parts[0] != 'api' or len(parts) < 2 or not all(ID.match(p) for p in parts[2:]):
            return None
        action, rest = parts[1], parts[2:]
        if action == 'papers' and not rest:
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
