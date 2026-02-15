import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MessageCircle, Award, Trophy } from "lucide-react"; // Added MessageCircle

function Announcement() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(true);
  // A state to represent if the current user is registered.
  const [isRegistered, setIsRegistered] = useState(false);

  // Set your target date/time here
  const targetDate = new Date("2025-10-26T21:00:00");

  // --- Constants for WhatsApp and Login ---
  const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VbAfanC23n3f8Zn3eD3O";
  const LOGIN_PATH = "/studentLogin";
  // ----------------------------------------

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsLive(false);
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

  const formatTime = (num) => String(num).padStart(2, "0");

  let buttonText, linkTo, secondaryText, linkIcon;

  if (isLive) {
    buttonText = "Start Now";
    linkTo = LOGIN_PATH;
    secondaryText = "Attempt the exam before the deadline";
    linkIcon = ArrowRight;
  } else if (!isRegistered) {
    buttonText = "Join WhatsApp Channel";
    linkTo = WHATSAPP_LINK;
    secondaryText = "Thank You for participating in SOBO'25";
    linkIcon = MessageCircle;
  } else {
    buttonText = "Get Ready";
    linkTo = LOGIN_PATH;
    secondaryText = "Get ready to access your account";
    linkIcon = ArrowRight;
  }

  const isExternalLink = !isLive && !isRegistered;
  const isDisabled = !isLive && isRegistered;
  const CurrentLinkIcon = linkIcon;


  return (
    <div>
      <div className="relative z-20 bg-slate-900 overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
                style={{
                  clipPath: "polygon(0 0, 70% 0, 30% 100%, 0 100%)",
                }}
              ></div>
              <div
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
                style={{
                  clipPath: "polygon(30% 0, 100% 0, 100% 100%, 70% 100%)",
                }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
                style={{
                  clipPath: "polygon(0 0, 60% 0, 0 80%)",
                }}
              ></div>
              <div
                className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
                style={{
                  clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
            </div>
          </div>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-400/20 via-blue-400/20 to-indigo-400/20 blur-sm"></div>

        {/* Main content */}
        <div className="relative px-6 py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left side - Announcement text (unchanged) */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div
                  className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 border-2 border-white/30 rounded-full animate-spin"
                  style={{ animationDuration: "3s" }}
                ></div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-white text-lg md:text-xl font-bold">
                  {isLive ? "SUBMISSION DEADLINE IN" : "The Exam Has Ended"}
                </h3>
                <p className="text-blue-100 text-sm md:text-base">
                  {/* Using dangerouslySetInnerHTML to render the bold markdown for the WhatsApp CTA */}
                  {isExternalLink ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: secondaryText.replace(
                          /\*\*(.*?)\*\*/g,
                          "<b>$1</b>",
                        ),
                      }}
                    />
                  ) : (
                    secondaryText
                  )}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-3 bg-gradient-to-r from-amber-900/40 via-yellow-900/40 to-amber-900/40 px-5 py-3 rounded-xl border border-amber-500/30 shadow-lg">
              
              <div className="text-left">
                <h4 className="text-amber-100 text-sm md:text-base font-semibold">
                  The result will be announced by <span className="font-bold text-amber-300">15th February 2026 at 4PM IST</span>
                </h4>
               
              </div>
              </div>
            {/* <div className=" flex-shrink-0 flex items-center gap-3 bg-gradient-to-r from-amber-900/40 via-yellow-900/40 to-amber-900/40 rounded-xl border border-amber-500/30 shadow-lg">
  <div className="flex items-center justify-between w-full gap-4">
    
    <button
      onClick={() => window.location.href = '/student-login'}
      className="font-family-givonic-Bold cursor-pointer group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:scale-103 text-white px-5 py-3 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
    >
      Check Result
    </button>
  </div>
</div> */}

            {/* Center - Timer (unchanged) */}
            {/* <div className="flex gap-2 md:gap-3">
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/20">
                <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                  {formatTime(timeLeft.hours)}
                </span>
                <span className="text-xs md:text-sm text-blue-200 mt-1">Hours</span>
              </div>
              
              <div className="flex items-center text-white text-2xl md:text-4xl font-bold">:</div>
              
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/20">
                <span className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span className="text-xs md:text-sm text-blue-200 mt-1">Minutes</span>
              </div>
              
              <div className="flex items-center text-white text-2xl md:text-4xl font-bold">:</div>
              
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 md:px-4 md:py-3 border border-white/20">
                <span className="text-2xl md:text-4xl font-bold text-amber-300 tabular-nums animate-pulse">
                  {formatTime(timeLeft.seconds)}
                </span>
                <span className="text-xs md:text-sm text-blue-200 mt-1">Seconds</span>
              </div>
            </div> */}

            {/* Right side - CTA button - UPDATED HERE */}
            {/* <div className="flex-shrink-0 flex flex-col items-center justify-center">
              {isExternalLink ? (
                
                <>
                  <a
                    href={linkTo}
                    target="_blank"
                    rel="https://www.whatsapp.com/channel/0029VbAfanC23n3f8Zn3eD3O"
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border 
                      bg-green-600/80 hover:bg-green-500/90 text-white border-green-400/40 hover:border-green-300 shadow-lg hover:shadow-xl group
                    `}
                  >
                    <span className="text-base md:text-lg font-bold">
                      {buttonText}
                    </span>
                    <CurrentLinkIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                  </a>
                  <p className="text-xs text-green-300/80 mt-2 text-center max-w-xs">
                    *For Latest Updates & Details.*
                  </p>
                </>
              ) : (
               
                <div className='flex flex-row gap-4'>

                <Link
                  to={linkTo}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                    isLive
                      ? 'bg-green-600/80 hover:bg-green-500/90 text-white border-green-400/40 hover:border-green-300 shadow-lg hover:shadow-xl group'
                      : 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed' // Disabled style
                  }`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  <span className="text-base md:text-lg font-bold">
                    {buttonText}
                  </span>
                  <CurrentLinkIcon className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${isLive ? 'group-hover:translate-x-1' : ''}`} />
                </Link>
                <Link
                  to='/olympiad'
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 border ${
                    isLive
                      ? 'bg-blue-600/10 hover:bg-blue-500/10 text-white border-blue-400/50 hover:border-blue-300 shadow-lg hover:shadow-xl group'
                      : 'bg-white/15 text-white/50 border-white/20 cursor-not-allowed' // Disabled style
                  }`}
                  onClick={(e) => isDisabled && e.preventDefault()}
                >
                  <span className="text-base md:text-lg font-bold flex flex-col items-center">
                    Haven't Registered Yet ?
                    <p className='text-sm text-blue-200/80 ml-1'>Click Here</p>
                  </span>
                </Link>
                </div>
              )}
            </div> */}
          </div>
        </div>

        {/* Results Announcement - NEW SECTION */}
        {/* <div className="relative bg-gradient-to-r from-amber-900/40 via-yellow-900/40 to-amber-900/40 overflow-hidden rounded-xl shadow-lg border border-amber-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-yellow-600/10"></div>
        
        <div className="relative px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-400/40">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-amber-100 text-base md:text-lg font-semibold">
                Results Announcement
              </h4>
              <p className="text-amber-200/80 text-sm">
                Winners will be declared by <span className="font-bold text-amber-300">February 2026</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-lg border border-amber-400/30">
            <span className="text-amber-300 text-sm font-medium">Stay Tuned</span>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl"></div>
      </div> */}

        {/* Floating particles effect (unchanged) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Announcement;
