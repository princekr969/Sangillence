import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Loader2, Brain, TimerReset, Target, Bot, BotMessageSquare, Trophy, Boxes, Gauge, Lightbulb } from 'lucide-react';
import LogoGift from '../../assets/SangillenceLogoAnimation.gif';

function GiftAnimation() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={LogoGift}
        alt="Gift Animation"
        loading='lazy'
        width={300}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

function LoadingPage() {

    const [loading, setLoading] = useState(true);
    const [hidden, setHidden] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
    const timer = setTimeout(() => {
        setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
    if (!loading) {
        const cleanup = setTimeout(() => {
        setHidden(true);
        }, 800); 
        return () => clearTimeout(cleanup);
    }
    }, [loading]);
    
    useEffect(() => {
        if (hidden) navigate('/home');
    }, [hidden, navigate]);
    
    
    return !hidden && (
        <div className={` bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center inset-0 justify-center fixed z-50 transition-all duration-1000 ease-in-out ${loading ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
        > 
          {/* Background Animation */}
          <div className="absolute inset-0">
          {/* Floating Mathematical Symbols */}
          <div className="absolute top-10 left-5 md:top-20 md:left-10 text-5xl text-purple-300 animate-bounce opacity-60">π</div>
          <div className="absolute top-30 right-10 md:top-40 md:right-20 text-4xl text-blue-300 animate-bounce opacity-60">∑</div>
          <div className="absolute bottom-30 left-10 md:bottom-40 md:left-20 text-5xl text-cyan-300 animate-bounce opacity-60">∞</div>
          <div className="absolute  right-10 bottom-20 md:right-20 text-4xl text-yellow-300 animate-bounce opacity-60">√</div>
          <div className="absolute top-80 left-15 md:top-60 md:left-1/4 text-5xl text-red-300 animate-bounce opacity-60">×</div>
          <div className="absolute top-90 right-10 md:top-80 md:right-1/3 text-5xl text-green-300 animate-bounce opacity-60">÷</div>
        
          {/* Brain and Learning Icons */}  
          
          <div className="absolute max-md:hidden top-130 right-110 text-red-400 animate-pulse opacity-50">
            <Trophy size={30} />
          </div>
          <div className="absolute max-md:hidden bottom-70 right-60 text-purple-400 animate-pulse opacity-50">
            <BotMessageSquare size={40} />
          </div>
          <div className="absolute max-md:hidden bottom-70 left-70 text-blue-300 animate-pulse opacity-50">
            <Boxes size={35} />   
          </div>
          <div className="absolute max-md:hidden top-30 left-130 text-blue-300 animate-pulse opacity-50">
            <TimerReset size={35} />   
          </div>
          <div className="absolute max-md:hidden top-24 right-40 text-purple-300 animate-pulse opacity-50">
            <Brain size={40} />
          </div>
          <div className="absolute max-md:hidden top-70 left-32 text-cyan-400 animate-pulse opacity-50">
            <Target size={30} />
          </div>
          <div className="absolute max-md:hidden top-1/5 right-1/4 text-yellow-300 animate-pulse opacity-50">
            <Lightbulb size={35} />
          </div>
          <div className="absolute max-md:hidden bottom-1/5 left-1/4 text-green-300 animate-pulse opacity-50">
            <Gauge size={35} />
          </div>
        </div>

          {/* Main Loading Content */}
          <div className="relative z-10 text-center">
            {/* Logo Container */}
            <div className="relative">
              <GiftAnimation/>
            </div>

            {/* Brand Name */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in">
                <span className="bg-gradient-to-r from-red-500 via-cyan-400 to-[#FFB300] bg-clip-text text-transparent animate-gradient">
                  Sangillence
                </span>
              </h1>
              <p className="flex items-center justify-center gap-1 text-lg text-gray-500 animate-fade-in animation-delay-500">
                <Bot size={20}  className="text-blue-500"/>
                AI-Powered Skills Assessment
              </p>
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              <div className="w-2 h-2 rounded-full animate-pulseColor animate-pulseColor-delay-0"></div>
              <div className="w-2 h-2 rounded-full animate-pulseColor animate-pulseColor-delay-1"></div>
              <div className="w-2 h-2 rounded-full animate-pulseColor animate-pulseColor-delay-2"></div>
            </div>

            {/* Status Text */}
            <div className="text-gray-400 text-lg animate-fade-in">
              <Loader2 className="w-5 h-5 inline mr-2 animate-spin" />
              Initializing application...
            </div>
          </div>

        </div>
     
    );
  }



export default LoadingPage;
