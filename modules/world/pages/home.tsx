'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CONVERSATION_DATA } from '../constants';
import { ProgressMap } from '../types';
import { checkAndUpdateAchievements } from '../../../utils/achievements';
import AchievementContainer from '../../../components/AchievementContainer';
import StatisticsCard from '../../../components/StatisticsCard';
import { Lock, Play, CheckCircle2, BarChart3, Headphones, Sparkles, ArrowLeft } from 'lucide-react';

const inferCategoryId = (audioSource: string): string | null => {
    const src = audioSource || '';
    // if (src.startsWith('theLittlePrince') || /^\d+\.mp3$/.test(src)) {
    //     return 'little-prince';
    // }
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

export default function WorldHomePage() {
    const [lessonStates, setLessonStates] = useState<LessonState[]>([]);
    const [activeModal, setActiveModal] = useState<'angel' | 'milk' | null>(null);

    const angelQrSrc = '/assets/wxq.png';
    const milkTeaQrSrc = '/assets/wxzf.png';

    const filteredConversations = useMemo(() => {
        return CONVERSATION_DATA;
    }, []);

    useEffect(() => {
        const states = filteredConversations.map((conv) => {
            const saved = localStorage.getItem(`echo-progress-${conv.id}`);
            let progressMap: ProgressMap = {};
            if (saved) {
                try {
                    progressMap = JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse progress', e);
                }
            }

            const totalWords = conv.sentences.reduce((acc, s) => acc + s.words.length, 0);
            const solvedCount = Object.keys(progressMap).length;
            const progress = totalWords > 0 ? Math.round((solvedCount / totalWords) * 100) : 0;
            const isCompleted = progress >= 100;

            return {
                id: conv.id,
                title: conv.title,
                progress,
                isCompleted,
                totalWords
            };
        });

        setLessonStates(states);
        checkAndUpdateAchievements();
    }, [filteredConversations]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <div className="flex">
                <aside className="hidden lg:block fixed left-0 top-0 h-screen w-96 bg-gradient-to-b from-slate-50/95 to-white/95 backdrop-blur-sm border-r border-slate-200/50 shadow-sm z-40 overflow-y-auto overflow-x-visible">
                    <div className="h-full flex flex-col justify-end p-4 pb-6">
                        <StatisticsCard />
                        <AchievementContainer />
                    </div>
                </aside>

                <div className="flex-1 lg:ml-96 transition-all">
                    <div className="max-w-5xl mx-auto px-4 py-8">
                        <header className="mb-8">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                                <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left w-full sm:w-auto">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
                                    >
                                        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                                        <span className="text-sm font-medium hidden sm:inline">return</span>
                                    </Link>
                                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lessonStates.map((lesson, index) => {
                                const prevLesson = index > 0 ? lessonStates[index - 1] : null;
                                const isUnlocked = index === 0 || (prevLesson && prevLesson.progress >= 50);

                                const conversation = filteredConversations.find(c => c.id === lesson.id);
                                const lessonCategoryId = conversation ? inferCategoryId(conversation.audio_source) : null;
                                const lessonLink = lessonCategoryId ? `/world/${lessonCategoryId}/${lesson.id}` : '#';

                                return (
                                    <Link
                                        href={isUnlocked ? lessonLink : '#'}
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

            {activeModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
                    onClick={() => setActiveModal(null)}
                >
                    <div
                        className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold text-center mb-4">
                            {activeModal === 'angel' ? '关注angel获取更多' : '请我喝奶茶'}
                        </h3>
                        <img
                            src={activeModal === 'angel' ? angelQrSrc : milkTeaQrSrc}
                            alt={activeModal === 'angel' ? '微信' : '微信支付'}
                            className="w-full h-auto rounded-lg"
                        />
                        <button
                            onClick={() => setActiveModal(null)}
                            className="mt-4 w-full py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                        >
                            关闭
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
