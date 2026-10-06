"""python3 -m unittest speak/test_server.py —— 起一个临时数据目录的服务，走一遍接口。"""
import hashlib
import http.client
import io
import json
import os
import socket
import tempfile
import threading
import unittest
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

tmp = Path(tempfile.mkdtemp())
os.environ['SPEAK_DATA'] = str(tmp)
import server  # noqa: E402  读环境变量要在 import 之前

(tmp / 'papers').mkdir()
(tmp / 'papers' / 'p1.json').write_text(json.dumps({'id': 'p1', 'questions': []}))
(tmp / 'papers' / 'p10.json').write_text(json.dumps({'id': 'p10', 'questions': []}))
(tmp / 'papers' / 'p2.json').write_text(json.dumps({'id': 'p2', 'questions': []}))
httpd = server.ThreadingHTTPServer(('127.0.0.1', 0), server.Handler)
threading.Thread(target=httpd.serve_forever, daemon=True).start()
BASE = f'http://127.0.0.1:{httpd.server_address[1]}'


def call(method, path, body=None, ctype=None):
    req = urllib.request.Request(BASE + path, data=body, method=method, headers={'Content-Type': ctype} if ctype else {})
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, r.read(), r.headers.get('Content-Type')
    except urllib.error.HTTPError as e:
        return e.code, e.read(), e.headers.get('Content-Type')


class ServerTest(unittest.TestCase):
    def test_papers_sorted_naturally(self):
        self.assertEqual(json.loads(call('GET', '/api/papers')[1]), ['p1', 'p2', 'p10'])

    def test_record_replace_delete_submit(self):
        self.assertEqual(call('POST', '/api/submit/p1')[0], 400)  # 没录不能交
        self.assertEqual(call('PUT', '/api/rec/p1/q1-zh', b'webm-1', 'audio/webm;codecs=opus')[0], 200)
        self.assertEqual(call('PUT', '/api/rec/p1/q1-zh', b'mp4-2', 'audio/mp4')[0], 200)  # 重录换格式，旧文件要删
        self.assertEqual(sorted(p.name for p in (tmp / 'sessions' / 'p1').iterdir()), ['q1-zh.mp4'])
        code, body, ctype = call('GET', '/api/rec/p1/q1-zh')
        self.assertEqual((code, body, ctype), (200, b'mp4-2', 'audio/mp4'))
        state = json.loads(call('GET', '/api/paper/p1')[1])
        self.assertEqual((state['recordings'], state['submitted']), (['q1-zh'], False))
        self.assertEqual(json.loads(call('POST', '/api/submit/p1')[1])['slots'], ['q1-zh'])
        self.assertTrue(json.loads(call('GET', '/api/paper/p1')[1])['submitted'])
        call('PUT', '/api/rec/p1/q1-zh', b'webm-3', 'audio/webm')  # 交了又重录：旧提交作废
        self.assertFalse(json.loads(call('GET', '/api/paper/p1')[1])['submitted'])
        self.assertEqual(call('DELETE', '/api/rec/p1/q1-zh')[0], 200)
        self.assertEqual(call('GET', '/api/rec/p1/q1-zh')[0], 404)

    def test_rejects_bad_input(self):
        self.assertEqual(call('PUT', '/api/rec/p1/..%2Fescape', b'x', 'audio/webm')[0], 404)
        self.assertEqual(call('PUT', '/api/rec/p1/Q1', b'x', 'audio/webm')[0], 404)  # 只收小写
        self.assertEqual(call('PUT', '/api/rec/nope/q1-zh', b'x', 'audio/webm')[0], 404)  # 试卷不存在
        self.assertEqual(call('PUT', '/api/rec/p2/q1-zh', b'x', 'text/html')[0], 415)
        self.assertEqual(call('GET', '/api/paper/..')[0], 404)
        self.assertFalse((tmp / 'sessions' / 'nope').exists())
        conn = http.client.HTTPConnection('127.0.0.1', httpd.server_address[1])
        conn.request('PUT', '/api/rec/p2/q1-zh', body=b'x', headers={'Content-Type': 'audio/webm', 'Content-Length': 'abc'})
        self.assertEqual(conn.getresponse().status, 413)

    def test_rejects_foreign_host(self):  # DNS rebinding
        conn = http.client.HTTPConnection('127.0.0.1', httpd.server_address[1])
        conn.request('GET', '/api/papers', headers={'Host': 'evil.example:8765'})
        self.assertEqual(conn.getresponse().status, 404)

    def test_truncated_upload_keeps_good_recording(self):
        self.assertEqual(call('PUT', '/api/rec/p2/q9-zh', b'GOOD', 'audio/webm')[0], 200)
        with socket.create_connection(('127.0.0.1', httpd.server_address[1])) as sock:
            sock.sendall(b'PUT /api/rec/p2/q9-zh HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Type: audio/webm\r\n'
                         b'Content-Length: 1000\r\n\r\nTRUNCATED!')
            sock.shutdown(socket.SHUT_WR)  # 发了 10 字节就断
            self.assertIn(b' 400 ', sock.recv(1024))
        self.assertEqual(call('GET', '/api/rec/p2/q9-zh')[1], b'GOOD')


class TTSTest(unittest.TestCase):
    def setUp(self):
        self.real = server.minimax
        self.calls = []
        server.minimax = lambda text: self.calls.append(text) or b'MP3:' + text.encode()

    def tearDown(self):
        server.minimax = self.real

    def test_generates_once_then_serves_cache(self):
        q = '/api/tts?text=' + urllib.parse.quote("I've got this.")
        self.assertEqual(call('GET', q), (200, b"MP3:I've got this.", 'audio/mpeg'))
        self.assertEqual(call('GET', q)[1], b"MP3:I've got this.")
        self.assertEqual(self.calls, ["I've got this."])

    def test_rejects_non_english_or_empty(self):
        for text in ['你好', '', 'a' * 301, 'hi<script>']:
            self.assertEqual(call('GET', '/api/tts?text=' + urllib.parse.quote(text))[0], 400, text)
        self.assertEqual(self.calls, [])

    def test_api_error_reaches_page_and_is_not_cached(self):
        def broke(text):
            raise server.TTSError('MiniMax 余额不足，充值后再点')
        server.minimax = broke
        code, body, _ = call('GET', '/api/tts?text=passive%20income')
        self.assertEqual((code, json.loads(body)['error']), (502, 'MiniMax 余额不足，充值后再点'))
        key = hashlib.sha1(f'{server.VOICE}|passive income'.encode()).hexdigest()
        self.assertFalse((tmp / 'tts' / f'{key}.mp3').exists())

    def test_rejects_cross_site(self):  # 外部网页嵌 <audio> 刷余额
        conn = http.client.HTTPConnection('127.0.0.1', httpd.server_address[1])
        conn.request('GET', '/api/tts?text=hi', headers={'Sec-Fetch-Site': 'cross-site'})
        self.assertEqual(conn.getresponse().status, 404)
        self.assertEqual(self.calls, [])

    def test_minimax_response_parsing(self):
        os.environ['MINIMAX_API_KEY'] = 'test-key'
        real_open = urllib.request.urlopen

        class Resp(io.BytesIO):
            def __enter__(self):
                return self

            def __exit__(self, *a):
                pass

        def fake(payload):
            return lambda req, timeout: Resp(json.dumps(payload).encode())
        try:
            urllib.request.urlopen = fake({'base_resp': {'status_code': 0}, 'data': {'audio': b'ID3'.hex()}})
            self.assertEqual(self.real('hello'), b'ID3')
            urllib.request.urlopen = fake({'base_resp': {'status_code': 1008, 'status_msg': 'insufficient balance'}})
            with self.assertRaisesRegex(server.TTSError, '余额不足'):
                self.real('hello')
            urllib.request.urlopen = fake({'base_resp': {'status_code': 1002, 'status_msg': 'rate limit exceeded(RPM)'}})
            with self.assertRaisesRegex(server.TTSError, '限流') as cm:
                self.real('hello')
            self.assertEqual(cm.exception.status, 429)
            urllib.request.urlopen = fake({'base_resp': {'status_code': 2013, 'status_msg': 'invalid params'}})
            with self.assertRaisesRegex(server.TTSError, '2013'):
                self.real('hello')
        finally:
            urllib.request.urlopen = real_open
            del os.environ['MINIMAX_API_KEY']


if __name__ == '__main__':
    unittest.main()
