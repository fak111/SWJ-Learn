'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CONVERSATION_DATA } from '../../../modules/world/constants';
import { ProgressMap, Conversation } from '../../../modules/world/types';
import { checkAndUpdateAchievements } from '../../../utils/achievements';
import AchievementContainer from '../../../components/AchievementContainer';
import StatisticsCard from '../../../components/StatisticsCard';
import { Lock, Play, CheckCircle2, BarChart3, Headphones, Sparkles, ArrowLeft } from 'lucide-react';

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

export default function CategoryPage() {
    const params = useParams();
    const { categoryId } = params as { categoryId: string };
    const [lessonStates, setLessonStates] = useState<LessonState[]>([]);

    const filteredConversations = useMemo(() => {
        if (!categoryId) return CONVERSATION_DATA;

        return CONVERSATION_DATA.filter((conv) => {
            const src = conv.audio_source || '';

            if (categoryId === 'little-prince') {
                return src.startsWith('theLittlePrince') || /^\d+\.mp3$/.test(src);
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
        const states = filteredConversations.map((conv: Conversation) => {
            const saved = localStorage.getItem(`echo-progress-${conv.id}`);
            let progressMap: ProgressMap = {};
            if (saved) {
                try {
                    progressMap = JSON.parse(saved);
                } catch (e) {
                    console.error('Failed to parse progress', e);
                }
            }

            const totalWords = conv.sentences.reduce((acc: number, s: { words: unknown[] }) => acc + s.words.length, 0);
            const solvedCount = Object.keys(progressMap).length;
            const progress = totalWords > 0 ? Math.round((solvedCount / totalWords) * 100) : 0;

            return {
                id: conv.id,
                title: conv.title,
                progress,
                isCompleted: progress >= 100,
                totalWords
            };
        });

        setLessonStates(states);
        checkAndUpdateAchievements();
    }, [filteredConversations]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
                    <Link
                        href="/world"
                        className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        <span className="text-sm font-medium">返回世界</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <StatisticsCard />
                        <AchievementContainer />
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <section className="mb-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 capitalize">{categoryId?.replace('-', ' ')}</h1>
                        <p className="text-slate-500">选择课程开始学习</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lessonStates.map((lesson, index) => {
                            const prevLesson = index > 0 ? lessonStates[index - 1] : null;
                            const isUnlocked = index === 0 || (prevLesson && prevLesson.progress >= 50);

                            return (
                                <Link
                                    key={lesson.id}
                                    href={isUnlocked ? `/world/${categoryId}/${lesson.id}` : '#'}
                                    className={`
                                        group relative overflow-hidden rounded-2xl border transition-all duration-300
                                        ${isUnlocked
                                            ? 'border-slate-200 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white'
                                            : 'border-slate-100 opacity-70 cursor-not-allowed grayscale-[0.5] bg-slate-50'
                                        }
                                    `}
                                    onClick={(e) => !isUnlocked && e.preventDefault()}
                                >
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                isUnlocked
                                                    ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                                                    : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                {isUnlocked ? (
                                                    <span className="font-bold font-mono text-lg">{index + 1}</span>
                                                ) : (
                                                    <Lock size={18} />
                                                )}
                                            </div>
                                            {lesson.progress >= 100 && (
                                                <CheckCircle2 className="text-green-500" size={22} />
                                            )}
                                        </div>

                                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                                            {lesson.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 mb-4">
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
                                                        className={`h-full rounded-full transition-all duration-500 ${
                                                            lesson.progress >= 100 ? 'bg-green-500' : 'bg-indigo-600'
                                                        }`}
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
                                        <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50/50 transition-colors">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-indigo-500">
                                                {lesson.progress === 0 ? "Start" : "Continue"}
                                            </span>
                                            <Play size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" fill="currentColor" />
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
