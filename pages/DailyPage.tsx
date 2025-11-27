import React, { useState, useEffect, useMemo } from 'react';
import { CONVERSATION_DATA } from '../constants';
import { AppMode, PlaybackRate, ProgressMap, Sentence, DictationDifficulty } from '../types';
import AudioPlayer from '../components/AudioPlayer';
import Transcript from '../components/Transcript';
import ModeSelector from '../components/ModeSelector';
import { Headphones, CheckCircle2, RotateCcw } from 'lucide-react';

const DailyPage: React.FC = () => {
    // Data
    const conversation = CONVERSATION_DATA[0]; // MVP: Load the first one
    const audioSrc = `/assets/${conversation.audio_source}`;
    const fullAudioRange = conversation.full_audio_range;
    const angelQrSrc = '/assets/wx.png';
    const milkTeaQrSrc = '/assets/wxzf.png';
    const documentationUrl = 'https://ai.feishu.cn/wiki/FRYBw8zXUiv4nWkd9FOcXhWRnTc?from=from_copylink';
    const githubUrl = 'https://github.com/fak111/SWJ-Learn';

    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(fullAudioRange.start);
    const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1.0);

    // App State
    const [mode, setMode] = useState<AppMode>(AppMode.STUDY);
    const [dictationDifficulty, setDictationDifficulty] = useState<DictationDifficulty>('easy');
    const [progress, setProgress] = useState<ProgressMap>({});
    const [activeModal, setActiveModal] = useState<'angel' | 'milk' | null>(null);

    // Load progress from local storage
    useEffect(() => {
        const saved = localStorage.getItem(`echo-progress-${conversation.id}`);
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) { console.error("Failed to load progress", e); }
        }
    }, [conversation.id]);

    // Save progress
    const handleWordSolved = (wordId: string) => {
        const newProgress = { ...progress, [wordId]: true };
        setProgress(newProgress);
        localStorage.setItem(`echo-progress-${conversation.id}`, JSON.stringify(newProgress));
    };

    const handleResetProgress = () => {
        if (window.confirm("Are you sure you want to reset your progress? This starts the lesson over.")) {
            setProgress({});
            localStorage.removeItem(`echo-progress-${conversation.id}`);
            // Optionally jump back to start
            setCurrentTime(fullAudioRange.start);
        }
    };

    const handleWordClick = (time: number) => {
        // In Dictation mode, clicking words is disabled to prevent cheating/breaking flow
        // unless we are in the "Solved" state.
        // But for better UX, if user clicks a solved word in dictation, we can jump there.
        setCurrentTime(time);
    };

    // --- Dictation Logic: Find the Active Sentence ---
    const activeDictationSentenceIdx = useMemo(() => {
        if (mode !== AppMode.DICTATION) return -1;

        let globalWordIndexCounter = 0;

        // Find the first sentence that has ANY missing words based on current difficulty
        return conversation.sentences.findIndex((sentence, sIdx) => {
            // Check if this sentence is "complete"
            const isSentenceComplete = sentence.words.every((word, wIdx) => {
                const uniqueId = `${sIdx}-${wIdx}`;
                const isSolved = progress[uniqueId];

                // Calculate if this word is supposed to be hidden
                const currentGlobalIndex = globalWordIndexCounter++;
                let isTarget = false;

                if (dictationDifficulty === 'hard') {
                    isTarget = true;
                } else if (dictationDifficulty === 'middle') {
                    // Middle (50%): odd global indices are targets (1, 3, 5...)
                    if (currentGlobalIndex % 2 !== 0) isTarget = true;
                } else {
                    // Easy (20%): every 5th word (4, 9, 14...)
                    if ((currentGlobalIndex + 1) % 5 === 0) isTarget = true;
                }

                // If it's a target word and not solved, the sentence is NOT complete
                if (isTarget && !isSolved) return false;

                return true;
            });

            return !isSentenceComplete;
        });
    }, [conversation, progress, mode, dictationDifficulty]);

    // --- Derived Audio Bounds ---
    // If in Dictation, we lock to the active sentence. Otherwise, full range.
    const effectiveStartTime = useMemo(() => {
        if (mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1) {
            return conversation.sentences[activeDictationSentenceIdx].start;
        }
        return fullAudioRange.start;
    }, [mode, activeDictationSentenceIdx, conversation, fullAudioRange]);

    const effectiveEndTime = useMemo(() => {
        if (mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1) {
            return conversation.sentences[activeDictationSentenceIdx].end;
        }
        return fullAudioRange.end;
    }, [mode, activeDictationSentenceIdx, conversation, fullAudioRange]);

    // Auto-jump logic: When active sentence changes (because user solved it),
    // update current time to the new start time.
    useEffect(() => {
        if (mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1) {
            const newStart = conversation.sentences[activeDictationSentenceIdx].start;
            // Only jump if we are far away (e.g., previous sentence)
            if (Math.abs(currentTime - newStart) > 1.0) {
                setCurrentTime(newStart);
                // Ensure we keep playing if we were playing
                if (isPlaying) {
                    // The AudioPlayer effect will handle the seek
                }
            }
        }
    }, [activeDictationSentenceIdx, mode]);


    const totalWords = useMemo(() => {
        return conversation.sentences.reduce((acc, s) => acc + s.words.length, 0);
    }, [conversation]);

    const solvedCount = Object.keys(progress).length;
    const progressPercent = Math.round((solvedCount / totalWords) * 100);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Headphones className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Echo</h1>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Daily Training</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <div className="flex flex-wrap justify-end gap-2">
                            <button
                                onClick={() => setActiveModal('angel')}
                                className="flex items-center gap-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200 px-3 py-1.5 text-sm font-medium transition hover:bg-pink-200"
                            >
                                <span role="img" aria-label="gift">🎁</span>
                                成为天使客户
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

                        <div className="flex items-center gap-3">
                            {solvedCount > 0 && (
                                <button
                                    onClick={handleResetProgress}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-colors text-sm font-medium"
                                    title="Reset all progress"
                                >
                                    <RotateCcw size={14} />
                                    <span className="hidden sm:inline">Remake</span>
                                </button>
                            )}

                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                <CheckCircle2 size={16} className={progressPercent === 100 ? "text-green-600" : "text-slate-400"} />
                                <span className="text-sm font-semibold text-slate-600">{progressPercent}% Solved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <ModeSelector
                currentMode={mode}
                onModeChange={setMode}
                dictationDifficulty={dictationDifficulty}
                onDifficultyChange={setDictationDifficulty}
            />

            <main className="flex-1 w-full">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-6 px-4">
                        <h2 className="text-2xl font-serif text-slate-800 font-medium mb-1">{conversation.title}</h2>
                        {mode === AppMode.DICTATION ? (
                            <p className="text-indigo-600 font-medium text-sm animate-pulse">
                                Focus on the current sentence. It will loop until you finish it.
                            </p>
                        ) : (
                            <p className="text-slate-500 text-sm">Listen carefully and fill in the blanks.</p>
                        )}
                    </div>

                    <Transcript
                        conversation={conversation}
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
                src={audioSrc}
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                playbackRate={playbackRate}
                onPlaybackRateChange={setPlaybackRate}
                currentTime={currentTime}
                onTimeUpdate={setCurrentTime}
                startTime={effectiveStartTime}
                endTime={effectiveEndTime}
                sentences={conversation.sentences}
                loop={mode === AppMode.DICTATION && activeDictationSentenceIdx !== -1}
            />

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
                                {activeModal === 'angel' ? '成为天使客户' : '请作者喝杯奶茶'}
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
};

export default DailyPage;
