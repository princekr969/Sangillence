import { Link } from 'react-router-dom';
import {ArrowRight } from 'lucide-react';

export default function OlympiadHeader() {
  
  return (
    <div className="relative overflow-hidden">
            
        {/* Hero Section background */}
        <div className='relative z-5 md:h-[calc(80vh-76px)] bg-[#233562]'>
         
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
              animationDuration: `${2 + Math.random() * 3}s`
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
        <main className="relative z-10 h-full">
          <div className='max-sm:hidden absolute right-0 bottom-0 animate-slide-up-1'>
                <div className='h-32 w-52 md:h-52 md:w-64 mb-3'>
                    <img src="https://res.cloudinary.com/dstbd40ud/image/upload/v1754641767/olympiadSOBO_imnaym.svg" className='h-full w-full object-contain' alt="ABV-IIITM logo" />
                </div>
              </div>
            <div className="h-full flex justify-center gap-2 p-4 sm:p-6 lg:p-10 text-white">
              
              {/* Main Content */}
              <div className="flex flex-col justify-center">
              <div className='  animate-slide-up-1 flex justify-center'>
                <div className='h-32 w-64 mb-3'>
                    <img src="https://res.cloudinary.com/dstbd40ud/image/upload/v1754641347/sangillence_logo_qhyh1l.svg" className='h-full w-full object-contain' alt="ABV-IIITM logo" />
                </div>
              </div>
              
                <h2 className="animate-slide-up-2 font-family-givonic-bold whitespace-nowrap
                  text-center font-bold text-2xl sm:text-5xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                    INDIA'S FIRST AI-POWERED 
                </h2>
                <h2 className="animate-slide-up-3 font-family-givonic-black text-center text-6xl  md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-1">
                    SOBO'25
                </h2>
                <h3 className="animate-slide-up-4 font-family-givonic-regular text-center text-md md:text-md lg:text-xl text-white mb-5 md:mb-8">
                    SANGILLENCE OPEN BOOK OLYMPIAD
                </h3>
                
                <p className="animate-slide-up-5 font-family-givonic-regular text-center text-xs md:text-lg text-blue-100 mb-8 md:mb-12">
                    "Test Your Skills — Not Just Academics"
                </p>
                <div className='text-center'>
                  <a
                      href='#apply'
                      className="inline-block animate-pulse-glow max-w-max max-md:text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  >
                      <span className="flex items-center text-sm md:text-lg gap-2 md:gap-3">
                          Apply Now
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                  </a>
                </div>
              </div>
          </div>
        </main>   

      </div>
    </div>
  );
}
