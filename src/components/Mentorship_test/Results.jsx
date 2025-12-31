import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { calculateAnalysis } from '../../pages/Mentorship_test/data/logic';
// import { questions } from '../data/questions';
import LoadingScreen from './LoadingScreen';

// src/data/questions.js

const questions = [
  // --- SECTION 1: THE "TRUENESS" DETECTORS (High Impact) ---
  { id: 101, text: "When you get stuck on a hard problem, do you struggle with it for at least 20 minutes before checking the solution?", type: "positive", bayesWeight: 3.0 },
  { id: 102, text: "Is your phone switched off or in another room during your core 3-hour study blocks?", type: "positive", bayesWeight: 2.5 },
  { id: 103, text: "Have you successfully hit 100% of your daily study targets for the last 3 days in a row?", type: "positive", bayesWeight: 3.5 },
  { id: 104, text: "Do you solve mock tests with a strict timer, simulating real exam pressure?", type: "positive", bayesWeight: 2.0 },
  { id: 105, text: "If you don't achieve your desired rank, do you accept that it will be 100% your fault (no excuses)?", type: "positive", bayesWeight: 2.5 },
  { id: 106, text: "Do you honestly review your weak topics every single week?", type: "positive", bayesWeight: 2.2 },
  { id: 107, text: "Do you maintain a consistent sleep schedule (sleeping and waking at the same time) every day?", type: "positive", bayesWeight: 1.5 },

  // --- SECTION 2: STRATEGY & ROADMAP ---
  { id: 1, text: "I have a written study plan that details exactly what to complete by the end of this month.", type: "positive", bayesWeight: 1.2 },
  { id: 2, text: "I feel overwhelmed by the sheer amount of study material and often switch books.", type: "negative", bayesWeight: 1.3 },
  { id: 3, text: "I have a dedicated 'Revision Slot' in my weekly timetable.", type: "positive", bayesWeight: 1.2 },
  { id: 4, text: "I struggle to balance my school/board exam work with my JEE preparation.", type: "negative", bayesWeight: 1.0 },
  { id: 5, text: "I know exactly which chapters are 'High Weightage' and prioritize them.", type: "positive", bayesWeight: 1.1 },

  // --- SECTION 3: DISCIPLINE & EXECUTION ---
  { id: 6, text: "I frequently create a timetable but fail to follow it after 2 or 3 days.", type: "negative", bayesWeight: 1.5 },
  { id: 7, text: "I have a large 'Backlog' of unfinished chapters that keeps growing.", type: "negative", bayesWeight: 1.4 },
  { id: 8, text: "I spend more than 2 hours a day on digital distractions (Reels, Gaming).", type: "negative", bayesWeight: 1.6 },
  { id: 9, text: "I can sit and study with deep focus for a 3-hour stretch without getting up.", type: "positive", bayesWeight: 1.4 },
  { id: 10, text: "I often sacrifice sleep (getting less than 6 hours) to complete targets, feeling tired the next day.", type: "negative", bayesWeight: 1.1 },

  // --- SECTION 4: SUBJECT PROFICIENCY ---
  { id: 11, text: "I spend most time on my favorite subject and avoid the difficult one.", type: "negative", bayesWeight: 1.3 },
  { id: 12, text: "I focus on understanding the core concept rather than memorizing steps.", type: "positive", bayesWeight: 1.2 },
  { id: 13, text: "I memorize formulas but struggle to apply them in twisted questions.", type: "negative", bayesWeight: 1.2 },
  { id: 14, text: "I consistently neglect Inorganic Chemistry or Organic memorization.", type: "negative", bayesWeight: 1.1 },

  // --- SECTION 5: TEST TAKING SKILLS ---
  { id: 15, text: "I spend at least 2-3 hours analyzing mistakes after every mock test.", type: "positive", bayesWeight: 1.5 },
  { id: 16, text: "I lose a lot of marks due to 'Silly Mistakes' (calculation errors).", type: "negative", bayesWeight: 1.3 },
  { id: 17, text: "I often run out of time during exams and leave questions unattempted.", type: "negative", bayesWeight: 1.2 },
  { id: 18, text: "A low mock score demotivates me for days.", type: "negative", bayesWeight: 1.4 },
  { id: 19, text: "I often guess answers just to increase my attempt count.", type: "negative", bayesWeight: 1.3 },

  // --- SECTION 6: PSYCHOLOGY & MINDSET ---
  { id: 20, text: "I feel paralyzed by the high expectations of my parents or teachers.", type: "negative", bayesWeight: 1.0 },
  { id: 21, text: "I feel lonely and have no one to talk to about the pressure.", type: "negative", bayesWeight: 0.9 },
  { id: 22, text: "Seeing peers perform better makes me want to quit.", type: "negative", bayesWeight: 1.2 },
  { id: 23, text: "I experience physical symptoms of stress (headaches, eye strain).", type: "negative", bayesWeight: 0.8 },
  { id: 24, text: "I constantly worry about 'What if I fail?' instead of studying.", type: "negative", bayesWeight: 1.1 },
  { id: 25, text: "I have a calm mindset and a 'Plan B' that keeps me stable.", type: "positive", bayesWeight: 1.0 }
];

export default function Results({ preData, answers, onNext, onBack }) {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showHabitInfo, setShowHabitInfo] = useState(false);
  const [showProbabilityInfo, setShowProbabilityInfo] = useState(false);
  
  const reportRef = useRef(null);

  useEffect(() => {
    const data = calculateAnalysis(preData.current, preData.target, answers, questions, preData);
    setRes(data);
  }, [preData, answers]);

  const handleVideoComplete = () => {
    setIsLoading(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'I have predicted my JEE 2026 Trajectory with Sangillence!',
      text: `🔥 JEE Audit Report:\n\n📉 Efficiency: ${res.efficiency}%\n🎯 Predicted: ${res.predictedMarks}/300\nI have predicted my JEE 2026 Trajectory with Sangillence!\n\nCheck your reality here:`,
      url: window.location.href 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`, '_blank');
      }
      setTimeout(() => {
        setIsUnlocked(true);
        alert("Report Unlocked!");
      }, 2000);
    } catch (err) {
      console.log('Error sharing', err);
    }
  };

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    
    try {
      reportRef.current.style.display = 'block'; 
      reportRef.current.style.position = 'absolute';
      reportRef.current.style.left = '-9999px';
      
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#020617', 
        useCORS: true,
        logging: false,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Fit to single page - scale down if needed
      const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;
      const finalWidth = imgHeight > pdfHeight ? (imgWidth * pdfHeight) / imgHeight : imgWidth;
      
      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      pdf.save(`Sangillence_JEE_Report_${res.efficiency}.pdf`);
      
      reportRef.current.style.display = 'none'; 
      reportRef.current.style.position = 'relative';
      reportRef.current.style.left = 'auto';

    } catch (err) {
      console.error("PDF Error:", err);
      alert("Error generating report.");
    }
    
    setIsGeneratingPdf(false);
  };

  if (isLoading) return <LoadingScreen onComplete={handleVideoComplete} />;
  if (!res) return null;

  // Weakness Logic
  const lowestScoreValue = Math.min(...res.skillDNA.all.map(s => s.visualScore));
  const tiedWeaknesses = res.skillDNA.all
    .filter(s => s.visualScore === lowestScoreValue)
    .map(s => s.name);
  const weakestLinkString = tiedWeaknesses.join(" & ");

  return (
    <>
      {/* Added position: relative to container for absolute positioning of timer */}
      <div className="glass-card result-card" style={{position: 'relative'}}>
        
        {/* --- [NEW] VISIBLE PAGE TIMER --- */}
        <div style={{
           position: 'absolute',
           top: '20px',
           right: '20px',
           background: 'rgba(99, 102, 241, 0.15)',
           border: '1px solid rgba(99, 102, 241, 0.3)',
           padding: '6px 12px',
           borderRadius: '20px',
           color: '#e2e8f0',
           fontSize: '0.8rem',
           fontWeight: '600',
           display: 'flex',
           alignItems: 'center',
           gap: '6px',
           boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
           zIndex: 10
        }}>
           <span>⏳</span>
           <span>{res.daysLeft} Days Left</span>
        </div>

        {/* LOGO */}
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
          <img 
            src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
            alt="Sangillence" 
            style={{height: '60px', filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.6))'}} 
          />
        </div>

        <h1 className="result-main-heading" style={{color: '#ffffffff'}}>Your JEE Trajectory Report</h1>

        {/* METRICS WITH INTERACTIVE INFO BUTTONS */}
        <div className="metrics-with-info">
          
          {/* CARD 1: Habit Efficiency */}
          <div 
            className="info-card habit-card"
            style={{
              background: showHabitInfo ? 'linear-gradient(135deg, rgba(79, 102, 229, 0.28), rgba(139, 92, 246, 0.18))' : 'rgba(255, 255, 255, 0.1)',
              border: showHabitInfo ? '1.5px solid rgba(99, 102, 241, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
              boxShadow: showHabitInfo ? '0 0 30px rgba(79, 102, 229, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: showHabitInfo ? '12px' : '0'}}>
              <div>
                <div className="card-label" style={{color: showHabitInfo ? '#818cf8' : '#94a3b8', transition: 'color 0.3s ease'}}>Habit Efficiency</div>
                <div className="metric-large" style={{
                  color: showHabitInfo ? '#99f3ff' : '#f8fafc', 
                  transition: 'color 0.3s ease',
                  textShadow: showHabitInfo ? '0 0 10px rgba(79, 102, 229, 0.5)' : 'none'
                }}>{res.efficiency}%</div>
              </div>
              <button 
                className="info-icon-btn" 
                onClick={() => setShowHabitInfo(!showHabitInfo)}
                style={{
                  background:'none', 
                  border:'none', 
                  cursor:'pointer', 
                  fontSize:'1.4rem', 
                  padding: '4px 8px', 
                  transition: 'all 0.3s ease',
                  transform: showHabitInfo ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: showHabitInfo ? '#a78bfa' : '#64748b'
                }}
              >
                {showHabitInfo ? '✕' : '▼'}
              </button>
            </div>
            
            {/* Info Box */}
            {showHabitInfo && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(79, 102, 229, 0.1))',
                border: '1px solid rgba(99, 102, 241, 0.45)',
                padding: '12px 14px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#cbd5e1',
                lineHeight: '1.6',
                marginTop: '8px',
                animation: 'slideDown 0.3s ease-out'
              }}>
                Based on your habits, skill developed and efficiency. Higher values indicate better study habits alignment.
              </div>
            )}
          </div>

          {/* CARD 2: Probability */}
          <div 
            className="info-card probability-card"
            style={{
              background: showProbabilityInfo ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.26), rgba(52, 211, 153, 0.16))' : 'rgba(255, 255, 255, 0.1)',
              border: showProbabilityInfo ? '1.5px solid rgba(16, 185, 129, 0.6)' : '1px solid rgba(255, 255, 255, 0.15)',
              transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
              boxShadow: showProbabilityInfo ? '0 0 30px rgba(16, 185, 129, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: showProbabilityInfo ? '12px' : '0'}}>
              <div>
                <div className="card-label" style={{color: showProbabilityInfo ? '#6ee7b7' : '#94a3b8', transition: 'color 0.3s ease'}}>Success Rate</div>
                <div className="metric-large" style={{ 
                  color: showProbabilityInfo ? '#5eead4' : '#f8fafc',
                  transition: 'color 0.3s ease',
                  textShadow: showProbabilityInfo ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none'
                }}>
                  {res.probability}%
                </div>
              </div>
              <button 
                className="info-icon-btn" 
                onClick={() => setShowProbabilityInfo(!showProbabilityInfo)}
                style={{
                  background:'none', 
                  border:'none', 
                  cursor:'pointer', 
                  fontSize:'1.4rem', 
                  padding: '4px 8px', 
                  transition: 'all 0.3s ease',
                  transform: showProbabilityInfo ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: showProbabilityInfo ? '#6ee7b7' : '#64748b'
                }}
              >
                {showProbabilityInfo ? '✕' : '▼'}
              </button>
            </div>

            {/* Info Box */}
            {showProbabilityInfo && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.45)',
                padding: '12px 14px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: '#e2e8f0',
                lineHeight: '1.6',
                marginTop: '8px'
              }}>
                Mathematical probability of achieving your target score of {res.targetMarks}+ based on your current trajectory and study patterns.
              </div>
            )}
          </div>
        </div>

        {/* VERDICT */}
        <div className="verdict-section">
           <div className="verdict-status" style={{ color: res.verdict.color, fontWeight:'bold', textTransform:'uppercase' }}>
             {res.verdict.status}
           </div>
           <p className="verdict-message">{res.verdict.msg}</p>
        </div>

        {/* SOCIAL GATE */}
        <div className="action-buttons-container">
          {!isUnlocked ? (
             <button 
               className="action-btn share-btn pulse-animation" 
               onClick={handleShare}
               style={{background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', width: '100%', border:''}}
             >
               <span>🔒 Share to Unlock Full Report</span>
             </button>
          ) : (
             <button 
               className="action-btn download-btn" 
               onClick={handleDownloadPdf} 
               disabled={isGeneratingPdf}
               style={{width: '100%', animation: 'fadeIn 0.5s'}}
             >
               {isGeneratingPdf ? '⏳ Generating PDF...' : '📥 Download Full PDF Report'}
             </button>
          )}
        </div>

        <p style={{fontSize:'0.85rem', color:'#94a3b8', marginTop:'15px', fontStyle:'italic'}}>
          *Share your Top 3 Challenges in the next step and get a chance for FREE mentorship.
        </p>

        <div className='flex mt-5 justify-between  gap-5'>
          <button 
            className="bg-gray-600 rounded-lg py-4 px-8 font-semibold shadow-lg text-white hover:bg-gray-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]" 
            onClick={onBack}
          >
              Back
          </button>
            <button 
              className="group relative py-4 px-6 font-semibold rounded-lg shadow-lg transition-all duration-300 transform overflow-hidden border border-gray-400 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onNext(res.efficiency)}
            >
              {/* Continuous shine animation overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Geometric hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Win a Chance
              </span>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
        </div>
      </div>

      {/* --- HIDDEN PDF TEMPLATE --- */}
      <div 
        id="pdf-report-template" 
        ref={reportRef} 
        style={{
          display: 'none', 
          width: '210mm',
          height: '297mm',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#e2e8f0',
          padding: '12mm',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          position: 'relative',
          margin: '0',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
         {/* 1. PDF HEADER */}
         <div style={{borderBottom: '2px solid rgba(99, 102, 241, 0.3)', paddingBottom:'12px', marginBottom:'15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
               <img 
                 src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
                 alt="Sangillence" 
                 style={{height: '40px'}} 
               />
               <div>
                 <h1 style={{color:'#f8fafc', margin:0, fontSize:'1.4rem', fontWeight: 700}}>JEE Trajectory Audit</h1>
                 <p style={{color:'#94a3b8', margin:'2px 0 0 0', fontSize:'0.7rem', letterSpacing:'1px', textTransform:'uppercase', fontWeight: 600}}>A Sangillence Product</p>
               </div>
            </div>
            
            <div style={{textAlign:'right'}}>
              {/* --- [NEW] PDF HEADER TIMER --- */}
              <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  marginBottom: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                 <span style={{fontSize: '0.7rem'}}>⏳</span>
                 <span style={{fontSize: '0.7rem', fontWeight: 600, color: '#f8fafc'}}>
                    {res.daysLeft} Days to JEE
                 </span>
              </div>
              {/* ------------------------------- */}

              <h2 style={{margin:0, color: '#10b981', fontSize:'1.6rem', fontWeight: 800}}>{res.efficiency}%</h2>
              <p style={{margin:0, color:'#cbd5e1', fontSize:'0.75rem', fontWeight: 500}}>Habit Efficiency Score</p>
            </div>
         </div>

         {/* 2. THREE-COLUMN METRICS */}
         <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'10px', marginBottom:'20px'}}>
            <div style={{background:'linear-gradient(135deg, rgba(79, 102, 229, 0.15), rgba(79, 102, 229, 0.08))', padding:'10px', borderRadius:'6px', textAlign:'center', border: '1px solid rgba(99, 102, 241, 0.3)'}}>
               <h3 style={{color:'#94a3b8', fontSize:'0.65rem', textTransform:'uppercase', margin:'0 0 6px 0', fontWeight: 600, letterSpacing: '0.5px'}}>Predicted JEE Score</h3>
               <div style={{fontSize:'1.5rem', fontWeight:'bold', color: '#99f3ff'}}>
                 {res.predictedMarks}
               </div>
               <span style={{fontSize:'0.7rem', color:'#64748b', fontWeight: 500}}>/ 300</span>
            </div>

            <div style={{background:'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.08))', padding:'10px', borderRadius:'6px', textAlign:'center', border:'1px solid rgba(16, 185, 129, 0.3)'}}>
               <h3 style={{color:'#94a3b8', fontSize:'0.65rem', textTransform:'uppercase', margin:'0 0 6px 0', fontWeight: 600, letterSpacing: '0.5px'}}>Target Goal</h3>
               <div style={{fontSize:'1.5rem', fontWeight:'bold', color:'#5eead4'}}>
                 {res.targetMarks}
               </div>
               <span style={{fontSize:'0.7rem', color:'#64748b', fontWeight: 500}}>/ 300</span>
            </div>

            <div style={{background:'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08))', padding:'10px', borderRadius:'6px', textAlign:'center', border: '1px solid rgba(245, 158, 11, 0.3)'}}>
               <h3 style={{color:'#94a3b8', fontSize:'0.65rem', textTransform:'uppercase', margin:'0 0 6px 0', fontWeight: 600, letterSpacing: '0.5px'}}>Success Probability</h3>
               <div style={{fontSize:'1.5rem', fontWeight:'bold', color: res.probability > 70 ? '#10b981' : '#f59e0b'}}>
                 {res.probability}%
               </div>
            </div>
         </div>

         {/* 3. FULL SKILL DNA */}
         <h3 style={{borderLeft:'4px solid #4f46e5', paddingLeft:'8px', color:'#f8fafc', marginBottom:'12px', fontWeight: 700, fontSize: '0.95rem'}}>Full SkillDNA Profile</h3>
         
         <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 20px', marginBottom:'18px'}}>
            {res.skillDNA.all.map((skill, i) => (
              <div key={i}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'3px', fontSize:'0.75rem'}}>
                  <span style={{color:'#cbd5e1', fontWeight: 500}}>{skill.name}</span>
                  <span style={{fontWeight:'bold', color: skill.color}}>{Number(skill.visualScore).toFixed(1)}%</span>
                </div>
                <div style={{width:'100%', height:'4px', background:'rgba(255, 255, 255, 0.1)', borderRadius:'3px', overflow: 'hidden'}}>
                  <div style={{width: `${skill.visualScore}%`, height:'100%', background: skill.color, borderRadius:'3px'}}></div>
                </div>
              </div>
            ))}
         </div>

         {/* 4. VERDICT */}
         <div style={{background:`${res.verdict.color}20`, border:`1.5px solid ${res.verdict.color}`, padding:'12px', borderRadius:'6px', marginBottom:'15px'}}>
            <h4 style={{margin:'0 0 6px 0', color: res.verdict.color, textTransform:'uppercase', fontWeight: 700, fontSize: '0.85rem'}}>Mentor Verdict: {res.verdict.status}</h4>
            <p style={{margin:0, color:'#cbd5e1', lineHeight:'1.4', fontWeight: 500, fontSize:'0.8rem'}}>
              {res.verdict.msg} 
              <br/>
              Your primary bottlenecks are: <strong style={{color:'#ef4444', textTransform:'uppercase'}}>{weakestLinkString}</strong>.
            </p>
         </div>

        {/* 5. SHIFT SENSITIVITY (NEW ADDITION) */}
        <div style={{background:'rgba(255, 255, 255, 0.05)', border:'1px dashed rgba(148, 163, 184, 0.4)', padding:'10px', borderRadius:'6px', marginBottom:'auto'}}>
          <h4 style={{margin:'0 0 6px 0', color:'#e2e8f0', fontSize:'0.8rem', fontWeight: 700}}>⚠️ Score Volatility Analysis (Shift Difficulty)</h4>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.75rem', color:'#94a3b8', marginBottom:'6px'}}>
             <span>Hard Shift (Safe Score)</span>
             <span>Easy Shift (Needed Score)</span>
          </div>
          
          <div style={{position:'relative', height:'8px', background:'rgba(0,0,0,0.3)', borderRadius:'4px', marginBottom:'6px', overflow:'hidden'}}>
             <div style={{position:'absolute', left:'0', width:'100%', top:'50%', height:'1px', background:'#475569'}}></div>
             {/* Range Bar */}
             <div style={{position:'absolute', left:'20%', right:'20%', top:'2px', bottom:'2px', background:'rgba(99, 102, 241, 0.4)', borderRadius:'2px'}}></div>
             {/* Markers */}
             <div style={{position:'absolute', left:'20%', top:'1px', bottom:'1px', width:'2px', background:'#f59e0b'}}></div>
             <div style={{position:'absolute', right:'20%', top:'1px', bottom:'1px', width:'2px', background:'#ef4444'}}></div>
          </div>
          
          <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.85rem', fontWeight: 700, color:'#f8fafc'}}>
             <span style={{color:'#f59e0b'}}>{res.minPredicted}</span>
             <span style={{color:'#ef4444'}}>{res.maxPredicted}</span>
          </div>
          <p style={{margin:'6px 0 0 0', fontSize:'0.7rem', color:'#cbd5e1', fontStyle:'italic', lineHeight:'1.3'}}>
             Due to NTA normalization, your predicted capability of <strong>{res.predictedMarks}</strong> translates to a range of <strong>{res.minPredicted}-{res.maxPredicted}</strong>. 
             Depending on the difficulty of the actual exam shift, your score may vary within this range.
          </p>
        </div>

         {/* 6. FOOTER */}
         <div style={{fontSize:'0.6rem', color:'#64748b', borderTop:'1px solid rgba(99, 102, 241, 0.2)', paddingTop:'8px', marginTop:'15px', display:'flex', flexDirection:'column', gap:'4px', fontWeight: 500, lineHeight:'1.3'}}>
            <div>© 2025 Sangillence | A Sangillence Product</div>
            <div>This report is a mathematical projection based on user-submitted data and current JEE trends. It serves as a diagnostic tool to identify preparation gaps and is not a guarantee of future rank or score. Actual results may vary due to external factors, exam difficulty, and changes in student consistency.</div>
         </div>
      </div>
    </>
  );
}