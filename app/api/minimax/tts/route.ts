import { NextResponse } from 'next/server';

interface MiniMaxBaseResp {
  status_code: number;
  status_msg?: string;
}

interface MiniMaxData {
  audio?: string;
  status?: number;
}

interface MiniMaxResponse {
  base_resp?: MiniMaxBaseResp;
  data?: MiniMaxData;
  extra_info?: {
    audio_length?: number;
    audio_sample_rate?: number;
    audio_size?: number;
  };
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

function hexToBuffer(hex: string): Buffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return Buffer.from(bytes);
}

export async function POST(request: Request) {
  try {
    const { text, lang } = await request.json();

    if (!text || !lang) {
      return NextResponse.json(
        { error: 'Missing required parameters: text, lang' },
        { status: 400 }
      );
    }

    const apiKey = process.env.MINIMAXI_API_KEY;
    if (!apiKey) {
      console.error('MiniMax API key not configured');
      return NextResponse.json(
        { error: 'MiniMax API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.minimaxi.com/v1/t2a_v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'speech-2.6-hd',
        text,
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
        output_format: 'hex',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MiniMax API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'MiniMax API error', details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json() as MiniMaxResponse;
    const baseResp = result.base_resp || { status_code: -1 };

    if (baseResp.status_code !== 0) {
      console.error('MiniMax API error:', baseResp);
      return NextResponse.json(
        { error: 'MiniMax API error', details: baseResp },
        { status: 500 }
      );
    }

    if (!result.data?.audio) {
      return NextResponse.json(
        { error: 'No audio data received' },
        { status: 500 }
      );
    }

    const audioBuffer = hexToBuffer(result.data.audio);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error: any) {
    console.error('MiniMax TTS API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
