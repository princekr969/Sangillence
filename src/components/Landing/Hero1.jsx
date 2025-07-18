import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import sangillenceLogo from './../../../assets/sangillenceLogo.png';
import heroSectionBg from '../../../assets/svgs/herosectionbg.svg';
import mainSectionBg from '../../../assets/svgs/heromainsectionbg.svg';

import collegeLogo from "../../../assets/svgs/collegelogo.svg";

export default function Hero1() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative max-md:pb-10 md:h-screen  px-4 sm:px-6 md:px-16">

       <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroSectionBg})` }}
      ></div>

      {/* Transparent Header */}
      <header className="relative font-family-givonic-bold z-10 pt-3">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to={"/"} className='flex items-center space-x-2'>
            <div className="h-16 w-12 lg:w-16 rounded-lg flex items-center justify-center">
                <img src={sangillenceLogo} className="h-full w-full object-contain" />
            </div>
                <span className="text-4xl font-family-givonic-bold tracking-wide bg-gradient-to-r from-slate-900 via-[#203A43] to-[#2C5364] bg-clip-text text-transparent font-bold">Sangillence</span>
            </Link>
           

            {/* Desktop Navigation */}
            <nav className="hidden  md:flex space-x-1 text-gray-700 font-medium">
              <NavLink to="/home" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 transition-colors`}>
                    Home
                </NavLink>
                <NavLink to="/olympiad" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                    Olympiad
                </NavLink>
                <NavLink to="/nep2020" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                    NEP2020
                </NavLink>
                <NavLink to="/contactUs" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                    Contact
                </NavLink>
               
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 z-20 border-t-0 border-2 rounded-b-2xl border-white/80 bg-[#1e3366]/60 backdrop-blur-md shadow-lg">
              <nav className="flex flex-col space-y-1 p-4">
                <a href="/home" className="bg-[#0a2972] text-slate-50 rounded-2xl px-4 py-2 font-medium transition-colors">Home</a>
                <a href="/olympiad" className="text-slate-50 hover:bg-[#0a2972] rounded-2xl px-4 py-2 font-medium transition-colors">Olympiad</a>
                <a href="/nep2020" className="text-slate-50 hover:bg-[#0a2972] rounded-2xl px-4 py-2 font-medium transition-colors">NEP2020</a>
                <a href="/contactUs" className="text-slate-50 hover:bg-[#0a2972] rounded-2xl px-4 py-2 font-medium transition-colors">Contact</a>
                
              </nav>
            </div>
          )}
      
      </header>
        
      {/* Hero Section */}
      <div className='relative z-5 h-[80%] mt-5 shadow-xl bg-[#233562] rounded-3xl'>
          <div
            className="absolute inset-0 opacity-80 animate-fade-in rounded-3xl bg-cover bg-center bg-no-repeat z-1"
            style={{ backgroundImage: `url(${mainSectionBg})` }}
          ></div>

        {/* Animated Background Elements */}
        <div className="absolute z-2 inset-0 opacity-10">
          <div className="absolute animate-float-slow top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-xl"></div>
          <div className="absolute animate-float-medium top-40 right-20 w-24 h-24 bg-purple-400 rounded-full blur-lg"></div>
          <div className="absolute animate-float-fast bottom-20 left-1/3 w-16 h-16 bg-teal-400 rounded-full blur-md"></div>
        </div>

        <main className="relative z-10 pt-4 h-full">
            <div className="h-full flex flex-row max-md:justify-center p-4 sm:p-6 lg:p-10 text-white">
              
              {/* Main Content */}
              <div className="flex flex-col align-items-center justify-center">

                {/* College Logo */}
                <div className='animate-slide-up-1 flex max-lg:justify-center'>
                  <div className='h-16 w-12 lg:w-16 mb-3'>
                      <img src={collegeLogo} className='h-full drop-shadow-[0_0px_16px_rgba(255,255,255)] shadow-white w-ful object-contain' alt="ABV-IIITM logo" />
                  </div>
                </div>
              
                <h1 className="animate-slide-up-1 font-family-givonic-regular max-lg:text-center text-xs md:text-lg text-blue-100 mb-2">
                    An initiative from IIIT Gwalior
                </h1>
                <h2 className="animate-slide-up-2 font-family-givonic-bold max-lg:text-center font-bold text-2xl sm:text-5xl bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                    INDIA'S FIRST AI-POWERED
                </h2>
                <h2 className="animate-slide-up-3 font-family-givonic-black max-lg:text-center text-6xl sm:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    SOBO'25
                </h2>
                <h3 className="animate-slide-up-4 font-family-givonic-regular max-lg:text-center text-md md:text-2xl text-white mb-5 md:mb-8">
                    SANGILLENCE OPEN BOOK OLYMPIAD
                </h3>
                
                <p className="animate-slide-up-5 font-family-givonic-regular max-lg:text-center text-xs md:text-lg text-blue-100 mb-8 md:mb-12">
                    Test Your Skills — Not Just Academics!
                </p>
                <div className='max-lg:text-center'>
                  <Link
                      to='/olympiad'
                      className="inline-block animate-pulse-glow max-w-max max-md:text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  >
                      <span className="flex items-center text-sm md:text-lg gap-2 md:gap-3">
                      REGISTER NOW
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                  </Link>
                </div>
              </div>


          </div>
        </main>   

      </div>
    </div>
  );
}

            // <div className="relative">
            //   <div className="bg-orange-100 h-full w-full rounded-xl p-6">
            //     <img
            //       src="https://images.unsplash.com/photo-1751555005823-8eedda8cbde9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            //       alt="illustration"
            //       className="h-full w-full object-contain"
            //     />
            //   </div>

            //   <div className="absolute top-[-20px] left-[-40px] bg-white rounded-xl shadow-md p-4 w-[240px] text-sm">
            //     <span className="text-orange-500 font-semibold">Ai</span>{" "}
            //     Helping Businesses Unlock Their Potential with AI-Enhanced Marketing That Understands Customers Better.
            //   </div>

            //   <div className="absolute bottom-[-40px] right-[-40px] bg-white rounded-xl shadow-md p-4 w-[260px] text-sm">
            //     <span className="text-orange-500 font-semibold">Ai</span>{" "}
            //     Unleashing the Power of Artificial Intelligence to Drive Smarter Marketing Strategies and Sustainable Growth.
            //   </div>
            // </div>