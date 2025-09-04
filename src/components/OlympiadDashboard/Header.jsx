import React from 'react';
import {User } from 'lucide-react';
import sangillenceLogo from '../../../assets/sangillenceLogo.png';


const Header = () => {

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          {/* Logo */}
          <div className='flex items-center space-x-2'>
          <div className="h-10 w-10 rounded-lg flex items-center justify-center">
              <img src={sangillenceLogo} className="h-full w-full object-contain" />
          </div>
              <span className="text-2xl font-family-givonic-bold tracking-wide bg-gradient-to-r from-slate-900 via-[#203A43] to-[#2C5364] bg-clip-text text-transparent font-bold">Sangillence</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-gray-100">
            <User size={20} className="text-gray-600" />
          </div>
          <div className='flex flex-col'>
            <span className="text-sm font-medium">Student Name</span>
            <span className="text-sm">Class</span>

          </div>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
