import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import QuestionSidebar from './QuestionSidebar';
import QuizNavigation from './QuizNavigation';
import Timer from './Timer';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});

  // Student / form fields for Google Sheet
  const [schoolName, setSchoolName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState(''); // avoid reserved word "class"
  const [section, setSection] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [dob, setDob] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState('');


  // Sample quiz data
  const quizData = [
    {
      id: 1,
      question:
        "A 62-year-old man presents with nocturia, hesitancy and terminal dribbling. Prostate examination reveals a moderately enlarged prostate with no irregular features and a well defined median sulcus. Blood tests show; PSA1.3 ng/ml. What is the most appropriate management?",
      referenceRange: "Reference Range",
    },
    {
      id: 2,
      question:
        "A 45-year-old patient presents with chest pain and shortness of breath. ECG shows ST elevation in leads V1-V4. What is the most likely diagnosis and immediate management approach?",
      referenceRange: "Clinical Guidelines",
    },
    {
      id: 3,
      question:
        "A diabetic patient has an HbA1c of 8.5%. Current medications include metformin 1g BD. What would be the next most appropriate step in management?",
      referenceRange: "Diabetes Guidelines",
    },
    // Add more questions as needed
  ];

  const totalQuestions = quizData.length; // You can adjust this
  const currentQuestionData = quizData[currentQuestion - 1];
  const currentAnswer = answers[currentQuestion] || {
    textAnswer: "",
    numericalAnswer: "",
  };

  
  // Map answers to App Script expected parameter names and POST to Sheets endpoint
  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw5AO-hNrdOP_akBnfBRnSeeny-wWGL_DPhBdeMPMM8bnPnXFBjOALxsgtbGfiOI1Be/exec';

  const submitToSheet = async () => {
    setSubmitting(true);
    setSubmitResult('');
    try {
      const params = new URLSearchParams();
      params.append('schoolName', schoolName);
      params.append('studentName', studentName);
      params.append('class', className);
      params.append('section', section);
      params.append('rollNo', rollNo);
      params.append('dob', dob);

      // For up to 10 questions; fill missing with empty strings
      for (let i = 1; i <= 10; i++) {
        const ans = answers[i] || { numericalAnswer: '', textAnswer: '' };
        params.append(`q${i}int`, String(ans.numericalAnswer || ''));
        params.append(`q${i}desc`, String(ans.textAnswer || ''));
      }

      const res = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params.toString(),
      });

      const text = await res.text();
      setSubmitResult(text);
    } catch (err) {
      setSubmitResult('❌ Error: ' + (err.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  // When navigation submit is triggered and it's the last question, send data
  const handleSubmitOrNext = async () => {
    if (currentQuestion === totalQuestions) {
      await submitToSheet();
    } else {
      setCurrentQuestion((cq) => Math.min(totalQuestions, cq + 1));
    }
  };


  // Generate question status for sidebar
  const questionStatuses = Array.from({ length: totalQuestions }, (_, i) => {
    const questionId = i + 1;
    let status = "unanswered";

    if (questionId === currentQuestion) {
      status = "current";
    } else if (answers[questionId]) {
      // Mock status - you'd implement real logic here
      status = Math.random() > 0.3 ? "correct" : "incorrect";
    }

    return { id: questionId, status };
  });

  const handleTextAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: {
        ...currentAnswer,
        textAnswer: value,
      },
    }));
  };

  const handleNumericalAnswerChange = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: {
        ...currentAnswer,
        numericalAnswer: value,
      },
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleQuestionClick = (questionId) => {
    setCurrentQuestion(questionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Quiz Header */}
        <div className="mb-8">
             {/* Student info form - submitted to Google Sheet */}
          <div className="mb-4 p-4 bg-white rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="School Name" className="input" />
            <input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" className="input" />
            <input value={className} onChange={(e) => setClassName(e.target.value)} placeholder="Class" className="input" />
            <input value={section} onChange={(e) => setSection(e.target.value)} placeholder="Section" className="input" />
            <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" className="input" />
            <input value={dob} onChange={(e) => setDob(e.target.value)} placeholder="DOB (YYYY-MM-DD)" className="input" />
          </div>


          {/* Timers */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
            <Timer type="global" className="mb-4 sm:mb-0" />
            <Timer type="question" resetTrigger={currentQuestion} />
          </div>

          
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Question Area */}
          <div className="xl:col-span-3">
            {currentQuestionData && (
              <QuestionCard
                questionNumber={currentQuestion}
                totalQuestions={totalQuestions}
                questionText={currentQuestionData.question}
                textAnswer={currentAnswer.textAnswer}
                numericalAnswer={currentAnswer.numericalAnswer}
                onTextAnswerChange={handleTextAnswerChange}
                onNumericalAnswerChange={handleNumericalAnswerChange}
              />
            )}

            <QuizNavigation
              onPrevious={handlePrevious}
              onSubmit={handleNext}
              canGoPrevious={currentQuestion > 1}
              isLastQuestion={currentQuestion === totalQuestions}
            />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <QuestionSidebar
              questions={questionStatuses}
              onQuestionClick={handleQuestionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
