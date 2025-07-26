import { useState, useRef, useEffect } from 'react';
import Report from './Report';
import SkillsCarousel from './SkillsCarousal';


const Skills = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
      const [isCardSectionVisible, setIsCardSectionVisible] = useState(false);
      const sectionRef = useRef(null);
      const sectionCardRef = useRef(null);
    
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
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                setIsCardSectionVisible(true);
            }
            },
            {
            threshold: 0.1,
            rootMargin: '10px 0px 0px 0px',
            }
        );

        if (sectionCardRef.current) {
            observer.observe(sectionCardRef.current);
        }

        return () => {
            if (sectionCardRef.current) {
            observer.unobserve(sectionCardRef.current);
            }
        };
    }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-100 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Skills We Measure
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
          <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Our AI-powered assessment evaluates a comprehensive range of skills that matter 
            in today's dynamic world, going far beyond traditional academic metrics.
          </p>
        </div>

        <SkillsCarousel/>

        {/* Sample Skill Report Visualization */}
        <Report/>
      
      </div>
    </section>
  );
};

export default Skills; 