import React from 'react';
import { GraduationCap, Building2 } from 'lucide-react';

const FormToggle = ({ activeType, onToggle }) => {
  return (
    <div className="relative mb-8">
      {/* Background with geometric accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-xl">
        {/* Geometric overlays */}
        <div 
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-600/30 to-transparent rounded-l-xl"
          style={{
            clipPath: 'polygon(0 0, 80% 0, 60% 100%, 0 100%)'
          }}
        ></div>
        <div 
          className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/20 to-transparent rounded-r-xl"
          style={{
            clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 20% 100%)'
          }}
        ></div>
      </div>

      <div className="relative z-10 flex rounded-xl overflow-hidden">
        <button
          onClick={() => onToggle('student')}
          className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 relative group ${
            activeType === 'student'
              ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          {activeType === 'student' && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
          )}
          <span className="relative z-10">Student Registration</span>
        </button>
        <button
          onClick={() => onToggle('school')}
          className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 relative group ${
            activeType === 'school'
              ? 'text-white bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg'
              : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          {activeType === 'school' && (
            <div className="absolute inset-0 bg-gradient-to-l from-amber-500/20 to-transparent"></div>
          )}
          <span className="relative z-10">School Registration</span>
        </button>
      </div>

    </div>
  );
};

export default FormToggle;
