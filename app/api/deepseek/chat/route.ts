import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { MissionNode, TargetLanguage, Difficulty } from '../../../../modules/vibe/types';

const ai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1",
});

const MODEL_FAST = "deepseek-chat";
const REQUEST_TIMEOUT = 30000; // 30秒超时

const getLangName = (lang: TargetLanguage): string => {
  switch (lang) {
    case 'ja-JP': return 'Japanese';
    case 'es-ES': return 'Spanish';
    case 'fr-FR': return 'French';
    case 'de-DE': return 'German';
    case 'zh-CN': return 'Chinese (Mandarin)';
    case 'en-US': return 'English';
    default: return 'English';
  }
};

// 带超时的 Promise.race
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(`Request timed out after ${timeoutMs}ms`)), timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId);
    return result;
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { topic, language, difficulty } = await request.json();

    if (!topic || !language || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required parameters: topic, language, difficulty' },
        { status: 400 }
      );
    }

    const targetLangName = getLangName(language as TargetLanguage);

    let difficultyInstruction = "";
    switch (difficulty) {
      case 'RECRUIT':
        difficultyInstruction = "Use simple vocabulary, short sentences, and clear direct instructions.";
        break;
      case 'AGENT':
        difficultyInstruction = "Use natural native-level speed, some idioms, and moderate sentence complexity.";
        break;
      case 'VETERAN':
        difficultyInstruction = "Use complex grammar, slang, technical jargon, or more nuanced expressions.";
        break;
    }

    const systemInstruction = `
      You are a creative dialogue writer.
      Generate a sequence of 5 dialogue fragments based on the user's theme.

      Constraints:
      1. The 'text' must be in ${targetLangName}.
      2. The 'context' must ALSO be in ${targetLangName}.
      3. Each line should contain meaningful information.
      4. Surprising but Logical : The story must have a plot twist or a humorous realization in the final part (Node 5). It should feel like an "O. Henry" style ending.
      5. Return a valid JSON array with: id (integer), context (string), text (string), difficulty (string).
      6. Keep responses concise and focused.
    `;

    const responsePromise = ai.chat.completions.create({
      model: MODEL_FAST,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: `Generate a 5-part mission script about: ${topic}.${difficultyInstruction} Return ONLY a valid JSON array.` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8
    });

    const response = await withTimeout(responsePromise, REQUEST_TIMEOUT);
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from DeepSeek");
    }

    const parsed = JSON.parse(content);
    const missionArray = Array.isArray(parsed) ? parsed : parsed.mission || parsed.script || parsed.nodes || [];
    console.log("missionArray", missionArray);
    return NextResponse.json(missionArray as MissionNode[]);
  } catch (error: any) {
    console.error('DeepSeek Chat API Error:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Request failed. Please try again.' },
      { status: 500 }
    );
  }
}
