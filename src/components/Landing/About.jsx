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

const solutions = [
    {
      id: 1,
      number: "01",
      description: "The new age education required holistic development of students, knowledge and facts are everywhere, even a small kid can access vast internet."
    },
    {
      id: 2,
      number: "02",
      description: " This Olympiad gives every child a stage to explore, express, and excel with digital tools like calculators, internet access, and open resources — exactly how real-world problem-solving works!"
    },
    {
      id: 3,
      number: "03",
      description: "Their efforts are perfectly analysed by AI and reliable insights, reports will be issued."
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
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 mb-8 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            About SOBO'25
          </h2> 
            <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="flex justify-center items-start gap-2 md:gap-5"
            >
              <span className="text-blue-900 font-family-givonic-bold font-bold text-lg sm:text-3xl">
                {solution.number}
              </span>

              <p className="text-gray-600 font-family-givonic-regular text-start text-sm sm:text-base leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

      </div>
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