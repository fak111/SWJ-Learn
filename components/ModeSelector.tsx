import React from 'react';
import { AppMode, DictationDifficulty } from '../types';
import { Eye, EyeOff, PenTool } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  dictationDifficulty: DictationDifficulty;
  onDifficultyChange: (diff: DictationDifficulty) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ 
    currentMode, 
    onModeChange, 
    dictationDifficulty, 
    onDifficultyChange 
}) => {
  
  const btnClass = (active: boolean) => 
    `flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        active 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
    }`;

  const diffBtnClass = (active: boolean, colorClass: string) => 
    `px-3 py-1 text-xs font-bold rounded-full transition-colors ${
        active ? colorClass : 'text-slate-400 hover:text-slate-600'
    }`;

  return (
    <div className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200 py-3">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => onModeChange(AppMode.BLIND)}
                    className={btnClass(currentMode === AppMode.BLIND)}
                >
                    <EyeOff size={16} /> Blind
                </button>
                <button 
                    onClick={() => onModeChange(AppMode.STUDY)}
                    className={btnClass(currentMode === AppMode.STUDY)}
                >
                    <Eye size={16} /> Study
                </button>
                <button 
                    onClick={() => onModeChange(AppMode.DICTATION)}
                    className={btnClass(currentMode === AppMode.DICTATION)}
                >
                    <PenTool size={16} /> Dictation
                </button>
            </div>

            {currentMode === AppMode.DICTATION && (
                <div className="flex items-center bg-white rounded-full p-1 border border-slate-200 shadow-sm">
                    <button 
                        onClick={() => onDifficultyChange('easy')}
                        className={diffBtnClass(dictationDifficulty === 'easy', 'bg-cyan-100 text-cyan-700')}
                    >
                        Easy (20%)
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button 
                        onClick={() => onDifficultyChange('middle')}
                        className={diffBtnClass(dictationDifficulty === 'middle', 'bg-amber-100 text-amber-700')}
                    >
                        Middle (50%)
                    </button>
                    <div className="w-px h-4 bg-slate-200 mx-1"></div>
                    <button 
                        onClick={() => onDifficultyChange('hard')}
                        className={diffBtnClass(dictationDifficulty === 'hard', 'bg-red-100 text-red-700')}
                    >
                        Hard (100%)
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default ModeSelector;