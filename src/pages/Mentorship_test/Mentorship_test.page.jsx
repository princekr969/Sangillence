import React, { useState, useEffect } from 'react';
import './mentorship_test.css';
import { questions } from './data/questions';
import PreQuiz from '../../components/Mentorship_test/PreQuiz';
import Quiz from '../../components/Mentorship_test/Quiz';
import Results from '../../components/Mentorship_test/Results';
import Registration from '../../components/Mentorship_test/Registration';
import { JeePredictionForm } from '../../components';

export default function MentorshipTestPage() {
  const [step, setStep] = useState('studentInfo');
  
  // Initial empty state for student data
  const initialStudentData = {
    fullName: "",
    email: "",
    jeeApplicationNo: "",
    passYear: "",
    registered: false
  };

  const [studentData, setStudentData] = useState(initialStudentData);
  const [preData, setPreData] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [efficiency, setEfficiency] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null); 

  // Handle student registration (Step 1)
  const handleStudentRegistration = (studentInfo) => {
    setStudentData(studentInfo);
    if(studentInfo.registered){
        setStep('landing');
    }
  };

  // UPDATED: Just save the result to state (don't send to Sheets yet)
  const handleAssessmentCompletion = (assessmentData) => {
    setAssessmentResult(assessmentData);
  }

  // UPDATED: Final Submission Handler (Triggers only at the very end)
  const handleRegister = (finalContactData) => {
    // 1. Merge Initial Data + Final Contact Data
    const completeStudentData = { 
        ...studentData, 
        ...finalContactData,
        registered: true 
    };

    // 2. Send EVERYTHING to Google Sheets now
    if (assessmentResult && preData) {
        sendToGoogleSheets(completeStudentData, assessmentResult, preData);
    } else {
        console.error("Missing assessment data during final submission");
    }

    setStep('success');

    // System Reset after success message
    setTimeout(() => {
      setStep('studentInfo'); 
      setStudentData(initialStudentData);
      setPreData(null);
      setQIdx(0);
      setAnswers({});
      setEfficiency(null);
      setAssessmentResult(null);
    }, 10000); // Increased to 10s for better UX
  };

   // Function to send data to Google Sheets
  const sendToGoogleSheets = async (studentData, assessmentData, initialData) => {
    try {
      // Your Google Apps Script Web App URL
      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbx6W7rrSG02pznbZD00tvWH4J5Rqnt34RbgK3pfJqL6MDhJuAMrBN0Y5HzgSg2bKD7Z/exec';
      
      const payload = {
        studentData: {
          fullName: studentData.fullName || "",
          email: studentData.email || "",
          jeeApplicationNo: studentData.jeeApplicationNo || "",
          passYear: studentData.passYear || ""
        },  
        assessmentData: {
          daysLeft: assessmentData.daysLeft || 0,
          efficiency: assessmentData.efficiency || "0",
          maxPredicted: assessmentData.maxPredicted || 0,
          minPredicted: assessmentData.minPredicted || 0,
          predictedMarks: assessmentData.predictedMarks || 0,
          probability: assessmentData.probability || "0",
          skillDNA: {
            all: assessmentData.skillDNA?.all || [],
            bottom3: assessmentData.skillDNA?.bottom3 || [],
            top3: assessmentData.skillDNA?.top3 || []
          },
          targetMarks: assessmentData.targetMarks || 0,
          verdict: {
            color: assessmentData.verdict?.color || "",
            msg: assessmentData.verdict?.msg || "",
            status: assessmentData.verdict?.status || ""
          },
          weakestLink: assessmentData.weakestLink || ""
        },
        preData: initialData || {}
      };
      
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    }
  };

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

  const handleBack = () => {
    setStep('studentInfo');
    setStudentData(initialStudentData);
    setPreData(null);
    setQIdx(0);
    setAnswers({});
    setEfficiency(null);
    setAssessmentResult(null);
  };

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


  return (
    <div className={`flex items-center justify-center py-16 px-4 sm:px-6 md:px-16`}>
      
      {/* Backgrounds */}
      <div className="sky-container night-bg">
        <div className="star-layer stars-1"></div>
        <div className="star-layer stars-2"></div>
        <div className="star-layer stars-3"></div>
      </div>
      <div className="sky-container sunrise-bg"></div>

      {/* Main Container */}
      <div className="max-w-7xl flex items-center justify-center relative" > 
        {step === 'studentInfo' && (
          <div className="flex flex-col items-center justify-center w-full">
            
            {/* --- SEO FIX START: Visible Text for Google Indexing --- */}
            <div className="text-center mb-8 max-w-3xl px-4 z-10 relative">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    JEE Trajectory Predictor 2026
                </h1>
                <p className="text-gray-200 text-lg md:text-xl drop-shadow-md">
                   Stop guessing your progress. Analyze your mock scores, predict your <span className="text-emerald-400 font-semibold">JEE 2026 Effiency</span>, and find out the improvements needed to bridge the gap. 
                   <span className="block mt-2 text-sm opacity-80">
                       A FREE AI based Psychometric Audit for JEE 2026 Aspirants.
                   </span>
                </p>
            </div>
            {/* --- SEO FIX END --- */}

            <div className="w-full max-w-2xl relative z-10">
              <JeePredictionForm 
                onComplete={handleStudentRegistration} 
              />
            </div>
          </div>
        )}

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
            onSubmit={handleAssessmentCompletion}
          />
        )}

        {step === 'register' && (
          <Registration 
            efficiency={efficiency} 
            onComplete={handleRegister} 
            onBack={handleBack} 
            initialData={studentData} 
          />
        )}

        {step === 'success' && (
          <div 
            className="glass-card" 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px'
            }}
          >
              <img 
                  src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
                  alt="Sangillence" 
                  style={{
                    height: '60px', 
                    marginBottom: '15px', 
                    filter: 'drop-shadow(0 0 15px rgba(5, 0, 0, 0.8))' 
                  }} 
                />
              
              <h1 style={{color:'#10b981', marginBottom: '15px'}}>
                JEE Predictor Challenge 2026: Your Score is Locked!
              </h1>
              
              <p style={{fontSize:'1.2rem', color:'white', maxWidth: '600px', lineHeight: '1.6'}}>
                Your JEE Mains 2026 Prediction is locked. Get back after JEE Mains Session 1 Results to unlock "FREE Mentorship" from our IITians/NITians/IIITians TOP Mentors.
              </p>
              
              <div style={{marginTop:'40px', fontSize:'0.8rem', color:'#64748b', opacity:0.7}}>
                You will receive an email confirmation shortly.
              </div>
          </div>
        )}
      </div>
    </div>
  );
}