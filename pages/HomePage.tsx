import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CONVERSATION_DATA } from '../constants';
import { Lock, Play, CheckCircle2, BarChart3, Headphones, Sparkles, ArrowLeft } from 'lucide-react';
import { ProgressMap } from '../types';
import { checkAndUpdateAchievements } from '../utils/achievements';
import AchievementContainer from '../components/AchievementContainer';
import StatisticsCard from '../components/StatisticsCard';

// Helper function to infer categoryId from audio_source
const inferCategoryId = (audioSource: string): string | null => {
    const src = audioSource || '';
    if (src.startsWith('theLittlePrince') || /^\d+\.mp3$/.test(src)) {
        return 'little-prince';
    }
    if (src.toLowerCase().includes('cet6')) {
        return 'cet6';
    }
    if (src.toLowerCase() === 'eazy.mp3') {
        return 'eazy-stories';
    }
    if (src.toLowerCase() === '1_1.mp3') {
        return 'ielts18';
    }
    return null;
};

interface LessonState {
    id: string;
    title: string;
    progress: number;
    isCompleted: boolean;
    totalWords: number;
}

export default function HomePage() {
    const { categoryId } = useParams<{ categoryId?: string }>();
    const [lessonStates, setLessonStates] = useState<LessonState[]>([]);
    const [activeModal, setActiveModal] = useState<'angel' | 'milk' | null>(null);

    // QR Code and URLs
    const angelQrSrc = '/assets/wxq.png';
    const milkTeaQrSrc = '/assets/wxzf.png';
    const documentationUrl = 'https://ai.feishu.cn/wiki/FRYBw8zXUiv4nWkd9FOcXhWRnTc?from=from_copylink';
    const githubUrl = 'https://github.com/fak111/SWJ-Learn';

    const filteredConversations = useMemo(() => {
        if (!categoryId) return CONVERSATION_DATA;

        return CONVERSATION_DATA.filter((conv) => {
            const src = conv.audio_source || '';

            if (categoryId === 'little-prince') {
                // 匹配 theLittlePrince 开头的，或者纯数字的 mp3 文件（1.mp3, 2.mp3, ...）
                return src.startsWith('theLittlePrince');
            }

            if (categoryId === 'cet6') {
                return src.toLowerCase().includes('cet6');
            }

            if (categoryId === 'eazy-stories') {
                return src.toLowerCase() === 'eazy.mp3';
            }

            if (categoryId === 'ielts18') {
                return src.toLowerCase() === '1_1.mp3';
            }

            return true;
        });
    }, [categoryId]);

    useEffect(() => {
        // Calculate progress for all lessons based on localStorage
        const states = filteredConversations.map((conv) => {
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
    }, [filteredConversations]);

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
                                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left w-full sm:w-auto">
                                    {categoryId && (
                                        <>
                                            <Link
                                                to="/world"
                                                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
                                                title="返回世界列表"
                                            >
                                                <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                                                <span className="text-sm font-medium hidden sm:inline">返回</span>
                                            </Link>
                                            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                                        </>
                                    )}
                                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200">
                                        <Headphones className="text-white h-8 w-8" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">SWJ-Learn</h1>
                                        <p className="text-slate-500 font-medium">Intensive listening & dictation training</p>
                                    </div>
                                </div>

                            </div>
                        </header>

                        {/* Little Prince world: coming soon notice */}
                        {categoryId === 'little-prince' && (
                            <div className="mb-6">
                                <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 shadow-sm">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-amber-100 shadow-md shadow-indigo-300/50">
                                        <Sparkles size={18} />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div className="mb-0.5 flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 border border-indigo-100">
                                                小王子 · 后续章节即将上线
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                                            目前开放的是第 1 章节，后续星球正在精听打磨中。欢迎先体验本节课程，稍后回来解锁更多故事。
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* IELTS 18 考试模式跳转提醒 */}
                        {categoryId === 'ielts18' && (
                            <div className="mb-6">
                                <div className="flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 shadow-sm">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600 text-amber-100 shadow-md shadow-amber-300/50">
                                        <Sparkles size={18} />
                                    </div>
                                    <div className="flex-1 text-sm">
                                        <div className="mb-0.5 flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold text-amber-700 border border-amber-100">
                                                Cambridge IELTS 18 Test 1 Part 1
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed">
                                            想要体验完整的考试模式？{' '}
                                            <a
                                                href="https://www.ieltscb.com/Paper/part/?id=134&classify=1&chapters_id=1041&p_type=18&new_page=1&record_id=3915447"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-amber-700 hover:text-amber-800 underline"
                                            >
                                                点击这里跳转到考试模式
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Level Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lessonStates.map((lesson, index) => {
                                // Unlock Logic:
                                // 1. First lesson is always unlocked.
                                // 2. Subsequent lessons unlock if the PREVIOUS lesson has >= 50% progress.
                                const prevLesson = index > 0 ? lessonStates[index - 1] : null;
                                const isUnlocked = index === 0 || (prevLesson && prevLesson.progress >= 50);

                                // Get the conversation to infer categoryId if needed
                                const conversation = filteredConversations.find(c => c.id === lesson.id);
                                const lessonCategoryId = categoryId || (conversation ? inferCategoryId(conversation.audio_source) : null);
                                const lessonLink = lessonCategoryId ? `/world/${lessonCategoryId}/${lesson.id}` : '#';

                                return (
                                    <Link
                                        to={isUnlocked ? lessonLink : '#'}
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
