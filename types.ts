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
  // 可选的 lesson 级封面图，用于无句子配图时的回退展示
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
  [wordId: string]: boolean; // format: "sentenceIndex-wordIndex": true if solved
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
  unlockedAt?: number; // timestamp
}

export interface AchievementState {
  [key: string]: Achievement;
}

// 成就系列定义
export type AchievementSeries = 'blind' | 'perfect' | 'angel';

// 成就显示项（用于UI展示）
export interface DisplayAchievement {
  id: AchievementId;
  name: string;
  description: string; // 成就描述
  imagePath: string;
  series: AchievementSeries;
  level: number; // 1 = 低级, 2 = 高级
  unlocked: boolean;
  unlockedAt?: number;
  ringColor: string; // Tailwind ring color class
  shadowColor: string; // Tailwind shadow color class
}

// 统计数据接口
export interface Statistics {
  listeningTime: {
    [lessonId: string]: number; // 每个 lesson 的最大播放时间（秒）
  };
  totalDictatedWords: number; // 总拼写单词数
}
