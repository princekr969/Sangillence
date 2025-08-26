import React from 'react';
import sangillenceLogo from '../../../assets/sangillenceLogo.png';
import { ArrowLeft } from 'lucide-react';

export const TestHeader = ({ title, onBack }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4">
      <div className="flex items-center gap-4">
        
          <div className='flex items-center space-x-2'>
          <div className="h-16 w-12 lg:w-10 rounded-lg flex items-center justify-center">
              <img src={sangillenceLogo} className="h-full w-full object-contain" />
          </div>
              <span className="text-3xl font-family-givonic-bold tracking-wide bg-gradient-to-r from-slate-900 via-[#203A43] to-[#2C5364] bg-clip-text text-transparent font-bold">Sangillence</span>
          </div>
      </div>
    </div>
  );
};
