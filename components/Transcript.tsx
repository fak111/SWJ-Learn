import React, { useEffect, useRef, useState } from 'react';
import { Conversation, AppMode, ProgressMap, DictationDifficulty } from '../types';

interface TranscriptProps {
  conversation: Conversation;
  mode: AppMode;
  currentTime: number;
  dictationDifficulty: DictationDifficulty;
  onWordSolved: (wordId: string) => void;
  onWordClick: (startTime: number, endTime: number, word: string) => void;
  progress: ProgressMap;
}

const Transcript: React.FC<TranscriptProps> = ({
  conversation,
  mode,
  currentTime,
  dictationDifficulty,
  onWordSolved,
  onWordClick,
  progress
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    // Find active sentence
    const activeSentenceIdx = conversation.sentences.findIndex(
      s => currentTime >= s.start && currentTime <= s.end
    );

    if (activeSentenceIdx !== -1 && scrollRef.current) {
      const element = document.getElementById(`sentence-${activeSentenceIdx}`);
      if (element) {
        // In Study/Dictation mode, centering is good.
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, conversation, mode]);


  const cleanWord = (text: string) => text.replace(/[^\w\s]|_/g, "").toLowerCase();

  // Counter for global word index to ensure continuous masking pattern
  let globalWordIndexCounter = 0;

  return (
    <div ref={scrollRef} className={`px-4 max-w-3xl mx-auto pt-8 transition-all duration-500 ${mode === AppMode.STUDY ? 'pb-[50vh]' : 'pb-40'}`}>
      <div className="space-y-4">
        {conversation.sentences.map((sentence, sIdx) => {
          const isActive = currentTime >= sentence.start && currentTime <= sentence.end;

          // Styles based on mode
          let containerClass = "transition-all duration-500 ease-in-out ";

          if (mode === AppMode.STUDY) {
            if (isActive) {
              containerClass += "opacity-100 py-12 scale-105 my-4";
            } else {
              containerClass += "opacity-30 blur-[1px] scale-95 grayscale my-0";
            }
          } else {
            // Dictation / Blind Mode Styles
            // If in Dictation, we might want to highlight the active loop sentence slightly
            containerClass += isActive ? "opacity-100 py-4 bg-white/50 rounded-lg -mx-2 px-2 shadow-sm" : "opacity-70 hover:opacity-100 py-2";
          }

          return (
            <div
              key={sIdx}
              id={`sentence-${sIdx}`}
              className={containerClass}
            >
              <div className={`flex flex-wrap gap-x-1.5 gap-y-2 leading-relaxed transition-all duration-300 ${mode === AppMode.STUDY ? 'text-xl sm:text-2xl justify-center text-center' : 'text-lg sm:text-xl'}`}>
                {sentence.words.map((wordObj, wIdx) => {
                  const isWordActive = isActive && currentTime >= wordObj.start && currentTime <= wordObj.end;
                  const uniqueId = `${sIdx}-${wIdx}`;
                  const isSolved = progress[uniqueId];

                  // Increment global counter for every word
                  const currentGlobalIndex = globalWordIndexCounter++;

                  // Logic for hiding words in Dictation mode
                  let isHidden = false;
                  if (mode === AppMode.DICTATION && !isSolved) {
                    if (dictationDifficulty === 'hard') {
                      isHidden = true;
                    } else if (dictationDifficulty === 'middle') {
                      // Middle mode: hide every 2nd word (odd indices)
                      if (currentGlobalIndex % 2 !== 0) isHidden = true;
                    } else {
                      // Easy mode (20%): hide every 5th word (indices 4, 9, 14...)
                      if ((currentGlobalIndex + 1) % 5 === 0) isHidden = true;
                    }
                  }

                  if (mode === AppMode.BLIND) {
                    return (
                      <span key={wIdx} className="bg-slate-200 text-transparent rounded select-none animate-pulse">
                        {wordObj.word}
                      </span>
                    );
                  }

                  if (isHidden) {
                    return (
                      <DictationInput
                        key={wIdx}
                        targetWord={wordObj.word}
                        onSolve={() => onWordSolved(uniqueId)}
                        cleaner={cleanWord}
                      />
                    );
                  }

                  return (
                    <span
                      key={wIdx}
                      className={`
                            px-0.5 rounded transition-all duration-150 cursor-pointer
                            ${mode !== AppMode.DICTATION ? 'hover:bg-indigo-100 hover:text-indigo-800' : ''}
                            ${isWordActive ? 'bg-indigo-100 text-indigo-700 font-medium scale-105 shadow-sm' : ''}
                            ${isSolved && mode === AppMode.DICTATION ? 'text-green-600 font-medium' : ''}
                        `}
                      onClick={(e) => {
                        e.stopPropagation();
                        onWordClick(wordObj.start, wordObj.end, wordObj.word);
                      }}
                      title="Tap for definition or jump to audio"
                    >
                      {wordObj.word}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Sub-component for individual input logic
const DictationInput: React.FC<{
  targetWord: string;
  onSolve: () => void;
  cleaner: (s: string) => string;
}> = ({ targetWord, onSolve, cleaner }) => {
  const [val, setVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate width based on target word length
  const width = Math.max(30, targetWord.length * 12);
  const cleanTarget = cleaner(targetWord);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setVal(newVal);

    const cleanInput = cleaner(newVal);

    // Check exact match
    if (cleanInput === cleanTarget) {
      // Auto-focus next input before this one unmounts
      const allInputs = document.querySelectorAll('input.dictation-input');
      const currentIndex = Array.from(allInputs).indexOf(e.target);

      // Try to focus the next input if it exists
      if (currentIndex !== -1 && currentIndex < allInputs.length - 1) {
        (allInputs[currentIndex + 1] as HTMLElement).focus();
      }

      onSolve();
      return;
    }
  };

  // Determine status for coloring
  // 'wrong' if input is not a prefix of target
  const isPrefix = cleanTarget.startsWith(cleaner(val));
  const isError = val.length > 0 && !isPrefix;

  return (
    <span className="relative inline-block">
      <input
        ref={inputRef}
        type="text"
        style={{ width: `${width}px` }}
        className={`dictation-input border-b-2 text-center bg-transparent focus:outline-none focus:border-indigo-500 transition-all font-mono text-base p-0 m-0
                    ${isError ? 'border-red-400 text-red-500' : 'border-slate-300 text-slate-800'}
                `}
        value={val}
        onChange={handleChange}
        autoCapitalize="off"
        autoComplete="off"
        spellCheck={false}
      />
    </span>
  );
};

export default Transcript;
