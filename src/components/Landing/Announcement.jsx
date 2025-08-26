import React from 'react'
import useCountry from '../../hooks/useCountry'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Announcement() {
  const { isOman } = useCountry();
  return (
    <div>
      <div className="relative z-20  bg-slate-900 overflow-hidden rounded-2xl shadow-2xl">
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Left side - Announcement text */}
              <div className="flex items-center gap-3">
                {/* Animated icon */}
                <div className="relative">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
                
                {/* Text content */}
                <div className="text-center md:text-left">
                  <h3 className="font-family-givonic-bold text-white text-lg md:text-xl font-bold">
                    REGISTRATIONS ARE NOW OPEN!
                  </h3>
                  <p className="font-family-givonic-regular text-blue-100 text-sm md:text-base">
                    Join SOBO'25 - India's First AI-Powered Olympiad
                  </p>
                  <p className="font-family-givonic-bold text-amber-300 text-sm md:text-base font-semibold mt-1">
                    {isOman ? '✨ 2 OMR ONLY ✨' : '✨ NO REGISTRATION FEE ✨'}
                  </p>
                </div>
              </div>
              
              {/* Right side - CTA button */}
              <div className="flex-shrink-0">
                <Link
                  to="/olympiad"
                  className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3  rounded-xl font-family-givonic-semiBold font-semibold transition-all duration-200 hover:shadow-lg border border-white/30 hover:border-white/50"
                >
                  <span className="text-base md:text-lg font-bold">Register Now</span>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
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
    </div>)
}

export default Announcement
