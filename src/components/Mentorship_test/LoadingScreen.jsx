import React, { useEffect, useRef, useState } from 'react';

// Static messages
const messages = [
  { text: "Analyzing Data Points...", sub: "Calibrating trajectory based on inputs." },
  { text: "Hard work ≠ Success.", sub: "Hard work in the Right Direction = Success." },
  { text: "The Math is deterministic..", sub: "But humans dare to change their destiny." },
  { text: "Your current trajectory  ", sub: "cannot measure your willpower... " },
  { text: "A low probability is not a verdict...", sub: "It is a challenge to prove the math wrong.." }
];

export default function LoadingScreen({ onComplete }) {
  const videoRef = useRef(null);
  const [textStep, setTextStep] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [progress, setProgress] = useState(0);

  // 1. Text & Progress Timer
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextStep((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 3500); 

    const progressInterval = setInterval(() => {
      setProgress(old => {
        if (old >= 100) return 100;
        const jump = Math.random() > 0.8 ? Math.random() * 5 : Math.random() * 1; 
        return Math.min(100, old + jump);
      });
    }, 150);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  // 2. Video Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Loop the first 2 seconds exactly 6 times
      if (video.currentTime >= 2.0) {
        if (loopCount < 6) {
          video.currentTime = 0;
          setLoopCount(prev => prev + 1);
          video.play().catch(() => {}); 
        } else {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.onended = onComplete;

    return () => {
        if(video) {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.onended = null;
        }
    };
  }, [loopCount, onComplete]);

  return (
    <div className="loading-screen-container">
      
      {/* DARK BACKGROUND (same as quiz/prequiz) */}
      <div className="loading-bg-overlay"></div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="loading-content-wrapper">
        
        {/* VIDEO + RIPPLES ASSEMBLY */}
        <div className="video-ripple-assembly">
          
          {/* Expanding Ripple Rings (5 rings with decreasing opacity & increasing size) */}
          <div className="ripple-ring ripple-1"></div>
          <div className="ripple-ring ripple-2"></div>
          <div className="ripple-ring ripple-3"></div>
          <div className="ripple-ring ripple-4"></div>
          <div className="ripple-ring ripple-5"></div>

          {/* Video Gem (1/8th of screen) */}
          <div className="video-gem-container">
            <video 
              ref={videoRef}
              src="https://res.cloudinary.com/dstbd40ud/video/upload/v1766406639/grok-video-7fc19cb4-c49f-4cfc-9c58-4d8733bafc6c_1_idcwff.mp4"
              autoPlay 
              muted 
              playsInline
              className="gem-video"
            />
          </div>

        </div>

        {/* TEXT & PROGRESS SECTION */}
        <div className="loading-text-section">
          
          {/* Progress Bar */}
          <div className="loading-progress-track">
            <div className="loading-progress-bar" style={{width: `${progress}%`}}></div>
          </div>
          
          {/* Quote Text with Fade Animation */}
          <h2 className="loading-quote-main" key={textStep}>
            {messages[textStep].text}
          </h2>
          <p className="loading-quote-sub" key={textStep + 'sub'}>
            {messages[textStep].sub}
          </p>

        </div>

      </div>

    </div>
  );
}