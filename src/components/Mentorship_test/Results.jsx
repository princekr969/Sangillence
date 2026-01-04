import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { questions } from '../../pages/Mentorship_test/data/questions';
import jsPDF from 'jspdf';
import { calculateAnalysis } from '../../pages/Mentorship_test/data/logic';
import LoadingScreen from './LoadingScreen';


export default function Results({ preData, answers, onNext, onBack, onSubmit }) {
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  const reportRef = useRef(null);

  useEffect(() => {
    const data = calculateAnalysis(preData.current, preData.target, answers, questions, preData);
    setRes(data);
    onSubmit && onSubmit(data);
  }, [preData, answers]);
  


  const handleVideoComplete = () => {
    setIsLoading(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'JEE Predictor Challenge 2026 by Sangillence',
      text: `🔥 *JEE 2026 Audit Report*\n\n📉 Habit Efficiency: ${res.efficiency}%\n\nI just predicted my *JEE 2026 Score* with *Sangillence*! 🚀\n& claimed a chance to *WIN a FREE JEE Mentorship* by participating in *JEE Prediction Challenge 2026*.\n\nCheck your trajectory here:`,
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

        {/* METRICS WITH PERMANENT INFO BOXES */}
        <div className="metrics-with-info">
          
          {/* CARD 1: Habit Efficiency */}
          <div 
            className="info-card habit-card"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
              padding: '16px',
              borderRadius: '12px'
            }}
          >
            <div style={{marginBottom: '12px'}}>
              <div className="card-label" style={{color: '#818cf8', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '4px'}}>HABIT EFFICIENCY</div>
              <div className="metric-large" style={{
                color: '#99f3ff', 
                fontSize: '2.5rem',
                fontWeight: '800',
                textShadow: '0 0 15px rgba(79, 102, 229, 0.4)'
              }}>{res.efficiency}%</div>
            </div>
            
            {/* Always Visible Info Box */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: '#cbd5e1',
              lineHeight: '1.5',
            }}>
              Based on your habits, skill developed and efficiency. Higher values indicate better study habits alignment.
            </div>
          </div>

          {/* CARD 2: Probability */}
          <div 
            className="info-card probability-card"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              transition: 'all 0.35s cubic-bezier(0.4, 0.0, 0.2, 1)',
              padding: '16px',
              borderRadius: '12px'
            }}
          >
            <div style={{marginBottom: '12px'}}>
              <div className="card-label" style={{color: '#6ee7b7', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '4px'}}>SUCCESS RATE</div>
              <div className="metric-large" style={{ 
                color: '#5eead4',
                fontSize: '2.5rem',
                fontWeight: '800',
                textShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
              }}>
                {res.probability}%
              </div>
            </div>

            {/* Always Visible Info Box */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              color: '#cbd5e1',
              lineHeight: '1.5',
            }}>
              Mathematical probability of achieving your target score of {res.targetMarks}+ based on your current trajectory and study patterns.
            </div>
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
          *Enroll with your Predicted JEE Score in the next section and WIN a chance for FREE Mentorship from IIT/NIT/IIIT Experts!
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
              onClick={() => onNext(res)}
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
                Claim Now
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
            <div>© 2026 Sangillence | A Sangillence Product</div>
            <div>This report is a mathematical projection based on user-submitted data and current JEE trends. It serves as a diagnostic tool to identify preparation gaps and is not a guarantee of future rank or score. Actual results may vary due to external factors, exam difficulty, and changes in student consistency.</div>
         </div>
      </div>
    </>
  );
}