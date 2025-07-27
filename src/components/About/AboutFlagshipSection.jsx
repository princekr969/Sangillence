import React from 'react';
import { Trophy, BookOpen, Brain, Star, Target, Zap, Users, Award, ArrowRight, Calendar, Map } from 'lucide-react';

function AboutFlagshipSection() {
  return (
     <section className="py-16 px-4 sm:px-6 md:px-16 bg-gradient-to-t from-blue-100 via-blue-50 to-white relative overflow-hidden">

      {/* Background geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl lg:text-5xl font-family-givonic-bold font-bold text-gray-900 mb-4">
            Our Flagship Projects
          </h2>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
          
          <p className="text-lg text-gray-600 font-family-givonic-regular max-w-3xl mx-auto">
            Pioneering the future of education through groundbreaking initiatives that redefine how students learn, think, and grow.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12 ">
          
          {/* SOBO'25 Project */}
          <div className="group relative">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
              
              {/* Geometric background elements */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent"
                  style={{
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 60% 100%)'
                  }}
                ></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-3xl font-family-givonic-bold font-bold mb-2">SOBO'25</h3>
                  <p className="text-blue-100 text-lg font-family-givonic-semiBold font-medium">Sangillence Open Book Olympiad</p>
                </div>

                {/* Description */}
                <p className="text-white/90 font-family-givonic-regular leading-relaxed mb-8 text-lg">
                  India’s first AI-powered, open-book Olympiad designed to test real skills over rote learning.
                A unique opportunity for students to engage in deep thinking, research, and problem-solving using real-world tools — "Test Your Skills, Not Academics".
                </p>

              </div>
            </div>
          </div>

          {/* SIS Project */}
          <div className="group relative">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800 rounded-2xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
              
              {/* Geometric background elements */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-400/20 to-transparent"
                  style={{
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 60% 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-500/20 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0 100%)'
                  }}
                ></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">

                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-3xl font-family-givonic-bold font-bold mb-2">SIS</h3>
                  <p className="text-purple-100 text-lg font-family-givonic-semiBold font-medium">Sangillence Insight System</p>
                </div>

                {/* Description */}
                <p className="text-white/90 font-family-givonic-regular leading-relaxed mb-8 text-lg">
                  An AI-based, month-long cognitive and personality mapping system that uncovers hidden skills through interactive tasks, activities, and gamified psychological inputs — "helping every student understand how they think, not just what they know".
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
    </section>
  )
}

export default AboutFlagshipSection
