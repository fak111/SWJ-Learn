import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { MissionNode, Challenge, TargetLanguage, Difficulty } from '../../../../modules/vibe/types';

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
    const { node, retryCount, language, difficulty } = await request.json();

    if (!node || !language || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required parameters: node, language, difficulty' },
        { status: 400 }
      );
    }

    const targetLangName = getLangName(language as TargetLanguage);

    let strategy = "";
    if (difficulty === 'RECRUIT') {
      strategy = "MODE: LISTENING COMPREHENSION (EASY) - Ask direct questions about facts stated in the text.";
    } else if (difficulty === 'AGENT') {
      strategy = "MODE: COMPREHENSION (MEDIUM) - Test whether the learner understood the meaning.";
    } else {
      strategy = "MODE: ADVANCED COMPREHENSION (HARD) - Test implications, tone, or context.";
    }

    const systemInstruction = `
      # Role
      You are a language learning assistant that creates comprehension questions.
      ${strategy}

      # General Rules
      1. The Question, Options, and Explanation must be in ${targetLangName}.
      2. Provide 3 options. One correct, two incorrect.
      3. Return a valid JSON object with: thought_process, question, options (array with text and is_correct), explanation.
      4. IMPORTANT: Keep responses concise and focused.
    `;

    const prompt = `
      Target Text: "${node.text}"
      Context: "${node.context}"
      Retry Count: ${retryCount || 0}

      Return ONLY a valid JSON object. Keep it simple.
    `;

    const responsePromise = ai.chat.completions.create({
      model: MODEL_FAST,
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const response = await withTimeout(responsePromise, REQUEST_TIMEOUT);
    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from DeepSeek");
    }

    const parsed = JSON.parse(content);
    const result = (parsed.challenge || parsed) as Challenge;

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('DeepSeek Challenge API Error:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Request failed. Please try again.' },
      { status: 500 }
    );
  }
}
