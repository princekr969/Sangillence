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
  const [studentData, setStudentData] = useState({
    fullName: "",
    email: "",
    jeeApplicationNo: "",
    passYear: "",
    registered: false
  });

  const [preData, setPreData] = useState(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [efficiency, setEfficiency] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null); 

  // Handle student registration
  const handleStudentRegistration = (studentInfo) => {
    // console.log("Student registered:", studentInfo);
    setStudentData(studentInfo);
    if(studentInfo.registered){
        setStep('landing');
    }
  };

  const handleAssessmentCompletion = (assessmentData) => {
    // console.log("Assessment completed:", assessmentData); 
    setAssessmentResult(assessmentData);

    // Send data to Google Sheets when assessment is complete
    if (studentData && assessmentData && preData) {
      sendToGoogleSheets(studentData, assessmentData, preData);
    }
  }

   // Function to send data to Google Sheets
  const sendToGoogleSheets = async (studentData, assessmentData, initialData) => {
    try {
      // Your Google Apps Script Web App URL
      const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzZmgx892dOkH2jqz5ZBebGhQNqGArQjyH7mCn5JaV8iQoVw_8WZ_8UwyHx-pCKv5DaPg/exec';
      
      // Prepare the payload matching your data structure
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
      
      // console.log("Sending to Google Sheets:", payload);
      
      // Send data to Google Sheets using fetch with no-cors
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // console.log("Data sent successfully");
      
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    }
  };


  const handlePre = (data) => {
    setPreData(data);
    console.log(data)
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
    setStep('studentInfo');
    setPreData(null);
    setQIdx(0);
    setAnswers({});
    setEfficiency(null);
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
    <div className={` flex items-center justify-center py-16 px-4 sm:px-6 md:px-16`}>
      
      {/* Backgrounds */}
      <div className="sky-container night-bg">
        <div className="star-layer stars-1"></div>
        <div className="star-layer stars-2"></div>
        <div className="star-layer stars-3"></div>
      </div>
      <div className="sky-container sunrise-bg"></div>

      {/* Main Container */}
      <div className="max-w-7xl flex items-center justify-center" > 
        {step === 'studentInfo' && (
          <div className=" flex justify-center">
            <div className="w-full max-w-2xl">
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