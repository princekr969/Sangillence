import React from 'react';
import { Brain, BookOpen, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/sangillenceLogo.png'

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-teal-400 rounded-full blur-md animate-pulse"></div>
      </div>

      {/* India Map Watermark */}
      <div className="absolute inset-0 opacity-5 bg-contain bg-center bg-no-repeat" 
           style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjUwIDUwQzMwMCA1MCAzNTAgMTAwIDM1MCAyMDBDMzUwIDMwMCAzMDAgNDAwIDI1MCA0MDBDMjAwIDQwMCAxNTAgMzAwIDE1MCAyMDBDMTUwIDEwMCAyMDAgNTAgMjUwIDUwWiIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg==')"}}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-10 md:left-20 animate-float">
          <Brain className="w-12 h-12 text-blue-400 opacity-70" />
        </div>
        <div className="absolute top-1/3 right-10 md:right-20 animate-float-delayed">
          <BookOpen className="w-10 h-10 text-teal-400 opacity-70" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-float">
          <Target className="w-8 h-8 text-purple-400 opacity-70" />
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-6 leading-tight">
            INDIA'S FIRST AI-POWERED
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            SANGILLENCE OPEN BOOK
          </h2>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-8">
            OLYMPIAD — SOBO 25
          </h3>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Test Your Skills — Not Just Academics!
          </p>

          <button 
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
            onClick={() => navigate('/olympiadForm')}
          >
            <span className="flex items-center gap-3">
              REGISTER NOW
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 