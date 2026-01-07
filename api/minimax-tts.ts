// Vercel Serverless Function for MiniMax TTS
// Uses HTTP API: https://platform.minimaxi.com/docs/api-reference/speech-t2a-http

// MiniMax API 响应类型定义
interface MiniMaxBaseResp {
    status_code: number;
    status_msg?: string;
}

interface MiniMaxData {
    audio?: string;
    status?: number;
}

interface MiniMaxExtraInfo {
    audio_length?: number;
    audio_sample_rate?: number;
    audio_size?: number;
    bitrate?: number;
    word_count?: number;
    audio_format?: string;
    audio_channel?: number;
}

interface MiniMaxResponse {
    base_resp?: MiniMaxBaseResp;
    data?: MiniMaxData;
    extra_info?: MiniMaxExtraInfo;
    trace_id?: string;
}

const getVoiceId = (lang: string): string => {
    if (lang.startsWith('zh')) return 'female-tianmei';
    if (lang.startsWith('ja')) return 'Japanese_KindLady';
    if (lang.startsWith('ko')) return 'Korean_SweetGirl';
    if (lang.startsWith('es')) return 'Spanish_SereneWoman';
    if (lang.startsWith('fr')) return 'French_Female_News Anchor';
    if (lang.startsWith('de')) return 'German_SweetLady';
    return 'English_Graceful_Lady';
};

// 将 hex 字符串转换为 Buffer
function hexToBuffer(hex: string): Buffer {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return Buffer.from(bytes);
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, lang } = req.body;

    if (!text || !lang) {
        return res.status(400).json({ error: 'Missing text or lang parameter' });
    }

    // Vercel Serverless Functions 不会自动注入 VITE_ 前缀的环境变量
    // 优先使用不带 VITE_ 前缀的环境变量（用于生产环境）
    const apiKey = process.env.MINIMAXI_API_KEY || process.env.VITE_MINIMAXI_API_KEY;
    if (!apiKey) {
        console.error('❌ MiniMax API key not configured');
        console.error('   请确保在 Vercel 项目设置中配置了 MINIMAXI_API_KEY 环境变量');
        console.error('   当前环境变量:', {
            hasMINIMAXI: !!process.env.MINIMAXI_API_KEY,
            hasVITE_MINIMAXI: !!process.env.VITE_MINIMAXI_API_KEY,
        });
        return res.status(500).json({
            error: 'MiniMax API key not configured',
            hint: 'Please set MINIMAXI_API_KEY in Vercel environment variables'
        });
    }

    try {
        console.log('🔌 调用 MiniMax HTTP API...');
        console.log('📝 文本:', text.substring(0, 50) + '...');
        console.log('🌐 语言:', lang);

        const response = await fetch('https://api.minimaxi.com/v1/t2a_v2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'speech-2.6-hd',
                text: text,
                stream: false,
                voice_setting: {
                    voice_id: getVoiceId(lang),
                    speed: 1.0,
                    vol: 1.0,
                    pitch: 0,
                },
                audio_setting: {
                    sample_rate: 24000,
                    bitrate: 128000,
                    format: 'mp3',
                    channel: 1,
                },
                output_format: 'hex', // 返回 hex 编码的音频
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ MiniMax API 错误:', response.status, errorText);
            return res.status(response.status).json({
                error: 'MiniMax API error',
                status: response.status,
                details: errorText
            });
        }

        const result = await response.json() as MiniMaxResponse;
        const baseResp = result.base_resp || { status_code: -1 };
        const data = result.data || {};
        const extraInfo = result.extra_info || {};

        console.log('✅ MiniMax API 响应:', {
            status: baseResp.status_code,
            hasAudio: !!data.audio,
            audioLength: extraInfo.audio_length,
        });

        // 检查响应状态
        if (baseResp.status_code !== 0) {
            console.error('❌ MiniMax API 返回错误:', baseResp);
            return res.status(500).json({
                error: 'MiniMax API error',
                details: baseResp
            });
        }

        // 检查是否有音频数据
        if (!data.audio) {
            console.error('❌ 没有收到音频数据');
            return res.status(500).json({ error: 'No audio data received' });
        }

        // 将 hex 编码的音频转换为 Buffer
        const audioBuffer = hexToBuffer(data.audio);
        console.log('🎵 音频数据大小:', audioBuffer.length, 'bytes');

        // 返回音频
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', audioBuffer.length);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.send(audioBuffer);

    } catch (error: any) {
        console.error('❌ MiniMax TTS 请求失败:', error);
        console.error('错误堆栈:', error.stack);
        return res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}

