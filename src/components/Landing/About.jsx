import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Handshake, BrainCircuit, BookOpenText, BadgeCheck } from 'lucide-react';

const coreValues = [
  {
    icon: BrainCircuit,
    title: "AI-Powered",
    classes:"	bg-gradient-to-br from-cyan-200 to-blue-300 delay-0",
    description: "An advanced AI evaluates your core abilities beyond traditional testing methods."
  },
  {
    icon: BookOpenText,
    title: "Open-Book",
    classes:"	bg-gradient-to-br from-orange-200 to-yellow-200 delay-100",
    description: "Encourages research, innovative thinking, and real-world problem-solving aptitude."
  },
  {
    icon: BadgeCheck,
    title: "Skill-First Approach",
    classes:"bg-gradient-to-br from-rose-200 to-red-300 delay-200",
    description: "Focuses not on academics, but on the essential skills that drive academic and lifelong success."
  },
  {
    icon: Rocket,
    title: "Future-Ready",
    classes:"bg-gradient-to-br from-yellow-200 to-amber-300 delay-300 ",
    description: "Equips students for tomorrow’s challenges through insights gained today."
  },
  {
    icon: Handshake,
    title: "Nurturing Ecosystem",
    classes:"bg-gradient-to-br from-teal-200 to-emerald-300 delay-400 ",
    description: "Engaging educators, parents, and mentors to support a student’s all-round growth."
  }
];


const About = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(false);
  const aboutRef = useRef(null);
  const aboutCardRef = useRef(null);

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
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

    if (aboutCardRef.current) {
      observer.observe(aboutCardRef.current);
    }

    return () => {
      if (aboutCardRef.current) {
        observer.unobserve(aboutCardRef.current);
      }
    };
  }, []);

  return (
    <section ref={aboutRef} className="bg-slate-100 py-16 px-4 sm:px-6 md:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            About SOBO'25
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
              It is a one-of-a-kind competition designed to test student's essential 21st century skills, a completely <strong>Open-Book</strong> ,  & evaluate and elevated by cutting edge AI technology. 

            </p>
        </div>

        <div ref={aboutCardRef} className="font-family-givonic-regular grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className={`${value.classes} text-center rounded-2xl p-6 shadow-lg border border-blue-100 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="rounded-2xl text-gray-800 flex items-center justify-center mb-4">
                <value.icon className="h-12 w-12" />
              </div>
              <h3 className="text-lg text-gray-800 font-bold mb-3">
                {value.title}
              </h3>
              <p className="font-medium text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 