import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, RotateCcw, BookOpen } from 'lucide-react';
import { TestData, TestResult } from '../types';

interface TestPanelProps {
  isOpen: boolean;
  onClose: () => void;
  testData: TestData | null;
  loading: boolean;
  error: string | null;
  onComplete: (allCorrect: boolean) => void;
}

const TestPanel: React.FC<TestPanelProps> = ({
  isOpen,
  onClose,
  testData,
  loading,
  error,
  onComplete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  // 初始化选中答案数组
  React.useEffect(() => {
    if (testData && !submitted) {
      setSelectedAnswers(new Array(testData.questions.length).fill(null));
      setResults([]);
    }
  }, [testData, submitted]);

  // 重置状态当面板关闭时
  React.useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSelectedAnswers([]);
      setResults([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (submitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!testData) return;

    // 检查是否所有题目都已作答
    if (selectedAnswers.some(answer => answer === null)) {
      return;
    }

    // 计算答题结果
    const newResults: TestResult[] = testData.questions.map((question, index) => {
      const selected = selectedAnswers[index];
      return {
        questionIndex: index,
        selectedAnswer: selected,
        isCorrect: selected === question.correctAnswer,
      };
    });

    setResults(newResults);
    setSubmitted(true);
  };

  const allAnswered = selectedAnswers.every(answer => answer !== null);
  const allCorrect = results.length > 0 && results.every(result => result.isCorrect);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="pointer-events-auto w-full max-w-2xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden flex flex-col mb-0 sm:mb-8 mx-0 sm:mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-600">
            <BookOpen size={20} />
            <h3 className="font-semibold text-slate-900">听力理解测试</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="h-40 flex flex-col items-center justify-center text-slate-400 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <p className="text-sm font-medium">正在生成测试题目...</p>
            </div>
          ) : error ? (
            <div className="h-40 flex flex-col items-center justify-center text-red-500 text-center px-4">
              <XCircle size={32} className="mb-2" />
              <p className="font-medium mb-1">无法加载测试题目</p>
              <p className="text-xs text-red-400">{error}</p>
            </div>
          ) : testData ? (
            <div className="space-y-6">
              {testData.questions.map((question, qIndex) => {
                const selected = selectedAnswers[qIndex];
                const result = results[qIndex];
                const isCorrect = result?.isCorrect ?? false;
                const showFeedback = submitted && result !== undefined;

                return (
                  <div
                    key={qIndex}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      showFeedback
                        ? isCorrect
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Question */}
                    <div className="flex items-start gap-3 mb-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                        {qIndex + 1}
                      </span>
                      <p className="text-slate-900 font-medium text-base flex-1">{question.question}</p>
                      {showFeedback && (
                        <div className="flex-shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 size={20} className="text-green-600" />
                          ) : (
                            <XCircle size={20} className="text-red-600" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-2 ml-9">
                      {question.options.map((option, oIndex) => {
                        const isSelected = selected === oIndex;
                        const isCorrectOption = oIndex === question.correctAnswer;
                        const showCorrect = showFeedback && isCorrectOption;
                        const showWrong = showFeedback && isSelected && !isCorrect;

                        return (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswerSelect(qIndex, oIndex)}
                            disabled={submitted}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                              showCorrect
                                ? 'bg-green-100 border-green-300 text-green-900'
                                : showWrong
                                ? 'bg-red-100 border-red-300 text-red-900'
                                : isSelected
                                ? 'bg-indigo-50 border-indigo-300 text-indigo-900'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50'
                            } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                                showCorrect || (isSelected && !showWrong)
                                  ? 'border-current bg-current text-white'
                                  : 'border-current'
                              }`}>
                                {String.fromCharCode(65 + oIndex)}
                              </span>
                              <span className="flex-1">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback for wrong answer */}
                    {showFeedback && !isCorrect && (
                      <div className="mt-3 ml-9 text-sm text-red-600">
                        正确答案: <span className="font-semibold">{String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit Button or Result */}
              {!submitted ? (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      allAnswered
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    提交答案
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-4">
                  {allCorrect ? (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
                      <p className="text-green-900 font-semibold text-lg mb-2">恭喜！全部答对</p>
                      <p className="text-green-700 text-sm mb-4">现在可以查看原文了</p>
                      <button
                        onClick={() => onComplete(true)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                      >
                        查看原文
                      </button>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 text-center">
                      <XCircle size={48} className="text-amber-600 mx-auto mb-3" />
                      <p className="text-amber-900 font-semibold text-lg mb-2">还有题目答错了</p>
                      <p className="text-amber-700 text-sm mb-4">建议重听音频，加深理解</p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={onClose}
                          className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg flex items-center gap-2"
                        >
                          <RotateCcw size={18} />
                          重听
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-slate-300">
              暂无测试数据
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPanel;

