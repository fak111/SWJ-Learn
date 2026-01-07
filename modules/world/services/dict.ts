import { DictResult } from '../types';

const dictCache = new Map<string, DictResult>();

export async function fetchDictionary(word: string): Promise<DictResult> {
  const clean = word.toLowerCase().trim();

  if (dictCache.has(clean)) {
    return dictCache.get(clean)!;
  }

  const response = await fetch('/api/deepseek/dict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch dictionary');
  }

  const result: DictResult = await response.json();
  dictCache.set(clean, result);

  return result;
}
