import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useModelViewer from '../../hooks/useModelViewer.jsx'
import useCountry from '../../hooks/useCountry.js'
import heroSectionBg from '../../../assets/svgs/herosectionbg.svg';
import soboRun from "../../../assets/3dModels/SOBOrun.glb"
import Announcement from './Announcement.jsx';

const ModelViewer = useModelViewer(soboRun)

export default function Hero() {
  const { isOman } = useCountry();

  return (
    <div className="relative overflow-hidden max-md:pb-10 md:min-h-[500px] lg:min-h-[calc(100vh-76px)] px-4 sm:px-6 md:px-16">
      
      {/* Registration Announcement Strip */}
      <div className="relative z-20 mb-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 rounded-2xl shadow-2xl">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-400/20 via-blue-400/20 to-indigo-400/20 blur-sm"></div>
          
          
          <Announcement/>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: `url(${heroSectionBg})` }}></div>
            
        {/* Hero Section background */}
        <div className='relative z-5 h-[80%] mt-5 shadow-xl bg-[#233562] rounded-3xl'>
         
 <div className="absolute inset-0 rounded-3xl">

          {/* Base dark background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>
          
          {/* Geometric overlays */}
          <div className="absolute inset-0 rounded-3xl">
            {/* Large angular shapes */}
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl">
              {/* Blue angular shape - top left */}
              <div 
                className="absolute rounded-3xl top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)'
                }}
              ></div>
              
              {/* Orange/amber angular shape - top right */}
              <div 
                className="absolute rounded-3xl top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
                style={{
                  clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 70% 100%)'
                }}
              ></div>
              
              {/* Teal angular shape - bottom left */}
              <div 
                className="absolute rounded-3xl bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 60% 0, 0 80%)'
                }}
              ></div>
              
              {/* Purple angular shape - bottom right */}
              <div 
                className="absolute rounded-3xl bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
                style={{
                  clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
                }}
              ></div>
            </div>
            
            {/* Additional layered geometric elements */}
            <div className="absolute inset-0">
              <div 
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rotate-45 blur-sm"
              ></div>
              <div 
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 -rotate-12 blur-sm"
              ></div>
            </div>
          </div>
          
          {/* Subtle grid overlay */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          ></div>

          {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-2 h-16 bg-gradient-to-t from-blue-500 to-transparent"></div>
      <div className="absolute bottom-10 right-10 w-2 h-16 bg-gradient-to-t from-amber-500 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
        </div>

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
                {/* <div className='text-center md:text-start'>
                  <Link
                      to='/olympiad'
                      className="inline-block animate-pulse-glow max-w-max max-md:text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                  >
                      <span className="flex items-center text-sm md:text-lg gap-2 md:gap-3">
                        REGISTER NOW
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                  </Link>
                </div> */}
              </div>

              {/* right side */}
              <div className="w-full hidden overflow-hidden md:flex items-center lg:items-end justify-end">
                <div className='md:w-[350px] md:h-[350px] lg:w-[500px] lg:h-[500px] flex items-center justify-start drop-shadow-[0_0px_16px_rgba(255,255,255)'>
                  <ModelViewer/>
                </div>
              </div>

          </div>
        </main>   

      </div>
    </div>
  );
}
