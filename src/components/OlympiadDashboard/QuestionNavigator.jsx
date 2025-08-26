import React from 'react';

export const QuestionNavigator = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect,
}) => {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);

  const getQuestionButtonStyle = (questionNumber) => {
    const isAnswered = answeredQuestions.has(questionNumber);
    const isCurrent = questionNumber === currentQuestion;

    if (isCurrent) {
      return 'bg-teal-600 text-white border-teal-600';
    }
    if (isAnswered) {
      return 'bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200';
    }
    return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  };

  return (
    <div className="max-h-[410px] bg-white rounded-lg p-4 border border-gray-200 overflow-y-auto">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Questions</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((questionNumber) => (
          <button
            key={questionNumber}
            onClick={() => onQuestionSelect(questionNumber)}
            className={`
              w-10 h-10 rounded-lg border text-sm font-medium transition-all
              ${getQuestionButtonStyle(questionNumber)}
            `}
          >
            {questionNumber}
          </button>
        ))}
      </div>
    </div>
  );
};
