import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

function ScrollToTop() {
 const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed z-50 bottom-8 right-8 text-white rounded-full shadow-2xl transition-all transform hover:scale-110 backdrop-blur-sm border border-white/10 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}   
          aria-label="Scroll to top"
        >
          <div className="relative group">
                      <div className={`relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:shadow-xl overflow-hidden`}>
                        {/* Geometric hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20  rounded-full"></div>
                        
                        {/* Icon content */}
                       <ArrowUp className="relative z-10 w-6 h-6 text-white" />

                        {/* Decorative elements */}
                      </div>
                    </div>
         
        </button>
    </div>
  )
}

export default ScrollToTop
