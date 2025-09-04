import React from 'react';
import { ChevronLeft, Send } from 'lucide-react';

const QuizNavigation = ({ onPrevious, onSubmit, canGoPrevious, isLastQuestion }) => {
  return (
    <div className="flex justify-between items-center pt-6">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center px-6 py-2 rounded-md font-medium transition-all ${
          canGoPrevious
            ? 'text-blue-600 border border-blue-600 hover:bg-blue-50 hover:shadow-md'
            : 'text-gray-400 border border-gray-300 cursor-not-allowed'
        }`}
      >
        <ChevronLeft size={20} className="mr-2" />
        Previous
      </button>

      <button
        onClick={onSubmit}
        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 hover:shadow-md transition-all"
      >
        {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default QuizNavigation;
