import React, {useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, TimerIcon, User2, X, Target, Users, BookOpen } from "lucide-react";

export default function Hero() {
  const Navigate = useNavigate();

  const takeFreeTrial = () => {
    Navigate('/jee-trajectory-predictor');
  };

  const handleApplyNow = () => {
      const coursesSection = document.getElementById('courses-section');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] cursor-default">
      <div className="relative overflow-hidden">
        {/* Hero Section background */}
        <div className="relative z-5 md:h-[calc(100vh-76px)] bg-[#233562]">
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
                    clipPath: "polygon(0 0, 70% 0, 30% 100%, 0 100%)",
                  }}
                ></div>

                {/* Orange/amber angular shape - top right */}
                <div
                  className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
                  style={{
                    clipPath: "polygon(30% 0, 100% 0, 100% 100%, 70% 100%)",
                  }}
                ></div>

                {/* Teal angular shape - bottom left */}
                <div
                  className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
                  style={{
                    clipPath: "polygon(0 0, 60% 0, 0 80%)",
                  }}
                ></div>

                {/* Purple angular shape - bottom right */}
                <div
                  className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
                  style={{
                    clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                ></div>
              </div>

              {/* Additional layered geometric elements */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rotate-45 blur-sm"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 -rotate-12 blur-sm"></div>
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
                backgroundSize: "50px 50px",
              }}
            ></div>

            {/* Decorative elements */}
            <div className="absolute bottom-10 left-10 w-2 h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
            <div className="absolute bottom-10 right-10 w-2 h-16 bg-gradient-to-t from-amber-500 to-transparent"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
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

          {/* Animated Background Elements */}
          <div className="absolute z-2 inset-0 opacity-10">
            <div className="absolute animate-float-slow top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
            <div className="absolute animate-float-medium top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-lg"></div>
            <div className="absolute animate-float-fast bottom-20 left-1/3 w-16 h-16 bg-teal-400 rounded-full blur-md"></div>
          </div>

          <main className="relative z-10 h-full flex items-center justify-center">
            {/* Updated Header Content with Hero text */}
            <div className="h-full flex items-center p-4 sm:p-6 lg:p-10 text-white">
              <div className="flex flex-col items-center justify-center">
                {/* Hero badge */}
                <div className="animate-slide-up-2 inline-block mb-6 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 max-w-max">
                  JEE'26 Candidates
                </div>

                {/* Main Heading - Hero content */}
                <h1 className="animate-slide-up-3 font-family-givonic-bold text-center font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
                  Crack JEE with Clarity, Confidence &
                  <span className="block text-orange-400">the Right Mentor</span>
                  <span className="block text-3xl sm:text-4xl">Even from Abroad</span>
                </h1>

                {/* Description */}
                <h3 className="animate-slide-up-4 text-center font-family-givonic-regular text-lg md:text-xl text-white mb-8 max-w-2xl">
                  A personalized JEE mentorship program combining academic strategy, mental conditioning,
                  subject mastery & decision clarity — guided by IIT / NIT / IIIT mentors.
                </h3>

                {/* CTA Buttons */}
                <div className="animate-slide-up-5 flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={handleApplyNow}
                    className="group px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-101 text-white rounded-2xl transition-all duration-300 font-bold text-lg shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Apply for Mentorship
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={takeFreeTrial}
                    className="group px-4 py-3 hover:scale-101 hover:bg-gray-100/10 backdrop-blur-sm text-white rounded-2xl border-2 border-white/30 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Book a Free Strategy Call
                  </button>
                </div>

                {/* Feature Points */}
                <div className="animate-slide-up-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                  <div className="flex items-center justify-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <Target className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm">Designed for International Students</span>
                  </div>
                  <div className="flex items-center justify-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <Users className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm">1:1 Mentor + Subject Experts</span>
                  </div>
                  <div className="flex items-center justify-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <BookOpen className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-sm">Methodology, Not Rote Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
