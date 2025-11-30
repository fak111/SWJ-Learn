import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONVERSATION_DATA } from '../constants';
import { Lock, Play, CheckCircle2, BarChart3, Headphones } from 'lucide-react';
import { ProgressMap } from '../types';
import { checkAndUpdateAchievements } from '../utils/achievements';
import AchievementContainer from '../components/AchievementContainer';
import StatisticsCard from '../components/StatisticsCard';

interface LessonState {
    id: string;
    title: string;
    progress: number;
    isCompleted: boolean;
    totalWords: number;
}

export default function HomePage() {
    const [lessonStates, setLessonStates] = useState<LessonState[]>([]);
    const [activeModal, setActiveModal] = useState<'angel' | 'milk' | null>(null);

    // QR Code and URLs
    const angelQrSrc = '/assets/wxq.png';
    const milkTeaQrSrc = '/assets/wxzf.png';
    const documentationUrl = 'https://ai.feishu.cn/wiki/FRYBw8zXUiv4nWkd9FOcXhWRnTc?from=from_copylink';
    const githubUrl = 'https://github.com/fak111/SWJ-Learn';

    useEffect(() => {
        // Calculate progress for all lessons based on localStorage
        const states = CONVERSATION_DATA.map((conv) => {
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
                title: conv.title,
                progress: progressPercent,
                isCompleted: progressPercent >= 100,
                totalWords
            };
        });
        setLessonStates(states);

        // Check and update achievements
        checkAndUpdateAchievements();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <div className="flex">
                {/* Achievement Sidebar */}
                <aside className="hidden lg:block fixed left-0 top-0 h-screen w-96 bg-gradient-to-b from-slate-50/95 to-white/95 backdrop-blur-sm border-r border-slate-200/50 shadow-sm z-40 overflow-y-auto overflow-x-visible">
                    <div className="h-full flex flex-col justify-end p-4 pb-6">
                        <StatisticsCard />
                        <AchievementContainer />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 lg:ml-96 transition-all">
                    <div className="max-w-5xl mx-auto px-4 py-8">

                        {/* Header */}
                        <header className="mb-8">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                                <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
                                        <Headphones className="text-white h-8 w-8" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">SWJ-Learn</h1>
                                        <p className="text-slate-500 font-medium">Intensive listening & dictation training</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <button
                                            onClick={() => setActiveModal('angel')}
                                            className="flex items-center gap-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 px-3 py-1.5 text-sm font-medium transition hover:bg-pink-200"
                                        >
                                            <span role="img" aria-label="gift">🎁</span>
                                            成为天使用户
                                        </button>
                                        <button
                                            onClick={() => setActiveModal('milk')}
                                            className="flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1.5 text-sm font-medium transition hover:bg-amber-200"
                                        >
                                            <span role="img" aria-label="coffee">☕</span>
                                            请作者喝杯奶茶
                                        </button>
                                        <a
                                            href={documentationUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                                        >
                                            文档
                                        </a>
                                        <a
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Level Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lessonStates.map((lesson, index) => {
                                // Unlock Logic:
                                // 1. First lesson is always unlocked.
                                // 2. Subsequent lessons unlock if the PREVIOUS lesson has >= 50% progress.
                                const prevLesson = index > 0 ? lessonStates[index - 1] : null;
                                const isUnlocked = index === 0 || (prevLesson && prevLesson.progress >= 50);

                                return (
                                    <Link
                                        to={isUnlocked ? `/lesson/${lesson.id}` : '#'}
                                        key={lesson.id}
                                        className={`
                  group relative flex flex-col justify-between bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden
                  ${isUnlocked
                                                ? 'border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                                                : 'border-slate-100 opacity-70 cursor-not-allowed grayscale-[0.5]'
                                            }
                `}
                                        onClick={(e) => !isUnlocked && e.preventDefault()}
                                    >
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-colors
                      ${isUnlocked ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-slate-100 text-slate-400'}
                    `}>
                                                    {isUnlocked ? (
                                                        <span className="font-bold font-mono text-lg">{index + 1}</span>
                                                    ) : (
                                                        <Lock size={18} />
                                                    )}
                                                </div>
                                                {lesson.progress >= 100 && (
                                                    <CheckCircle2 className="text-green-500 drop-shadow-sm" size={24} strokeWidth={3} />
                                                )}
                                            </div>

                                            <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-indigo-700 transition-colors">
                                                {lesson.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 font-medium mb-6">
                                                {lesson.totalWords} words
                                            </p>

                                            {isUnlocked ? (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                                                        <span>Mastery</span>
                                                        <span className={lesson.progress > 0 ? "text-indigo-600" : ""}>{lesson.progress}%</span>
                                                    </div>
                                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${lesson.progress >= 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                                                            style={{ width: `${lesson.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-100 py-2 px-3 rounded-lg">
                                                    <Lock size={12} />
                                                    <span>Complete 50% of Level {index}</span>
                                                </div>
                                            )}
                                        </div>

                                        {isUnlocked && (
                                            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50/50 transition-colors">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-500">
                                                    {lesson.progress === 0 ? "Start" : "Continue"}
                                                </span>
                                                <Play size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors transform group-hover:translate-x-1" fill="currentColor" />
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Modal */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60"
                        onClick={() => setActiveModal(null)}
                    />
                    <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="text-right">
                            <button
                                onClick={() => setActiveModal(null)}
                                className="text-slate-400 hover:text-slate-600"
                                aria-label="关闭弹窗"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="text-center space-y-3">
                            <h3 className="text-xl font-semibold text-slate-900">
                                {activeModal === 'angel' ? '成为天使用户' : '请作者喝杯奶茶'}
                            </h3>
                            <p className="text-sm text-slate-500">微信扫码完成支持</p>
                            <img
                                src={activeModal === 'angel' ? angelQrSrc : milkTeaQrSrc}
                                alt={activeModal === 'angel' ? '微信支付二维码' : '微信账号二维码'}
                                className="w-full rounded-xl border border-slate-100"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
