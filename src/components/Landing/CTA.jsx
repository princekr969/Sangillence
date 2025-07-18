import { useState, useEffect, useRef } from 'react';
import { Rocket, ArrowRight } from 'lucide-react';
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
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-t from-blue-100 via-blue-50 to-white py-16 px-4 sm:px-6 md:px-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-400 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-teal-400 rounded-full blur-md animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl font-family-givonic-bold mx-auto px-4 text-center">
        <div className={`mb-8 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
          <Rocket className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
        </div>
        
        <h2 className={`text-4xl md:text-6xl font-bold text-slate-700 mb-6 leading-tight transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
          Be the Future.
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Shape the Future.
          </span>
        </h2>
        
        <p className={`text-xl md:text-2xl font-family-givonic-semiBold text-slate-600 mb-12 max-w-3xl mx-auto transition-all delay-200 duration-1000 ${
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
              className="max-w-fit flex justify-center align-items-center font-family-givonic-semiBold group bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-full text-xl md:text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25"
            
            >
              <span className="flex items-center gap-4 justify-center">
                JOIN THE REVOLUTION
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
          
          <p className="text-slate-700 font-family-givonic-regular  text-lg">
            Free registration • No hidden costs • Open to all students
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA; 