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
          className={`fixed z-50 bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-2xl transition-all transform hover:scale-110 backdrop-blur-sm border border-white/10 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}   
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
    </div>
  )
}

export default ScrollToTop
