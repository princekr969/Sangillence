import React from 'react';
import { GraduationCap, Building2 } from 'lucide-react';

const FormToggle = ({ activeType, onToggle }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
          activeType === 'student'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onToggle('student')}
      >
        <GraduationCap className="w-5 h-5" />
        <span>Student</span>
      </button>

      <button
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
          activeType === 'school'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onToggle('school')}
      >
        <Building2 className="w-5 h-5" />
        <span>School</span>
      </button>
    </div>
  );
};

export default FormToggle;
