'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CONVERSATION_DATA } from '../constants';
import { AppMode, PlaybackRate, ProgressMap, DictationDifficulty, DictResult } from '../types';
import { checkAndUpdateAchievements } from '../../../utils/achievements';
import { updateListeningTime, getStatistics } from '../../../utils/statistics';
import { getAudioUrl } from '../../../utils/audio';
import { fetchDictionary } from '../services/dict';
import AudioPlayer from '../../../components/AudioPlayer';
import Transcript from '../../../components/Transcript';
import ModeSelector from '../../../components/ModeSelector';
import DictionaryModal from '../../../components/DictionaryModal';
import { Headphones, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';

const inferCategoryId = (audioSource: string): string | null => {
    const src = audioSource || '';
    if (src.toLowerCase().includes('cet6')) {
        return 'cet6';
    }
    if (src.toLowerCase() === 'eazy.mp3') {
        return 'eazy-stories';
    }
    if (src.toLowerCase() === '1_1.mp3') {
        return 'ielts18';
    }
    return 'little-prince';
};

export default function DailyPage() {
    const params = useParams();
    const { categoryId, chapterId } = params as { categoryId?: string; chapterId?: string };

    const conversation = chapterId
        ? CONVERSATION_DATA.find(c => c.id === chapterId)
        : null;

    if (chapterId && !conversation) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Link href="/world" className="text-indigo-600 hover:underline">返回世界</Link>
            </div>
        );
    }

    if (!chapterId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Link href="/world" className="text-indigo-600 hover:underline">返回世界</Link>
            </div>
        );
    }

    const validConversation = conversation || CONVERSATION_DATA[0];
    const effectiveCategoryId = categoryId || inferCategoryId(validConversation.audio_source);

    const audioSrc = getAudioUrl(validConversation.audio_source);
    const fullAudioRange = validConversation.full_audio_range;

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(fullAudioRange.start);
    const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1.0);
    const [mode, setMode] = useState<AppMode>(AppMode.BLIND);
    const [dictationDifficulty, setDictationDifficulty] = useState<DictationDifficulty>('easy');
    const [progress, setProgress] = useState<ProgressMap>({});

    const [dictModalOpen, setDictModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [dictData, setDictData] = useState<DictResult | null>(null);
    const [dictLoading, setDictLoading] = useState(false);
    const [dictError, setDictError] = useState<string | null>(null);
    const [targetWordEndTime, setTargetWordEndTime] = useState<number | null>(null);
    const [pendingWord, setPendingWord] = useState<string | null>(null);
    const [showKeyHint, setShowKeyHint] = useState(false);

    const dictCache = useRef<Record<string, DictResult>>({});

    useEffect(() => {
        if (conversation) {
            setIsPlaying(false);
            setCurrentTime(conversation.full_audio_range.start);
            const saved = localStorage.getItem(`echo-progress-${conversation.id}`);
            if (saved) {
                try {
                    setProgress(JSON.parse(saved));
                } catch (e) {
                    console.error('Failed to parse progress', e);
                }
            }
            setPendingWord(null);
            setShowKeyHint(false);
        }
    }, [conversation?.id]);

    useEffect(() => {
        if (mode !== AppMode.STUDY) {
            setPendingWord(null);
            setShowKeyHint(false);
        }
    }, [mode]);

    useEffect(() => {
        if (conversation) {
            localStorage.setItem(`echo-progress-${conversation.id}`, JSON.stringify(progress));
        }
    }, [progress, conversation]);

    const handleWordSolved = (wordId: string) => {
        const newProgress = { ...progress, [wordId]: true };
        setProgress(newProgress);
        if (conversation) {
            localStorage.setItem(`echo-progress-${conversation.id}`, JSON.stringify(newProgress));
            checkAndUpdateAchievements();
        }
    };

    const handleResetProgress = () => {
        if (window.confirm("确定要重置进度吗？这将重新开始本课。")) {
            setProgress({});
            if (conversation) {
                localStorage.removeItem(`echo-progress-${conversation.id}`);
                setCurrentTime(fullAudioRange.start);
            }
        }
    };

    const fetchDictionaryCached = useCallback(async (word: string) => {
        const clean = word.toLowerCase().trim();
        if (dictCache.current[clean]) {
            setDictData(dictCache.current[clean]);
            setDictError(null);
            setDictLoading(false);
            return;
        }

        setDictLoading(true);
        setDictError(null);
        setDictData(null);

        try {
            const result = await fetchDictionary(word);
            dictCache.current[clean] = result;
            setDictData(result);
        } catch (e: any) {
            console.error("Dictionary lookup failed:", e);
            setDictError(e.message || 'Unknown error');
        } finally {
            setDictLoading(false);
        }
    }, []);

    const handleWordClick = (time: number, endTime: number, word: string) => {
        setCurrentTime(time);

        if (mode === AppMode.STUDY) {
            setPendingWord(word);
            setShowKeyHint(true);
            setTargetWordEndTime(endTime);
        } else {
            setTargetWordEndTime(null);
            setPendingWord(null);
            setShowKeyHint(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (mode === AppMode.STUDY && pendingWord && (event.key === 'k' || event.key === 'K')) {
                event.preventDefault();
                setSelectedWord(pendingWord);
                setDictModalOpen(true);
                fetchDictionaryCached(pendingWord);
                setPendingWord(null);
                setShowKeyHint(false);
            }

            if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                setIsPlaying(prev => !prev);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [mode, pendingWord, fetchDictionaryCached]);

    useEffect(() => {
        if (mode === AppMode.STUDY && targetWordEndTime !== null && isPlaying) {
            if (currentTime >= targetWordEndTime) {
                setIsPlaying(false);
                setTargetWordEndTime(null);
            }
        }
    }, [currentTime, targetWordEndTime, isPlaying, mode]);

    const activeDictationSentenceIdx = useMemo(() => {
        if (mode !== AppMode.DICTATION) return -1;

        let globalWordIndexCounter = 0;

        return validConversation.sentences.findIndex((sentence, sIdx) => {
            const isSentenceComplete = sentence.words.every((word, wIdx) => {
                const uniqueId = `${sIdx}-${wIdx}`;
                const isSolved = progress[uniqueId];

                const currentGlobalIndex = globalWordIndexCounter++;
                let isTarget = false;

                if (dictationDifficulty === 'hard') {
                    isTarget = true;
                } else if (dictationDifficulty === 'middle') {
                    if (currentGlobalIndex % 2 !== 0) isTarget = true;
                } else {
                    if ((currentGlobalIndex + 1) % 5 === 0) isTarget = true;
                }

                if (isTarget && !isSolved) return false;
                return true;
            });

            return !isSentenceComplete;
        });
    }, [validConversation, progress, mode, dictationDifficulty]);

    const effectiveStartTime = useMemo(() => {
        if (mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1) {
            return validConversation.sentences[activeDictationSentenceIdx].start;
        }
        return fullAudioRange.start;
    }, [mode, activeDictationSentenceIdx, validConversation, fullAudioRange]);

    const effectiveEndTime = useMemo(() => {
        if (mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1) {
            return validConversation.sentences[activeDictationSentenceIdx].end;
        }
        return fullAudioRange.end;
    }, [mode, activeDictationSentenceIdx, validConversation, fullAudioRange]);

    useEffect(() => {
        if (mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1) {
            const newStart = validConversation.sentences[activeDictationSentenceIdx].start;
            if (Math.abs(currentTime - newStart) > 1.0) {
                setCurrentTime(newStart);
            }
        }
    }, [activeDictationSentenceIdx, mode]);

    useEffect(() => {
        if (conversation && Object.keys(progress).length > 0) {
            checkAndUpdateAchievements();
        }
    }, [progress, conversation?.id]);

    const maxListeningTimeRef = useRef<number>(0);

    useEffect(() => {
        if (!conversation) return;
        const stats = getStatistics();
        maxListeningTimeRef.current = stats.listeningTime[conversation.id] || 0;
    }, [conversation?.id]);

    useEffect(() => {
        if (!conversation || !isPlaying) return;

        const interval = setInterval(() => {
            if (currentTime > maxListeningTimeRef.current) {
                maxListeningTimeRef.current = currentTime;
                updateListeningTime(conversation.id, currentTime);
            }
        }, 5000);

        if (currentTime > maxListeningTimeRef.current) {
            maxListeningTimeRef.current = currentTime;
            updateListeningTime(conversation.id, currentTime);
        }

        return () => clearInterval(interval);
    }, [conversation?.id, isPlaying, currentTime]);

    const activeSentenceIndex = useMemo(() => {
        return validConversation.sentences.findIndex(
            (s) => currentTime >= s.start && currentTime <= s.end
        );
    }, [validConversation, currentTime]);

    const totalWords = validConversation.sentences.reduce((acc, s) => acc + s.words.length, 0);
    const solvedCount = Object.keys(progress).length;
    const progressPercent = totalWords > 0 ? Math.round((solvedCount / totalWords) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="bg-white border-b border-slate-200 py-3 px-4 shadow-sm z-50 sticky top-0">
                <div className="max-w-4xl lg:max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/world/${effectiveCategoryId}/`}
                            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-sm font-medium">返回</span>
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-600 p-1.5 rounded-lg hidden sm:block">
                                <Headphones className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                                    {validConversation.title}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {solvedCount > 0 && (
                            <button
                                onClick={handleResetProgress}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-colors text-sm font-medium"
                                title="重置进度"
                            >
                                <RotateCcw size={14} />
                                <span className="hidden sm:inline">Remake</span>
                            </button>
                        )}

                        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-200">
                            <CheckCircle2 size={16} className={progressPercent === 100 ? "text-green-600" : "text-indigo-400"} />
                            <span className="text-sm font-semibold text-indigo-600">{progressPercent}%</span>
                        </div>
                    </div>
                </div>
            </header>

            <ModeSelector
                currentMode={mode}
                onModeChange={(newMode) => {
                    setMode(newMode);
                }}
                dictationDifficulty={dictationDifficulty}
                onDifficultyChange={setDictationDifficulty}
            />

            <main className="flex-1 w-full">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center py-6 space-y-2">
                        {mode === AppMode.STUDY ? (
                            <>
                                <p className="text-slate-400 text-sm italic">
                                    Focus on every single pronunciation & see definition by pressing K
                                </p>
                                {showKeyHint && pendingWord && (
                                    <div className="flex items-center justify-center gap-2 mt-3 animate-fade-in">
                                        <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
                                            <kbd className="px-2 py-1 bg-white border border-indigo-300 rounded text-xs font-mono font-semibold text-indigo-700 shadow-sm">
                                                K
                                            </kbd>
                                            <span className="text-sm text-indigo-700 font-medium">
                                                按 K 键启用 AI 翻译
                                            </span>
                                            {pendingWord && (
                                                <span className="text-xs text-indigo-500 ml-1">
                                                    ({pendingWord})
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : mode === AppMode.DICTATION ? (
                            <p className="text-indigo-600 font-medium text-sm animate-pulse">
                                Focus on the current sentence. It will loop until you finish it.
                            </p>
                        ) : (
                            <p className="text-slate-400 text-sm italic">
                                Focus on every single pronunciation
                            </p>
                        )}
                    </div>

                    <Transcript
                        conversation={validConversation}
                        mode={mode}
                        currentTime={currentTime}
                        dictationDifficulty={dictationDifficulty}
                        onWordSolved={handleWordSolved}
                        onWordClick={handleWordClick}
                        progress={progress}
                    />
                </div>
            </main>

            <AudioPlayer
                key={validConversation.id}
                src={audioSrc}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                playbackRate={playbackRate}
                onPlaybackRateChange={setPlaybackRate}
                currentTime={currentTime}
                onTimeUpdate={setCurrentTime}
                startTime={effectiveStartTime}
                endTime={effectiveEndTime}
                sentences={validConversation.sentences}
                loop={mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1}
            />

            <DictionaryModal
                isOpen={dictModalOpen}
                onClose={() => {
                    setDictModalOpen(false);
                    setPendingWord(null);
                    setShowKeyHint(false);
                }}
                word={selectedWord}
                data={dictData}
                loading={dictLoading}
                error={dictError}
            />
        </div>
    );
}
