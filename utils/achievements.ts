import { AchievementId, Achievement, AchievementState, ProgressMap, DisplayAchievement } from '../types';
import { CONVERSATION_DATA } from '../constants';

const ACHIEVEMENT_STORAGE_KEY = 'swj-achievements';

/**
 * 从 localStorage 读取已解锁的成就
 */
export function getUnlockedAchievements(): AchievementState {
    const saved = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse achievements", e);
        }
    }
    return {};
}

/**
 * 保存成就到 localStorage
 */
export function saveAchievements(achievements: AchievementState): void {
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(achievements));
}

/**
 * 解锁单个成就
 */
export function unlockAchievement(id: AchievementId): void {
    const achievements = getUnlockedAchievements();
    if (!achievements[id] || !achievements[id].unlocked) {
        achievements[id] = {
            id,
            unlocked: true,
            unlockedAt: Date.now()
        };
        saveAchievements(achievements);
    }
}

/**
 * 检查所有 lesson 的完成状态并更新成就
 */
export function checkAndUpdateAchievements(): AchievementState {
    const achievements = getUnlockedAchievements();

    // 计算每个 lesson 的完成状态
    const lessonProgress = CONVERSATION_DATA.map((conv) => {
        const saved = localStorage.getItem(`echo-progress-${conv.id}`);
        let progressMap: ProgressMap = {};
        if (saved) {
            try {
                progressMap = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }

        const totalWords = conv.sentences.reduce((acc, s) => acc + s.words.length, 0);
        const solvedCount = Object.keys(progressMap).length;
        const progressPercent = totalWords > 0 ? Math.round((solvedCount / totalWords) * 100) : 0;

        return {
            id: conv.id,
            progress: progressPercent,
            isCompleted50: progressPercent >= 50,
            isCompleted100: progressPercent >= 100
        };
    });

    // 统计完成数量
    const completed50Count = lessonProgress.filter(l => l.isCompleted50).length;
    const completed100Count = lessonProgress.filter(l => l.isCompleted100).length;

    // 检查并解锁成就
    // blind1: 完成 1 个 lesson（50%）
    if (completed50Count >= 1 && (!achievements.blind1 || !achievements.blind1.unlocked)) {
        unlockAchievement('blind1');
        achievements.blind1 = {
            id: 'blind1',
            unlocked: true,
            unlockedAt: Date.now()
        };
    }

    // blind2: 完成 3 个 lesson（50%）
    if (completed50Count >= 3 && (!achievements.blind2 || !achievements.blind2.unlocked)) {
        unlockAchievement('blind2');
        achievements.blind2 = {
            id: 'blind2',
            unlocked: true,
            unlockedAt: Date.now()
        };
    }

    // perfect1: 1 个 lesson 达到 100%
    if (completed100Count >= 1 && (!achievements.perfect1 || !achievements.perfect1.unlocked)) {
        unlockAchievement('perfect1');
        achievements.perfect1 = {
            id: 'perfect1',
            unlocked: true,
            unlockedAt: Date.now()
        };
    }

    // perfect2: 3 个 lesson 达到 100%
    if (completed100Count >= 3 && (!achievements.perfect2 || !achievements.perfect2.unlocked)) {
        unlockAchievement('perfect2');
        achievements.perfect2 = {
            id: 'perfect2',
            unlocked: true,
            unlockedAt: Date.now()
        };
    }

    // 确保所有成就都在状态中（包括未解锁的）
    const allAchievementIds: AchievementId[] = ['blind1', 'blind2', 'perfect1', 'perfect2', 'angel100'];
    allAchievementIds.forEach(id => {
        if (!achievements[id]) {
            if (id === 'angel100') {
                // angel100 默认解锁
                achievements[id] = {
                    id,
                    unlocked: true,
                    unlockedAt: Date.now()
                };
            } else {
                achievements[id] = {
                    id,
                    unlocked: false
                };
            }
        }
    });

    saveAchievements(achievements);
    return achievements;
}

/**
 * 成就配置映射
 */
const ACHIEVEMENT_CONFIG: Record<AchievementId, Omit<DisplayAchievement, 'unlocked' | 'unlockedAt'>> = {
    blind1: {
        id: 'blind1',
        name: 'Blind 1',
        description: 'do well job',
        imagePath: '/assets/blind1.png',
        series: 'blind',
        level: 1,
        ringColor: 'ring-indigo-200/50',
        shadowColor: 'shadow-indigo-100/50'
    },
    blind2: {
        id: 'blind2',
        name: 'Blind 2',
        description: 'do great job',
        imagePath: '/assets/blind2.png',
        series: 'blind',
        level: 2,
        ringColor: 'ring-indigo-200/50',
        shadowColor: 'shadow-indigo-100/50'
    },
    perfect1: {
        id: 'perfect1',
        name: 'Perfect 1',
        description: 'perfect!',
        imagePath: '/assets/perfect1.png',
        series: 'perfect',
        level: 1,
        ringColor: 'ring-emerald-200/50',
        shadowColor: 'shadow-emerald-100/50'
    },
    perfect2: {
        id: 'perfect2',
        name: 'Perfect 2',
        description: 'perfect!!',
        imagePath: '/assets/perfect2.png',
        series: 'perfect',
        level: 2,
        ringColor: 'ring-emerald-200/50',
        shadowColor: 'shadow-emerald-100/50'
    },
    angel100: {
        id: 'angel100',
        name: 'Top 100 Angel',
        description: 'The first 100 angle user.',
        imagePath: '/assets/100.jpg',
        series: 'angel',
        level: 1,
        ringColor: 'ring-amber-200/50',
        shadowColor: 'shadow-amber-100/50'
    }
};

/**
 * 获取用于显示的成就列表（实现层级逻辑和过滤）
 * - 如果用户有高级成就，只返回高级成就（高级覆盖低级）
 * - 只返回已解锁的成就
 */
export function getDisplayAchievements(): DisplayAchievement[] {
    const achievements = getUnlockedAchievements();
    const displayList: DisplayAchievement[] = [];

    // 确保 angel100 默认解锁（如果不存在或未解锁，则解锁它）
    if (!achievements.angel100 || !achievements.angel100.unlocked) {
        unlockAchievement('angel100');
        achievements.angel100 = {
            id: 'angel100',
            unlocked: true,
            unlockedAt: Date.now()
        };
    }

    // 处理 Blind 系列
    const blind2 = achievements.blind2;
    const blind1 = achievements.blind1;

    if (blind2?.unlocked) {
        // 如果有 blind2，只显示 blind2
        displayList.push({
            ...ACHIEVEMENT_CONFIG.blind2,
            unlocked: true,
            unlockedAt: blind2.unlockedAt
        });
    } else if (blind1?.unlocked) {
        // 如果没有 blind2 但有 blind1，显示 blind1
        displayList.push({
            ...ACHIEVEMENT_CONFIG.blind1,
            unlocked: true,
            unlockedAt: blind1.unlockedAt
        });
    }

    // 处理 Perfect 系列
    const perfect2 = achievements.perfect2;
    const perfect1 = achievements.perfect1;

    if (perfect2?.unlocked) {
        // 如果有 perfect2，只显示 perfect2
        displayList.push({
            ...ACHIEVEMENT_CONFIG.perfect2,
            unlocked: true,
            unlockedAt: perfect2.unlockedAt
        });
    } else if (perfect1?.unlocked) {
        // 如果没有 perfect2 但有 perfect1，显示 perfect1
        displayList.push({
            ...ACHIEVEMENT_CONFIG.perfect1,
            unlocked: true,
            unlockedAt: perfect1.unlockedAt
        });
    }

    // 处理 Angel 系列（默认解锁）
    const angel100 = achievements.angel100;
    if (angel100?.unlocked) {
        displayList.push({
            ...ACHIEVEMENT_CONFIG.angel100,
            unlocked: true,
            unlockedAt: angel100.unlockedAt
        });
    }

    // 按解锁时间排序（最新的在前）
    return displayList.sort((a, b) => {
        const timeA = a.unlockedAt || 0;
        const timeB = b.unlockedAt || 0;
        return timeB - timeA;
    });
}

