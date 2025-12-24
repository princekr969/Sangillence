import React, { useState } from 'react';
import { Target, Zap, TrendingUp, BarChart3 } from 'lucide-react';

export default function PreQuiz1({ onStart }) {
  const [d, setD] = useState({ 
    current: '', 
    target: '',
    theory: 50,  // Default 50%
    practice: 50 // Default 50%
  });

  const validateAndStart = () => {
    if (!d.current || !d.target) {
      alert("Please enter both your current and target scores.");
      return;
    }
    if (Number(d.target) > 300) return alert("Maximum JEE score is 300.");
    if (Number(d.current) >= Number(d.target)) return alert("Target score should be higher than current score.");
    onStart(d);
  };

  // Helper to create the dynamic gradient background for sliders
  const getSliderStyle = (value) => {
    const percentage = Math.min(value, 100) + '%';
    return {
      background: `linear-gradient(90deg, #3b82f6 0%, #10b981 ${percentage}, rgba(226, 232, 240, 0.3) ${percentage}, rgba(226, 232, 240, 0.3) 100%)`
    };
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="relative z-10 px-2 sm:px-4 w-full max-w-2xl">
        <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-slate-200/50 overflow-hidden">
          {/* Header with geometric background */}
          <div className="relative p-4 sm:p-6 md:p-8">
            {/* Background with geometric accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-lg sm:rounded-xl">
              {/* Geometric overlays */}
              <div
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-600/30 to-transparent rounded-l-lg sm:rounded-l-xl"
                style={{
                  clipPath: "polygon(0 0, 80% 0, 60% 100%, 0 100%)",
                }}
              ></div>
              <div
                className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/20 to-transparent rounded-r-lg sm:rounded-r-xl"
                style={{
                  clipPath: "polygon(40% 0, 100% 0, 100% 100%, 20% 100%)",
                }}
              ></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3">
                <img 
                    src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
                    alt="Sangillence" 
                    style={{height: '60px', marginBottom: '10px', filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.5))'}} 
                />
                <div className=''>
                    <h1 className="font-bold text-white text-2xl sm:text-3xl">
                    JEE'26 Trajectory Predictor
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base ">
                        An AI powered psychometric test to predict your projected JEE score and study efficiency.
                    </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-2 left-8 w-1 h-6 bg-gradient-to-t from-blue-500 to-transparent"></div>
            <div className="absolute bottom-2 right-8 w-1 h-6 bg-gradient-to-t from-amber-500 to-transparent"></div>
          </div>

          {/* Form Body */}
          <div className="p-4 sm:p-6 md:p-8 bg-white">
            <div className="space-y-6">
              {/* Score Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Average Mock Score <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    value={d.current} 
                    onChange={(e) => setD({...d, current: e.target.value})} 
                    placeholder="e.g. 80"
                    className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    autoFocus 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Dream Target Score <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    value={d.target} 
                    onChange={(e) => setD({...d, target: e.target.value})} 
                    placeholder="out of 300"
                    className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* SLIDER 1: Theoretical Coverage */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Theory Completed %
                    </label>
                  </div>
                  <span className="text-green-600 font-bold text-lg">{d.theory}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={d.theory} 
                  onChange={(e) => setD({...d, theory: Number(e.target.value)})}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  style={getSliderStyle(d.theory)}
                  
                />
                <p className="text-xs text-slate-500 mt-2">
                  % of chapters where you have watched lectures / read notes.
                </p>
              </div>

              {/* SLIDER 2: Practical Coverage */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Practice Done %
                    </label>
                  </div>
                  <span className="text-green-600 font-bold text-lg">{d.practice}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={d.practice} 
                  onChange={(e) => setD({...d, practice: Number(e.target.value)})}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  style={getSliderStyle(d.practice)}
                />
                <p className="text-xs text-slate-500 mt-2">
                  % of chapters where you have solved 25+ PYQs.
                </p>
              </div>
            </div>

            {/* Analyze Button */}
            <div className="mt-8 group">
              <button 
                type="button" 
                className="relative w-full py-4 px-6 font-semibold rounded-lg shadow-lg transition-all duration-300 transform overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-xl"
                onClick={validateAndStart}
              >
                {/* Geometric hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Button content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Analyze Trajectory
                </span>

                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Note */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                This AI-powered analysis will provide personalized insights for your JEE preparation journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}