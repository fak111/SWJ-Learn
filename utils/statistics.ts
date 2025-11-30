import { Statistics } from '../types';

const STATISTICS_STORAGE_KEY = 'swj-statistics';

/**
 * 从 localStorage 读取统计数据
 */
export function getStatistics(): Statistics {
  try {
    const stored = localStorage.getItem(STATISTICS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to read statistics from localStorage:', error);
  }

  // 返回默认值
  return {
    listeningTime: {},
    totalDictatedWords: 0,
  };
}

/**
 * 保存统计数据到 localStorage
 */
function saveStatistics(stats: Statistics): void {
  try {
    localStorage.setItem(STATISTICS_STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save statistics to localStorage:', error);
  }
}

/**
 * 更新听音频时间（只记录最大播放时间，不重复计算）
 */
export function updateListeningTime(lessonId: string, time: number): void {
  const stats = getStatistics();

  // 只更新如果新时间大于已记录的最大时间
  const currentMaxTime = stats.listeningTime[lessonId] || 0;
  if (time > currentMaxTime) {
    stats.listeningTime[lessonId] = time;
    saveStatistics(stats);
  }
}

/**
 * 增加拼写单词计数
 */
export function incrementDictatedWords(): void {
  const stats = getStatistics();
  stats.totalDictatedWords += 1;
  saveStatistics(stats);
}

/**
 * 获取累计听音频时间（秒）
 */
export function getTotalListeningTime(): number {
  const stats = getStatistics();
  return Object.values(stats.listeningTime).reduce((sum, time) => sum + time, 0);
}

/**
 * 格式化时间显示
 * @param seconds 总秒数
 * @returns 格式化后的时间字符串，如 "2h 30m" 或 "45m"
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  const parts: string[] = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (secs > 0 && hours === 0 && minutes === 0) {
    parts.push(`${secs}s`);
  }

  return parts.length > 0 ? parts.join(' ') : '0s';
}

