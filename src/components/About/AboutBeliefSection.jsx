import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Brain, Lightbulb, Target, Zap, Users } from 'lucide-react';

function AboutBeliefSection() {
  return (
     <section className="relative py-16 px-4 sm:px-6 md:px-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        
        {/* Large angular shapes */}
        <div className="absolute inset-0">
          {/* Blue angular shape - top left */}
          <div 
            className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-500/15 to-transparent"
            style={{
              clipPath: 'polygon(0 0, 80% 0, 40% 100%, 0 100%)'
            }}
          ></div>
          
          {/* Purple angular shape - bottom right */}
          <div 
            className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-purple-500/15 to-transparent"
            style={{
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 60% 100%)'
            }}
          ></div>
          
          {/* Amber accent shape - top right */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-400/10 to-transparent"
            style={{
              clipPath: 'polygon(40% 0, 100% 0, 100% 60%)'
            }}
          ></div>
          
          {/* Teal accent shape - bottom left */}
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-400/10 to-transparent"
            style={{
              clipPath: 'polygon(0 40%, 60% 0, 0 100%)'
            }}
          ></div>
        </div>
        
        {/* Additional layered elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        

        {/* Main Content */}
        <div className="text-center">
          {/* Belief Statement */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-100 mb-6 leading-relaxed">
              Our Belief
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <p className="text-3xl lg:text-4xl font-bold leading-tight mb-8">
                At Sangillence, we don't just 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300"> test</span> — 
                we <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300">empower minds</span> to 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300"> unfold their potential</span>.
              </p>
            </div>
          </div>


          {/* Brand Statement */}
          <div className="mb-16">
            <h3 className="text-2xl lg:text-4xl font-bold text-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200">
                Sangillence:
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">
                Unfolding Potential
              </span>
            </h3>
          </div>

          {/* Call to Action */}
          <div className="max-w-3xl mx-auto">
            
            <Link to="/olympiad" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
              Join Our Mission
            </Link>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-2 h-20 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
      <div className="absolute top-8 right-8 w-2 h-20 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
      <div className="absolute bottom-8 left-8 w-2 h-20 bg-gradient-to-t from-teal-400 to-transparent rounded-full"></div>
      <div className="absolute bottom-8 right-8 w-2 h-20 bg-gradient-to-t from-amber-400 to-transparent rounded-full"></div>
    </section>
  )
}

export default AboutBeliefSection
