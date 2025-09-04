import React from 'react';
import { Check, X } from 'lucide-react';

const QuestionSidebar = ({ questions, onQuestionClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'correct':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'incorrect':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'current':
        return 'bg-blue-100 text-blue-800 border-blue-300 ring-2 ring-blue-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return <Check size={16} />;
      case 'incorrect':
        return <X size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-fit max-h-[calc(100vh-200px)] flex flex-col">
      <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
      <div className="space-y-2 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionClick(question.id)}
            className={`w-full flex items-center justify-between p-3 rounded-md border transition-all hover:shadow-sm ${getStatusColor(
              question.status
            )}`}
          >
            <span className="font-medium">Question {question.id}</span>
            {getStatusIcon(question.status)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSidebar;
