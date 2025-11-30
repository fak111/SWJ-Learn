import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CONVERSATION_DATA } from '../constants';
import { AppMode, PlaybackRate, ProgressMap, DictationDifficulty, DictResult } from '../types';
import AudioPlayer from '../components/AudioPlayer';
import Transcript from '../components/Transcript';
import ModeSelector from '../components/ModeSelector';
import DictionaryModal from '../components/DictionaryModal';
import { Headphones, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';
import OpenAI from 'openai';

const DailyPage: React.FC = () => {
    const { lessonId } = useParams<{ lessonId: string }>();

    // Find the conversation based on URL param
    const conversation = CONVERSATION_DATA.find(c => c.id === lessonId);

    // If not found, we will render a redirect or error later, but we need hooks to run first.
    const validConversation = conversation || CONVERSATION_DATA[0];

    const audioSrc = `assets/${validConversation.audio_source}`;
    const fullAudioRange = validConversation.full_audio_range;

    // QR Code
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

    // Dictionary State
    const [dictModalOpen, setDictModalOpen] = useState(false);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [dictData, setDictData] = useState<DictResult | null>(null);
    const [dictLoading, setDictLoading] = useState(false);
    const [dictError, setDictError] = useState<string | null>(null);
    const [targetWordEndTime, setTargetWordEndTime] = useState<number | null>(null);

    // Dictionary Cache
    const dictCache = useRef<Record<string, DictResult>>({});

    // Reset state when lesson changes
    useEffect(() => {
        if (conversation) {
            setIsPlaying(false);
            setCurrentTime(conversation.full_audio_range.start);

            const saved = localStorage.getItem(`echo-progress-${conversation.id}`);
            if (saved) {
                try {
                    setProgress(JSON.parse(saved));
                } catch (e) { console.error("Failed to load progress", e); }
            } else {
                setProgress({});
            }
        }
    }, [conversation?.id]);

    const handleWordSolved = (wordId: string) => {
        const newProgress = { ...progress, [wordId]: true };
        setProgress(newProgress);
        if (conversation) {
            localStorage.setItem(`echo-progress-${conversation.id}`, JSON.stringify(newProgress));
        }
    };

    const handleResetProgress = () => {
        if (window.confirm("Are you sure you want to reset your progress? This starts the lesson over.")) {
            setProgress({});
            if (conversation) {
                localStorage.removeItem(`echo-progress-${conversation.id}`);
                setCurrentTime(fullAudioRange.start);
            }
        }
    };

    const fetchDictionary = async (word: string) => {
        const clean = word.replace(/[^\w'-]/g, '').toLowerCase();
        if (!clean) return;

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
            // Initialize OpenAI Client for DeepSeek
            const client = new OpenAI({
                baseURL: import.meta.env.VITE_DEEPSEEK_BASE_URL || "https://api.deepseek.com",
                apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || "", // 从环境变量读取
                dangerouslyAllowBrowser: true // Required for client-side usage
            });

            const prompt = `Explain the word "${word}" for an English learner.
        Output MUST be a valid JSON object with this exact structure:
        {
          "word": "${word}",
          "phonetic": "IPA or phonetic spelling",
          "translations": ["Common Chinese translation 1", "Translation 2"],
          "definition": "A clear English definition.",
          "examples": ["Example sentence 1.", "Example sentence 2."]
        }`;

            const completion = await client.chat.completions.create({
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }],
            });

            let content = completion.choices[0].message.content;

            if (content) {
                // Remove markdown code blocks if present
                content = content.replace(/```json\s*|\s*```/g, "").trim();

                try {
                    const result: DictResult = JSON.parse(content);
                    dictCache.current[clean] = result;
                    setDictData(result);
                } catch (parseError) {
                    console.error("JSON Parse failed:", content);
                    throw new Error("Failed to parse AI response.");
                }
            } else {
                throw new Error("No definition found.");
            }

        } catch (e: any) {
            console.error("Dictionary lookup failed:", e);
            if (e.message?.includes('401')) {
                setDictError('Authentication Error: Invalid API Key.');
            } else if (e.message?.includes('Network Error') || e.message?.includes('fetch')) {
                setDictError('Network Error: Please check your connection or CORS settings.');
            } else {
                setDictError(e.message || 'Unknown error');
            }
        } finally {
            setDictLoading(false);
        }
    };

    // 修改 handleWordClick（第 149 行）：
    const handleWordClick = (time: number, endTime: number, word: string) => {
        setCurrentTime(time);

        // Only open dictionary in Study Mode
        if (mode === AppMode.STUDY) {
            setSelectedWord(word);
            setDictModalOpen(true);
            fetchDictionary(word);
            // 记录目标单词的结束时间，用于自动暂停
            setTargetWordEndTime(endTime);
        } else {
            // 非 Study 模式清空目标时间
            setTargetWordEndTime(null);
        }
    };

    // 在 handleWordClick 后面（大约第 159 行之后）添加新的 useEffect：
    useEffect(() => {
        // 只在 Study 模式下，且有目标结束时间，且正在播放时，才检查
        if (mode === AppMode.STUDY && targetWordEndTime !== null && isPlaying) {
            // 当播放时间到达或超过单词结束时间时，暂停
            if (currentTime >= targetWordEndTime) {
                setIsPlaying(false);
                setTargetWordEndTime(null); // 清空目标，避免重复触发
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

    if (!conversation) {
        return <Navigate to="/" replace />;
    }

    const totalWords = validConversation.sentences.reduce((acc, s) => acc + s.words.length, 0);
    const solvedCount = Object.keys(progress).length;
    const progressPercent = totalWords > 0 ? Math.round((solvedCount / totalWords) * 100) : 0;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-3 px-4 shadow-sm z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 -ml-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-full transition-colors" title="Back to Menu">
                            <ArrowLeft size={24} />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-600 p-1.5 rounded-lg hidden sm:block">
                                <Headphones className="text-white" size={20} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">{conversation.title}</h1>
                            </div>
                        </div>
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
                            <span className="text-sm font-semibold text-slate-600">{progressPercent}%</span>
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
                        {mode === AppMode.DICTATION ? (
                            <p className="text-indigo-600 font-medium text-sm animate-pulse">
                                Focus on the current sentence. It will loop until you finish it.
                            </p>
                        ) : (
                            <p className="text-slate-400 text-sm italic">Tap any word to jump to that point in audio{mode === AppMode.STUDY ? ' & see definition' : ''}</p>
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
                key={conversation.id}
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

            <DictionaryModal
                isOpen={dictModalOpen}
                onClose={() => setDictModalOpen(false)}
                word={selectedWord}
                data={dictData}
                loading={dictLoading}
                error={dictError}
            />
        </div>
    );
};

export default DailyPage;
