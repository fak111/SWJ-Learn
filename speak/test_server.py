"""python3 -m unittest speak/test_server.py —— 起一个临时数据目录的服务，走一遍接口。"""
import hashlib
import http.client
import io
import json
import os
import shutil
import socket
import subprocess
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
        self.assertEqual([p for p in json.loads(call('GET', '/api/papers')[1]) if p.startswith('p')], ['p1', 'p2', 'p10'])

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
            raise server.ServiceError('MiniMax 余额不足，充值后再点')
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
            with self.assertRaisesRegex(server.ServiceError, '余额不足'):
                self.real('hello')
            urllib.request.urlopen = fake({'base_resp': {'status_code': 1002, 'status_msg': 'rate limit exceeded(RPM)'}})
            with self.assertRaisesRegex(server.ServiceError, '限流') as cm:
                self.real('hello')
            self.assertEqual(cm.exception.status, 429)
            urllib.request.urlopen = fake({'base_resp': {'status_code': 2013, 'status_msg': 'invalid params'}})
            with self.assertRaisesRegex(server.ServiceError, '2013'):
                self.real('hello')
        finally:
            urllib.request.urlopen = real_open
            del os.environ['MINIMAX_API_KEY']


class FeedbackTest(unittest.TestCase):
    PAPER = {'id': 'fb', 'questions': [{'id': 'q1', 'prompt': '为什么学英语', 'hint': '试着用上：passive income',
                                        'mappings': [{'thought': '深挖', 'can': 'look into', 'natural': 'dig into'}]}]}
    REPLY = {'cheer': '这次说得更完整了', 'good': [{'quote': 'The goal is', 'fixed': 'The goal is', 'why': '开头很自然'}],
             'upgrades': [{'thought': '被动收入', 'said': 'passing when come', 'natural': 'passive income', 'old': True}],
             'sounds': [{'heard': 'hurt black', 'word': 'headache', 'tip': '读 HED-ake'}]}

    def setUp(self):
        (tmp / 'papers' / 'fb.json').write_text(json.dumps(self.PAPER))
        shutil.rmtree(tmp / 'sessions' / 'fb', ignore_errors=True)
        (tmp / 'history.jsonl').unlink(missing_ok=True)
        self.real = (server.transcribe, server.claude, server.is_silent)
        self.said, self.prompts = 'The goal is passing when come.', []
        server.is_silent = lambda audio: False
        server.transcribe = lambda audio: '我想说被动收入' if str(audio).endswith('-zh.webm') else self.said
        server.claude = lambda prompt: self.prompts.append(prompt) or '```json\n' + json.dumps(self.REPLY) + '\n```'
        call('PUT', '/api/rec/fb/q1-en', b'webm', 'audio/webm')

    def tearDown(self):
        server.transcribe, server.claude, server.is_silent = self.real

    def test_saved_and_returned_with_paper(self):
        code, body, _ = call('POST', '/api/feedback/fb/q1-en')
        self.assertEqual(code, 200)
        self.assertEqual(json.loads(body)['upgrades'][0], self.REPLY['upgrades'][0])
        self.assertIn('dig into', self.prompts[0])  # 目标说法一起给模型
        self.assertIn('passive income', self.prompts[0])
        self.assertNotIn('look into', self.prompts[0])  # 只给自然版
        state = json.loads(call('GET', '/api/paper/fb')[1])
        self.assertEqual(state['feedback']['q1-en']['cheer'], '这次说得更完整了')
        self.assertEqual(state['recordings'], ['q1-en'])  # 反馈文件不算录音

    def test_chinese_take_goes_into_prompt(self):
        self.assertNotIn('我想说被动收入', (call('POST', '/api/feedback/fb/q1-en'), self.prompts[-1])[1])
        call('PUT', '/api/rec/fb/q1-zh', b'webm', 'audio/webm')
        call('POST', '/api/feedback/fb/q1-en')
        self.assertIn('我想说被动收入', self.prompts[-1])

    def test_history_is_kept_and_fed_back(self):  # 老问题保留下来，下次反馈带上
        call('POST', '/api/feedback/fb/q1-en')
        rows = [json.loads(line) for line in (tmp / 'history.jsonl').read_text().splitlines()]
        self.assertEqual((len(rows), rows[0]['said'], rows[0]['upgrades'][0]['natural']), (1, self.said, 'passive income'))
        with (tmp / 'history.jsonl').open('a') as f:
            f.write('{"time": "2026-10-0\n')  # 写到一半崩掉的坏行
            f.write('{"time": "2026-10-06", "upgrades": [{"natural": "x"}], "sounds": []}\n')  # 字段不全的行
        call('POST', '/api/feedback/fb/q1-en')
        self.assertIn('他说「passing when come」→ passive income', self.prompts[-1])
        self.assertIn('发音：hurt black → headache', self.prompts[-1])

    def test_rerecord_or_delete_drops_feedback(self):
        call('POST', '/api/feedback/fb/q1-en')
        call('PUT', '/api/rec/fb/q1-en', b'webm-2', 'audio/webm')
        self.assertEqual(json.loads(call('GET', '/api/paper/fb')[1])['feedback'], {})
        call('POST', '/api/feedback/fb/q1-en')
        call('DELETE', '/api/rec/fb/q1-en')
        self.assertEqual(json.loads(call('GET', '/api/paper/fb')[1])['feedback'], {})

    def test_no_feedback_for_chinese_or_missing(self):
        call('PUT', '/api/rec/fb/q1-zh', b'webm', 'audio/webm')
        self.assertEqual(call('POST', '/api/feedback/fb/q1-zh')[0], 400)
        self.assertEqual(call('POST', '/api/feedback/fb/q9-en')[0], 404)
        self.assertEqual(call('POST', '/api/feedback/nope/q1-en')[0], 404)
        call('PUT', '/api/rec/fb/q7-en', b'webm', 'audio/webm')  # 有录音但试卷里没这题
        self.assertEqual(call('POST', '/api/feedback/fb/q7-en')[0], 404)
        self.assertEqual(self.prompts, [])

    def test_silence_skips_model(self):
        self.said = ''
        body = json.loads(call('POST', '/api/feedback/fb/q1-en')[1])
        self.assertEqual((body['transcript'], body['upgrades'], self.prompts), ('', [], []))
        self.assertFalse((tmp / 'history.jsonl').exists())  # 没说话不进历史

    def test_silent_recording_is_not_transcribed(self):  # Whisper 对静音会编句子
        server.is_silent = lambda audio: True
        server.transcribe = lambda audio: self.fail('静音不该转写')
        self.assertEqual(json.loads(call('POST', '/api/feedback/fb/q1-en')[1])['transcript'], '')

    def test_is_silent_threshold(self):  # 真 ffmpeg：静音判静音，正弦波不判，坏文件报错而不是当静音
        for src, want in [('anullsrc=r=16000:cl=mono', True), ('sine=frequency=440:sample_rate=16000', False)]:
            f = tmp / 'tone.wav'
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', src, '-t', '1', str(f)], check=True)
            self.assertEqual(self.real[2](f), want, src)
        (tmp / 'broken.webm').write_bytes(b'not audio')
        with self.assertRaises(server.ServiceError):
            self.real[2](tmp / 'broken.webm')

    def test_finds_question_like_the_page_does(self):  # 数字题号、带「-」的题位名
        (tmp / 'papers' / 'fb2.json').write_text(json.dumps({'questions': [
            {'id': 1, 'prompt': '数字题号', 'hint': '试着用上 passive income'},
            {'prompt': '没题号', 'hint': '试着用上 dig into', 'slots': [{'id': 'en-a'}]}]}))
        for slot, want in [('1-en', 'passive income'), ('q2-en-a', 'dig into')]:
            call('PUT', f'/api/rec/fb2/{slot}', b'webm', 'audio/webm')
            self.assertEqual(call('POST', f'/api/feedback/fb2/{slot}')[0], 200)
            self.assertIn(want, self.prompts[-1], slot)

    def test_rerecorded_while_transcribing_is_not_saved(self):
        def transcribe(audio):
            call('PUT', '/api/rec/fb/q1-en', b'webm-new', 'audio/webm')
            return self.said
        server.transcribe = transcribe
        call('POST', '/api/feedback/fb/q1-en')
        self.assertFalse((tmp / 'sessions' / 'fb' / 'q1-en.feedback.json').exists())
        self.assertFalse((tmp / 'history.jsonl').exists())  # 作废的反馈也不进历史

    def test_claude_cli(self):  # 用假的 claude 命令走一遍真实的子进程调用
        bin_dir = tmp / 'bin'
        bin_dir.mkdir(exist_ok=True)
        fake = bin_dir / 'claude'
        old_path = os.environ['PATH']
        os.environ['PATH'] = f'{bin_dir}:{old_path}'
        try:
            fake.write_text('#!/bin/sh\ncat\n')  # 原样吐回 stdin：证明提示词走的是 stdin
            fake.chmod(0o755)
            self.assertEqual(self.real[1]('--looks-like-an-option'), '--looks-like-an-option')
            fake.write_text('#!/bin/sh\necho "Claude usage limit reached" >&2\nexit 1\n')
            with self.assertRaisesRegex(server.ServiceError, 'usage limit'):
                self.real[1]('hi')
        finally:
            os.environ['PATH'] = old_path

    def test_disfluency_counts(self):  # 主人第 2 份第 3 题的真实转写片段
        said = 'the big, the big obstacle, obstacle. Is sticking, uh, sticking with uh, the biggest obstacle for me'
        self.assertEqual(server.disfluency(said), (2, 3))  # uh ×2；the big / obstacle / sticking 各原样重说一次
        self.assertEqual(server.disfluency(''), (0, 0))

    def test_trend_of_repeats(self):  # 每段反馈带上最近几段的重说次数
        self.said = 'the the the the most uh headache'
        first = json.loads(call('POST', '/api/feedback/fb/q1-en')[1])
        self.said = 'the most headache'
        second = json.loads(call('POST', '/api/feedback/fb/q1-en')[1])
        self.assertEqual((first['fillers'], first['repeats'], first['trend']), (1, 3, [3]))
        self.assertEqual(second['trend'], [3, 0])

    def test_minimax_transcribe(self):  # 真 ffmpeg 转 mp3，假 MiniMax 接口看收到的请求
        f = tmp / 'speech.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=16000',
                        '-t', '1', str(f)], check=True)
        os.environ['MINIMAX_API_KEY'] = 'test-key'
        real_open, seen = urllib.request.urlopen, {}

        class Resp(io.BytesIO):
            def __enter__(self):
                return self

            def __exit__(self, *a):
                pass

        def fake(payload):
            def handler(req, timeout):
                seen.update(url=req.full_url, ctype=req.headers['Content-type'], body=req.data)
                return Resp(json.dumps(payload).encode())
            return handler
        try:
            urllib.request.urlopen = fake({'text': ' Uh, the real goal is passive income. '})
            self.assertEqual(self.real[0](f), 'Uh, the real goal is passive income.')
            self.assertTrue(seen['url'].endswith('/v1/speech_to_text'))
            self.assertIn('multipart/form-data; boundary=', seen['ctype'])
            self.assertIn(b'name="model"\r\n\r\nasr-1.0', seen['body'])
            self.assertIn(b'Content-Type: audio/mpeg', seen['body'])
            urllib.request.urlopen = fake({'base_resp': {'status_code': 1008, 'status_msg': 'insufficient balance'}})
            with self.assertRaisesRegex(server.ServiceError, '余额不足'):
                self.real[0](f)
        finally:
            urllib.request.urlopen = real_open
            del os.environ['MINIMAX_API_KEY']

    def test_parse_feedback_rules(self):
        same = lambda q: {'quote': q, 'fixed': q, 'why': '好'}  # noqa: E731
        reply = {'cheer': '进步了', 'good': ['plain string', {'quote': 'I has a car.', 'fixed': 'I have a car.', 'why': '好'},
                                          same('I have dragged into it.'), same('The biggest obstacle for me is sticking with it.'),
                                          {'quote': 'Once my English is good enough.', 'fixed': 'once my English is good enough', 'why': '好'},
                                          same('I can travel.')],
                 'upgrades': [{'thought': '深挖', 'said': 'dragged into', 'natural': 'dug into', 'old': 'yes'},
                              {'said': 'runsleep', 'natural': 'while I sleep'}, {'said': 'a', 'natural': 'b', 'old': True},
                              {'said': 'm', 'natural': 'n'}, {'said': 'no natural here'}],
                 'sounds': [{'heard': '1', 'word': 'w1'}, {'heard': '2', 'word': 'w2'}, {'heard': '3', 'word': 'w3'},
                            {'heard': '4', 'word': 'w4'}, {'heard': 'no word'}]}
        out = server.parse_feedback('```json\n' + json.dumps(reply) + '\n```')
        self.assertEqual([u['natural'] for u in out['upgrades']], ['dug into', 'while I sleep', 'b'])  # 最多 3 条
        self.assertEqual([u['old'] for u in out['upgrades']], [False, False, True])  # 只认真正的 true
        # 不是对象、改正版差了词、和台阶冲突的都不要；只按单词比（不管大小写和标点）；最多 2 条
        self.assertEqual(out['good'], ['「The biggest obstacle for me is sticking with it.」——好', '「Once my English is good enough.」——好'])
        self.assertEqual([x['word'] for x in out['sounds']], ['w1', 'w2', 'w3'])
        self.assertEqual(out['cheer'], '进步了')
        with self.assertRaises(server.ServiceError):
            server.parse_feedback('抱歉，我无法回答')

    def test_good_never_quotes_a_line_that_needs_upgrading(self):  # 主人 10-06 实际遇到的：病句被夸成做对的
        same = lambda q, why: {'quote': q, 'fixed': q, 'why': why}  # noqa: E731  模型把病句原样抄成「改正版」时，还得靠冲突过滤兜住
        reply = {'good': [same('I have a holiday and … I spend most time at home', '意思很清楚，at home 也用对了。'),
                          same('The most header thing is to use my code uses', '句子骨架已经搭起来了。'),
                          same('most of the time', '用得很地道。')],
                 'upgrades': [{'said': 'I have a holiday and most I spend most time at home to realize and working with my computer.',
                               'natural': 'I had a seven-day holiday.'},
                              {'said': 'The most header thing is to use my code uses.', 'natural': 'My biggest headache was …'}]}
        self.assertEqual(server.parse_feedback(json.dumps(reply))['good'], ['「most of the time」——用得很地道。'])
        reply = {'good': [same('most time at home', '')], 'upgrades': [{'said': 'most I spend uh most time uh at home to relax', 'natural': 'x'}]}
        self.assertEqual(server.parse_feedback(json.dumps(reply))['good'], [])  # 原话夹着 uh 也认得出是同一处
        reply = {'good': [{'quote': 'I have seven days holiday', 'fixed': 'I had a seven-day holiday', 'why': '意思清楚'}]}
        self.assertEqual(server.parse_feedback(json.dumps(reply))['good'], [])  # 主人 10-06 第二次遇到的：意思对但不地道

    def test_replies_carry_page_version(self):  # 页面据此发现自己过期
        _, _, _ = call('GET', '/api/papers')
        conn = http.client.HTTPConnection('127.0.0.1', httpd.server_address[1])
        conn.request('GET', '/api/papers')
        self.assertEqual(conn.getresponse().getheader('X-Page'), str(int((Path(server.__file__).parent / 'index.html').stat().st_mtime)))


if __name__ == '__main__':
    unittest.main()
