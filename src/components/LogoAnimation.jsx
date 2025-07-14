import React, { useState, useEffect } from 'react';
import {Loader2, Brain, Lightbulb, Star, Target, Puzzle } from 'lucide-react';
import LogoGift from '../../assets/SangillenceLogoAnimation.gif';

function GiftAnimation() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={LogoGift}
        alt="Gift Animation"
        loading='lazy'
        width={300}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

function LogoAnimation({loading}) {
    
    return (
      <div className={` bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50  w-screen h-screen flex items-center inset-0 justify-center fixed z-50 transition-all duration-1000 ease-in-out ${loading ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
      > 
        {/* Background Animation */}
         <div className="absolute inset-0">
        {/* Floating Mathematical Symbols */}
        <div className="absolute top-20 left-10 text-5xl text-purple-300 animate-bounce opacity-60">π</div>
        <div className="absolute top-40 right-20 text-4xl text-blue-300 animate-bounce opacity-60">∑</div>
        <div className="absolute bottom-40 left-20 text-5xl text-cyan-300 animate-bounce opacity-60">∞</div>
        <div className="absolute bottom-20 right-10 text-4xl text-yellow-300 animate-bounce opacity-60">√</div>
        <div className="absolute top-60 left-1/4 text-5xl text-red-300 animate-bounce opacity-60">×</div>
        <div className="absolute top-80 right-1/3 text-5xl text-green-300 animate-bounce opacity-60">÷</div>
        
        {/* Floating Geometric Shapes */}   
        <div className="absolute top-32 right-40 w-4 h-4 bg-purple-400 rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-32 left-40 w-6 h-6 bg-blue-400 rounded-full animate-float-delayed opacity-70"></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-60 right-60 w-5 h-5 bg-yellow-400 rounded-full animate-float-delayed opacity-70"></div>
        <div className="absolute top-80 right-80 w-4 h-4 bg-red-400 rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-80 left-80 w-3 h-3 bg-green-400 rounded-full animate-float-delayed opacity-70"></div>
        
        {/* Brain and Learning Icons */}
        <div className="absolute top-24 right-32 text-purple-300 animate-pulse opacity-50">
          <Brain size={50} />
        </div>
        <div className="absolute bottom-24 left-32 text-blue-300 animate-pulse opacity-50">
          <Target size={30} />
        </div>
        <div className="absolute top-1/3 right-1/4 text-cyan-300 animate-pulse opacity-50">
          <Puzzle size={25} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-yellow-300 animate-pulse opacity-50">
          <Star size={25} />
        </div>
      </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center">
          {/* Logo Container */}
          <div className="relative">
            <GiftAnimation/>
          </div>

          {/* Brand Name */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in">
              <span className="bg-gradient-to-r from-red-500 via-cyan-400 to-[#FFB300] bg-clip-text text-transparent animate-gradient">
                Sangillence
              </span>
            </h1>
            <p className="text-xl text-gray-400 animate-fade-in animation-delay-500">
              Loading amazing experiences
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-500"></div>
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce animation-delay-600"></div>
          </div>

          {/* Status Text */}
          <div className="text-gray-400 text-lg animate-fade-in">
            <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
            Initializing application...
          </div>
        </div>

      </div>
    );
  }



export default LogoAnimation;
