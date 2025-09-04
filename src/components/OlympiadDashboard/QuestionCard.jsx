import React from 'react';
import { ExternalLink } from 'lucide-react';

const QuestionCard = ({
  questionNumber,
  totalQuestions,
  questionText,
  textAnswer,
  numericalAnswer,
  onTextAnswerChange,
  onNumericalAnswerChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Question {questionNumber}/{totalQuestions}:
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">{questionText}</p>
        
        
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="textAnswer" className="block text-sm font-medium text-gray-700 mb-2">
            Text Answer
          </label>
          <textarea
            id="textAnswer"
            rows={4}
            value={textAnswer}
            onChange={(e) => onTextAnswerChange(e.target.value)}
            placeholder="Enter your detailed answer here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="numericalAnswer" className="block text-sm font-medium text-gray-700 mb-2">
            Numerical Answer
          </label>
          <input
            type="text"
            id="numericalAnswer"
            value={numericalAnswer}
            onChange={(e) => onNumericalAnswerChange(e.target.value)}
            placeholder="Enter numerical value..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
