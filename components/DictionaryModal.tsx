import React from 'react';
import { X, Loader2, BookOpen } from 'lucide-react';
import { DictResult } from '../types';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string | null;
  data: DictResult | null;
  loading: boolean;
  error: string | null;
}

const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
  word,
  data,
  loading,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="pointer-events-auto w-full max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden flex flex-col mb-0 sm:mb-8 mx-0 sm:mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-600">
            <BookOpen size={20} />
            <h3 className="font-semibold text-slate-900">Dictionary</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto min-h-[200px]">
          {loading ? (
            <div className="h-40 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Loader2 size={32} className="animate-spin text-indigo-500" />
              <p className="text-sm font-medium">Consulting AI...</p>
            </div>
          ) : error ? (
            <div className="h-40 flex flex-col items-center justify-center text-red-500 text-center px-4">
              <p className="font-medium mb-1">Could not find definition.</p>
              <p className="text-xs text-red-400">{error}</p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              {/* Word & Phonetic */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <h2 className="text-3xl font-bold text-slate-900 capitalize">{data.word}</h2>
                  {data.phonetic && (
                    <span className="font-mono text-slate-500 text-lg">/{data.phonetic}/</span>
                  )}
                </div>
                {/* Translations */}
                <div className="flex flex-wrap gap-2">
                  {data.translations.map((t, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Definition */}
              {data.definition && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Definition</h4>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {data.definition}
                  </p>
                </div>
              )}

              {/* Examples */}
              {data.examples && data.examples.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Examples</h4>
                  <ul className="space-y-2">
                    {data.examples.map((ex, idx) => (
                      <li key={idx} className="text-slate-600 pl-3 border-l-2 border-indigo-200 italic">
                        "{ex}"
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-300">
              No data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryModal;
