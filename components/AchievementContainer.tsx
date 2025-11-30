import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DisplayAchievement } from '../types';
import { getDisplayAchievements } from '../utils/achievements';

const AchievementContainer: React.FC = () => {
    const [achievements, setAchievements] = useState<DisplayAchievement[]>([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 加载成就列表
        const loadAchievements = () => {
            const displayAchievements = getDisplayAchievements();
            setAchievements(displayAchievements);
        };

        loadAchievements();

        // 监听 localStorage 变化（当成就更新时）
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'swj-achievements' || e.key?.startsWith('echo-progress-')) {
                loadAchievements();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // 定期检查（用于同一标签页内的更新）
        const interval = setInterval(loadAchievements, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        // 检查滚动状态
        const checkScroll = () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(
                container.scrollLeft < container.scrollWidth - container.clientWidth - 1
            );
        };

        checkScroll();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScroll);
            // 监听窗口大小变化
            window.addEventListener('resize', checkScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, [achievements]);

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const scrollAmount = 200; // 每次滚动的距离
        const targetScroll = direction === 'left'
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;

        container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    };

    // 如果没有成就，不显示容器
    if (achievements.length === 0) {
        return null;
    }

    return (
        <div className="left-6 relative bg-white rounded-2xl border border-slate-200/50 shadow-lg shadow-slate-100/50 backdrop-blur-sm p-4 overflow-visible">
            {/* 标题 */}
            <div className="mb-3">
                <h2 className="text-sm font-semibold text-slate-700">Achievements</h2>
                <p className="text-xs text-slate-400 mt-0.5">Discover more easter eggs!</p>
            </div>

            {/* 成就列表容器 */}
            <div className="relative overflow-visible">
                {/* 左箭头 */}
                {canScrollLeft && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-slate-200/50 hover:bg-white transition-all"
                        aria-label="向左滚动"
                    >
                        <ChevronLeft size={16} className="text-slate-600" />
                    </button>
                )}

                {/* 滚动容器 */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto overflow-y-visible scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.id}
                            className="group relative flex-shrink-0 flex flex-col items-center cursor-pointer"
                        >
                            <div
                                className={`
                                    relative w-16 h-16 rounded-full transition-all duration-500
                                    ring-2 ${achievement.ringColor} shadow-lg ${achievement.shadowColor}
                                    scale-100 opacity-100
                                    group-hover:scale-110 group-hover:shadow-xl
                                `}
                            >
                                <img
                                    src={achievement.imagePath}
                                    alt={achievement.name}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            {/* 悬停时显示工具提示 - 显示在右侧 */}
                            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-[100] transform">
                                <div className="bg-slate-900/95 text-white text-sm px-4 py-3 rounded-xl backdrop-blur-sm shadow-2xl min-w-[240px] max-w-[320px] border border-slate-700/50">
                                    <div className="font-semibold mb-2 text-base whitespace-nowrap">{achievement.name}</div>
                                    <div className="text-slate-300 text-xs leading-relaxed whitespace-normal break-words">
                                        {achievement.description || 'No description'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 右箭头 */}
                {canScrollRight && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md border border-slate-200/50 hover:bg-white transition-all"
                        aria-label="向右滚动"
                    >
                        <ChevronRight size={16} className="text-slate-600" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default AchievementContainer;

