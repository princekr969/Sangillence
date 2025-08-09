import { useState, useEffect, useRef } from 'react';
import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const sectionRef = useRef(null);
  
    useEffect(() => {
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '5px 0px 0px 0px'
        }
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, []);


  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 px-4 sm:px-6 md:px-16">
      
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        
        {/* Large angular shapes */}
        <div className="absolute inset-0">
          {/* Blue angular shape - top left */}
          <div 
            className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-500/15 to-transparent"
            style={{
              clipPath: 'polygon(0 0, 80% 0, 40% 100%, 0 100%)'
            }}
          ></div>
          
          {/* Purple angular shape - bottom right */}
          <div 
            className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-purple-500/15 to-transparent"
            style={{
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 60% 100%)'
            }}
          ></div>
          
          {/* Amber accent shape - top right */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-400/10 to-transparent"
            style={{
              clipPath: 'polygon(40% 0, 100% 0, 100% 60%)'
            }}
          ></div>
          
          {/* Teal accent shape - bottom left */}
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-400/10 to-transparent"
            style={{
              clipPath: 'polygon(0 40%, 60% 0, 0 100%)'
            }}
          ></div>
        </div>
        
        {/* Additional layered elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl font-family-givonic-bold mx-auto px-4 text-center">
        <div className={`mb-8 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
          <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
        </div>
        
        <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
          Be the Future.
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Shape the Future.
          </span>
        </h2>
        
        <p className={`text-xl md:text-2xl font-family-givonic-semiBold text-white mb-12 max-w-3xl mx-auto transition-all delay-200 duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
          Join thousands of students across India in revolutionizing how we measure and 
          celebrate intelligence. Your journey to discovery starts here.
        </p>

        <div className={`space-y-6 transition-all delay-500 duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
          <div className='flex justify-center'>
            <Link 
              to='/olympiad'
              className="max-w-fit flex justify-center items-center font-family-givonic-semiBold group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-full text-xl md:text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            
            >
              <span className="flex items-center gap-4 justify-center">
                JOIN THE REVOLUTION
              </span>
            </Link>
          </div>
          
          <p className="text-white font-family-givonic-regular  text-lg">
            Free registration • No hidden costs • Open to all students
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-2 h-20 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
      <div className="absolute top-8 right-8 w-2 h-20 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
      <div className="absolute bottom-8 left-8 w-2 h-20 bg-gradient-to-t from-teal-400 to-transparent rounded-full"></div>
      <div className="absolute bottom-8 right-8 w-2 h-20 bg-gradient-to-t from-amber-400 to-transparent rounded-full"></div>
    </section>
  );
};

export default CTA; 