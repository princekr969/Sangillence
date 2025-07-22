import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import useModelViewer from '../../hooks/useModelViewer.jsx'
import sangillenceLogo from './../../../assets/sangillenceLogo.png';
import heroSectionBg from '../../../assets/svgs/herosectionbg.svg';
import mainSectionBg from '../../../assets/svgs/heromainsectionbg.svg';
import collegeLogo from "../../../assets/svgs/collegelogo.svg";
import soboWalk from "../../../assets/3dModels/SOBOwalk.glb"
import soboWalk2 from "../../../assets/3dModels/SOBO2walk.glb"
import soboMat from "../../../assets/3dModels/SOBOmat.glb"
import soboStart from "../../../assets/3dModels/SOBOstart.glb"
import soboRun from "../../../assets/3dModels/SOBOrun.glb"

const ModelViewer = useModelViewer(soboMat)

export default function Hero() {

  return (
    <div className="relative max-md:pb-10 md:h-screen  px-4 sm:px-6 md:px-16">

      <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url(${heroSectionBg})` }}></div>
            
      {/* Hero Section background */}
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

        <main className="relative z-10 h-full">
            <div className="h-full flex justify-center md:justify-between gap-2 p-4 sm:p-6 lg:p-10 text-white">
              
              {/* left side */}
              {/* Main Content */}
              <div className="flex flex-col justify-center">

                {/* College Logo */}
                <div className='animate-slide-up-1 flex justify-center md:justify-start'>
                  <div className='h-16 w-12 lg:w-16 mb-3'>
                      <img src={collegeLogo} className='h-full drop-shadow-[0_0px_16px_rgba(255,255,255)] shadow-white w-ful object-contain' alt="ABV-IIITM logo" />
                  </div>
                </div>
              
                <h1 className="animate-slide-up-1 font-family-givonic-regular text-xs text-center md:text-start md:text-lg text-blue-100 mb-2">
                    An initiative from IIIT Gwalior
                </h1>
                <h2 className="animate-slide-up-2 font-family-givonic-bold whitespace-nowrap
                  text-center md:text-start font-bold text-2xl sm:text-5xl md:text-3xl lg:text-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight">
                    INDIA'S FIRST AI-POWERED 
                </h2>
                <h2 className="animate-slide-up-3 font-family-givonic-black text-center md:text-start text-6xl  md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    SOBO'25
                </h2>
                <h3 className="animate-slide-up-4 font-family-givonic-regular text-center md:text-start text-md md:text-md lg:text-xl text-white mb-5 md:mb-8">
                    SANGILLENCE OPEN BOOK OLYMPIAD
                </h3>
                
                <p className="animate-slide-up-5 font-family-givonic-regular text-center md:text-start text-xs md:text-lg text-blue-100 mb-8 md:mb-12">
                    "Test Your Skills — Not Just Academics"
                </p>
                <div className='text-center md:text-start'>
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

              {/* right side */}
              <div className="w-full hidden overflow-hidden md:flex items-center lg:items-end justify-end">
                <div className='md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] flex items-center justify-start drop-shadow-[0_0px_16px_rgba(255,255,255)'>
                  <ModelViewer />
                </div>
              </div>

          </div>
        </main>   

      </div>
    </div>
  );
}
