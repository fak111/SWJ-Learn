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

  // Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(fullAudioRange.start);
  const [playbackRate, setPlaybackRate] = useState<PlaybackRate>(1.0);

  // App State
  const [mode, setMode] = useState<AppMode>(AppMode.STUDY);
  const [dictationDifficulty, setDictationDifficulty] = useState<DictationDifficulty>('easy');
  const [progress, setProgress] = useState<ProgressMap>({});

  // Load progress from local storage
  useEffect(() => {
    const saved = localStorage.getItem(`echo-progress-${conversation.id}`);
    if (saved) {
        try {
            setProgress(JSON.parse(saved));
        } catch(e) { console.error("Failed to load progress", e); }
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
              if(isPlaying) {
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
    </div>
  );
};

export default DailyPage;