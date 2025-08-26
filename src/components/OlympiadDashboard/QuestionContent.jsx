import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const QuestionContent = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onPrevious,
  onNext,
  onSubmit,
  canGoPrevious,
  canGoNext,
  currentQuestionNumber,
  totalQuestions,
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onAnswerSelect(value);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Navigation Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            canGoPrevious
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Question {currentQuestionNumber}
        </h2>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            canGoNext
              ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
              : 'border-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-6">
        <div className="mb-8">
          <h3 className="text-base font-medium text-teal-600 mb-4">Test</h3>
          <h4 className="text-sm font-medium text-gray-600 mb-4">Test Potensi Skolastik</h4>
          <p className="text-gray-800 leading-relaxed mb-6">{question.text}</p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-2 block">
              Masukkan jawaban:
            </span>
            <textarea
              value={selectedAnswer}
              onChange={handleInputChange}
              placeholder="Masukkan jawaban..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-lg resize-none"
              rows={3}
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onSubmit}
          disabled={!selectedAnswer.trim()}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedAnswer.trim()
              ? 'bg-teal-600 text-white hover:bg-teal-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
