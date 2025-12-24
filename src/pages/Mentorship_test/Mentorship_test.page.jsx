import React, { useState, useEffect } from 'react';
import './mentorship_test.css';
import { questions } from './data/questions';
import PreQuiz from '../../components/Mentorship_test/PreQuiz';
import Quiz from '../../components/Mentorship_test/Quiz';
import Results from '../../components/Mentorship_test/Results';
import Registration from '../../components/Mentorship_test/Registration';

export default function MentorshipTestPage() {
  const [step, setStep] = useState('landing');
  const [preData, setPreData] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [efficiency, setEfficiency] = useState(null);

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handlePre = (data) => {
    setPreData(data);
    setStep('quiz');
  };

  const handleAns = (qId, val) => {
    setAnswers({ ...answers, [qId]: val });
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      setStep('result');
    }
  };

  const handleRegister = (finalData) => {
    console.log("FULL DATA:", { ...preData, answers, ...finalData });
    setStep('success');

    // System Reset
    setTimeout(() => {
      setStep('landing');
      setPreData(null);
      setQIdx(0);
      setAnswers({});
      setEfficiency(null);
    }, 6000); 
  };

  const handleBack = () => {
    setStep('landing');
    setPreData(null);
    setQIdx(0);
    setAnswers({});
    setEfficiency(null);
  };

  const isSunrise = step === 'result';

  return (
    <div className={` flex items-center justify-center py-16 px-4 sm:px-6 md:px-16`}>
      
      {/* Backgrounds */}
      <div className="sky-container night-bg">
        <div className="star-layer stars-1"></div>
        <div className="star-layer stars-2"></div>
        <div className="star-layer stars-3"></div>
      </div>
      <div className="sky-container sunrise-bg"></div>

      {/* Main Container */}
      <div className="max-w-7xl" > 
        {step === 'landing' && <PreQuiz onStart={handlePre} />}
        
        {step === 'quiz' && (
          <Quiz 
            data={questions[qIdx]} 
            index={qIdx} 
            total={questions.length} 
            onAns={handleAns} 
          />
        )}

        {step === 'result' && (
          <Results 
            preData={preData} 
            answers={answers} 
            onNext={(eff) => { setEfficiency(eff); setStep('register'); }} 
            onBack={handleBack}
          />
        )}

        {step === 'register' && (
          <Registration efficiency={efficiency} onComplete={handleRegister} onBack={handleBack} />
        )}

        {step === 'success' && (
          <div className="glass-card">
            <h1 style={{color:'#10b981'}}>You are Registered!</h1>
            <p style={{fontSize:'1.2rem', color:'white'}}>If you got selected your mentor will contact you within 24 hrs.</p>
            
            <div style={{marginTop:'40px', fontSize:'0.8rem', color:'#64748b', opacity:0.7}}>
              You will received an email confirmation shortly.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}