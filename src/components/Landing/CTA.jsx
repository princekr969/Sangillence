import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-400 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-teal-400 rounded-full blur-md animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Be the Future.
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Shape the Future.
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Join thousands of students across India in revolutionizing how we measure and 
          celebrate intelligence. Your journey to discovery starts here.
        </p>

        <div className="space-y-6">
          <button 
            className="group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-5 rounded-full text-xl md:text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            onClick={() => navigate('/olympiadForm')}
          >
            <span className="flex items-center gap-4 justify-center">
              JOIN THE REVOLUTION
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          
          <p className="text-blue-200 text-lg">
            Free registration • No hidden costs • Open to all students
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA; 