import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

function Announcement() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  // Set your target date/time here
  const targetDate = new Date('2025-10-26T09:00:00'); // Example: Oct 26, 2025, 09:00 AM

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsLive(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div>
      <div className="relative z-20 bg-slate-900 overflow-hidden rounded-2xl shadow-2xl">
        {/* Background with geometric shapes */}
        <div className="absolute inset-0">
          {/* Base dark background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>
          
          {/* Geometric overlays */}
          <div className="absolute inset-0">
            {/* Large angular shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Blue angular shape - top left */}
              <div 
                className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)'
                }}
              ></div>
              
              {/* Orange/amber angular shape - top right */}
              <div 
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
                style={{
                  clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 70% 100%)'
                }}
              ></div>
              
              {/* Teal angular shape - bottom left */}
              <div 
                className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 60% 0, 0 80%)'
                }}
              ></div>
              
              {/* Purple angular shape - bottom right */}
              <div 
                className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
                style={{
                  clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
                }}
              ></div>
            </div>
            
            {/* Additional layered geometric elements */}
            <div className="absolute inset-0">
              <div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rotate-45 blur-sm"
              ></div>
              <div 
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 -rotate-12 blur-sm"
              ></div>
            </div>
          </div>
          
          {/* Subtle grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-400/20 via-blue-400/20 to-indigo-400/20 blur-sm"></div>
        
        {/* Main content */}
        <div className="relative px-6 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left side - Announcement text */}
            <div className="flex items-center gap-3">
              {/* Animated icon */}
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              </div>
              
              {/* Text content */}
              <div className="text-center md:text-left">
                <h3 className="text-white text-lg md:text-xl font-bold">
                  {isLive ? 'START YOUR EXAM NOW!' : 'EXAM STARTS IN'}
                </h3>
                <p className="text-blue-100 text-sm md:text-base">
                  {isLive ? 'Access is now open' : 'Get ready to access your account'}
                </p>
              </div>
            </div>
            
            {/* Center - Timer */}
            <div className="flex gap-2 md:gap-3">
              {/* Hours */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/20">
                <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                  {formatTime(timeLeft.hours)}
                </span>
                <span className="text-xs md:text-sm text-blue-200 mt-1">Hours</span>
              </div>
              
              <div className="flex items-center text-white text-2xl md:text-4xl font-bold">:</div>
              
              {/* Minutes */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/20">
                <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span className="text-xs md:text-sm text-blue-200 mt-1">Minutes</span>
              </div>
              
              <div className="flex items-center text-white text-2xl md:text-4xl font-bold">:</div>
              
              {/* Seconds */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/20">
                <span className="text-2xl md:text-4xl font-bold text-amber-300 tabular-nums animate-pulse">
                  {formatTime(timeLeft.seconds)}
                </span>
                <span className="text-xs md:text-sm text-blue-200 mt-1">Seconds</span>
              </div>
            </div>
            
            {/* Right side - CTA button */}
            <div className="flex-shrink-0">
              <Link
                to="/studentLogin"
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                  isLive
                    ? 'bg-blue-100/40 hover:bg-blue-900/20 text-white border-blue-400/40 hover:border-blue-300 shadow-lg hover:shadow-xl'
                    : 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed'
                }`}
                onClick={(e) => !isLive && e.preventDefault()}
              >
                <span className="text-base md:text-lg font-bold">
                  {isLive ? 'Login Now' : 'Coming Soon'}
                </span>
                <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${isLive ? 'group-hover:translate-x-1' : ''}`} />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcement;