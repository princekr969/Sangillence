import React, { useEffect, useRef, useState } from 'react';
import { Brain, Users, Trophy, Lightbulb, Zap } from 'lucide-react';

const coreValues = [
  {
    icon: Brain,
    title: "AI-Powered Assessment",
    classes:"bg-blue-100 delay-0",
    description: "Advanced AI evaluates your problem-solving abilities beyond traditional testing"
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    classes:"bg-teal-100 delay-100",
    description: "Open-book format encourages research, analysis, and innovative thinking"
  },
  {
    icon: Trophy,
    title: "Merit Recognition",
    classes:"bg-purple-100 delay-200",
    description: "Celebrating diverse talents and skills that matter in the real world"
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    classes:"bg-yellow-100 delay-300 ",
    description: "Emphasizing creativity, critical thinking, and practical application"
  },
  {
    icon: Zap,
    title: "Future Ready",
    classes:"bg-green-100 delay-400 ",
    description: "Preparing students for tomorrow's challenges with today's insights"
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
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 mb-6 ${
            isSectionVisible 
              ? 'animate-slide-up-1':''}`}>
            About SOBO'25
          </h2> 
          <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto  ${
            isSectionVisible ? 'animate-slide-up-2' : ''}`}>
            It is a one-of-a-kind competition designed to test student's essential 21st century skills, a completely Open-Book,  & evaluate and elevated by cutting edge AI technology.
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
              <div className=" rounded-2xl flex items-center justify-center mb-4">
                <value.icon className="h-12 w-12 text-black" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed">
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