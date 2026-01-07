export interface Word {
  word: string;
  start: number;
  end: number;
}

export interface Sentence {
  text: string;
  start: number;
  end: number;
  words: Word[];
  img?: string;
}

export interface Conversation {
  id: string;
  title: string;
  audio_source: string;
  coverImg?: string;
  full_audio_range: {
    start: number;
    end: number;
  };
  sentences: Sentence[];
}

export enum AppMode {
  BLIND = 'Blind',
  STUDY = 'Study',
  DICTATION = 'Dictation',
}

export type DictationDifficulty = 'easy' | 'middle' | 'hard';

export type PlaybackRate = 0.8 | 1.0 | 1.2;

export interface ProgressMap {
  [wordId: string]: boolean;
}

export interface DictResult {
  word: string;
  phonetic?: string;
  translations: string[];
  definition?: string;
  examples?: string[];
}
