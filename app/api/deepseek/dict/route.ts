import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const ai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
});

export async function POST(request: Request) {
  try {
    const { word } = await request.json();

    if (!word) {
      return NextResponse.json(
        { error: 'Missing required parameter: word' },
        { status: 400 }
      );
    }

    const prompt = `Explain the word "${word}" for an English learner.
      Output MUST be a valid JSON object with this exact structure:
      {
        "word": "${word}",
        "phonetic": "IPA or phonetic spelling",
        "translations": ["Common Chinese translation 1", "Translation 2"],
        "definition": "A clear English definition.",
        "examples": ["Example sentence 1.", "Example sentence 2."]
      }`;

    const completion = await ai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    });

    let content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response from DeepSeek");
    }

    content = content.replace(/```json\s*|\s*```/g, "").trim();
    const result = JSON.parse(content);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('DeepSeek Dict API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
