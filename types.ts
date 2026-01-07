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

export type AchievementId = 'blind1' | 'blind2' | 'perfect1' | 'perfect2' | 'angel100';

export interface Achievement {
  id: AchievementId;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface AchievementState {
  [key: string]: Achievement;
}

export type AchievementSeries = 'blind' | 'perfect' | 'angel';

export interface DisplayAchievement {
  id: AchievementId;
  name: string;
  description: string;
  imagePath: string;
  series: AchievementSeries;
  level: number;
  unlocked: boolean;
  unlockedAt?: number;
  ringColor: string;
  shadowColor: string;
}

export interface Statistics {
  listeningTime: {
    [lessonId: string]: number;
  };
  totalDictatedWords: number;
}

export interface TestQuestion {
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
}

export interface TestData {
  questions: TestQuestion[];
}

export interface TestResult {
  questionIndex: number;
  selectedAnswer: number | null;
  isCorrect: boolean;
}
