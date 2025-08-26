import React, { useState } from 'react';
import { TestHeader } from './TestHeader';
import { Timer } from './Timer';
import { QuestionTimer } from './QuestionTimer';
import { QuestionNavigator } from './QuestionNavigator';
import { QuestionContent } from './QuestionContent';
import { mockQuestions } from './mockQuestion';

function MainContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start at question 30 (0-indexed)
  const [answers, setAnswers] = useState(new Map());
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [questionTimerKey, setQuestionTimerKey] = useState(0);

  const totalQuestions = 50;
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const currentQuestionNumber = currentQuestionIndex + 1;

  const handleBack = () => {
    console.log('Going back to main menu');
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
    setQuestionTimerKey((prev) => prev + 1);
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = new Map(answers);
    newAnswers.set(currentQuestionNumber, answer);
    setAnswers(newAnswers);
  };

  const handleQuestionTimeUp = () => {
    console.log(`Time up for question ${currentQuestionNumber}`);
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTimerKey((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (answers.has(currentQuestionNumber) && answers.get(currentQuestionNumber)?.trim()) {
      const newAnsweredQuestions = new Set(answeredQuestions);
      newAnsweredQuestions.add(currentQuestionNumber);
      setAnsweredQuestions(newAnsweredQuestions);

      if (currentQuestionIndex < mockQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestionTimerKey((prev) => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionTimerKey((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTimerKey((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TestHeader title="Sangillence" onBack={handleBack} />
      
      <div className="flex gap-6 p-6 h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 space-y-2 pr-4 h-[calc(100vh-80px)]">
          {/* Common Timer */}
          <Timer 
            initialMinutes={29} 
            initialSeconds={16} 
            label="Timer"
            variant="primary"
          />
          
          {/* Question Timer */}
          <QuestionTimer
            key={questionTimerKey}
            initialMinutes={0}
            initialSeconds={0}
            onTimeUp={handleQuestionTimeUp}
            isActive={true}
          />
          
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestionNumber}
            answeredQuestions={answeredQuestions}
            onQuestionSelect={handleQuestionSelect}
          />
          
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <QuestionContent
            question={currentQuestion}
            selectedAnswer={answers.get(currentQuestionNumber) || ''}
            onAnswerSelect={handleAnswerSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            canGoPrevious={currentQuestionIndex > 0}
            canGoNext={currentQuestionIndex < mockQuestions.length - 1}
            currentQuestionNumber={currentQuestionNumber}
            totalQuestions={totalQuestions}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
