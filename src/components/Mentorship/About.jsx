import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Brain, Target, Globe, BookOpen, Users, AlertCircle, ArrowRight } from 'lucide-react';

const targetAudience = [
  {
    icon: Globe,
    title: "DASA / NRI / OCI Candidates",
    classes: "bg-gradient-to-br from-blue-200 to-cyan-300 delay-0",
    description: "Studying abroad but preparing for Indian engineering entrance exams"
  },
  {
    icon: BookOpen,
    title: "JEE + Boards Dual Preparation",
    classes: "bg-gradient-to-br from-purple-200 to-pink-300 delay-100",
    description: "Balancing JEE Main/Advanced alongside school board examinations"
  },
  {
    icon: Users,
    title: "Personal Guidance Seekers",
    classes: "bg-gradient-to-br from-green-200 to-teal-300 delay-200",
    description: "Want mentorship beyond standard classroom lectures"
  },
  {
    icon: Brain,
    title: "Decision Clarity Needed",
    classes: "bg-gradient-to-br from-amber-200 to-orange-300 delay-300",
    description: "Need clarity on Indian exam system while studying overseas"
  }
];

const confusionPoints = [
  "What to study vs what to skip",
  "How to balance boards & JEE",
  "How to handle pressure, anxiety & uncertainty",
  "Finding the right study materials",
  "Time management strategies",
  "Understanding JEE patterns and scoring"
];

const MentorshipAudience = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(false);
  const [showConfusion, setShowConfusion] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const confusionRef = useRef(null);
  const Navigate = useNavigate();

  const takeFreeTrial = () => {
    Navigate('/jee-trajectory-predictor');
  };

  const handleApplyNow = () => {
      const coursesSection = document.getElementById('courses-section');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
  };

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowConfusion(true), 500);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '10px 0px 0px 0px',
      }
    );

    if (confusionRef.current) {
      observer.observe(confusionRef.current);
    }

    return () => {
      if (confusionRef.current) {
        observer.unobserve(confusionRef.current);
      }
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-slate-50 to-blue-50 py-16 px-4 sm:px-6 md:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            Is This Mentorship Right for You?
          </h2> 
          
          {/* Decorative line */}
          <div className={`flex items-center justify-center mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
          
          <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            This program is built for students who

          </p>
        </div>

        {/* Audience Cards */}
        <div ref={cardRef} className="font-family-givonic-regular grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {targetAudience.map((value, index) => (
            <div
              key={index}
              className={`${value.classes} text-center rounded-2xl p-6 border-b-4 border border-gray-900 shadow-lg transition-all duration-500 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <value.icon className="h-8 w-8 text-gray-800" />
              </div>
              <h3 className="text-lg text-gray-800 font-bold mb-3">
                {value.title}
              </h3>
              <p className="font-medium text-gray-700 leading-relaxed text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Confusion Section */}
        <div ref={confusionRef} className="mb-12">
          <div className={`mb-3 transition-all duration-1000 ${
            showConfusion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 rounded-xl">
              <AlertCircle className="h-5 w-5 text-orange-500"/>
              <h3 className="text-xl font-bold text-gray-800">
                Feel confused about:
              </h3>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 delay-300 ${
            showConfusion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {confusionPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-xl bg-blue-50 p-4 border border-l-5 border-blue-900 shadow-sm"
              > 
                <div className="flex items-center gap-3">
            
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 md:p-10 border border-blue-200 shadow-lg transition-all duration-1000 delay-500 ${
          showConfusion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>

          <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            If you relate to even 2-3 of the above — this mentorship is for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleApplyNow}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-101 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <CheckCircle className="h-5 w-5" />
              Apply for Mentorship Program
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            
            <button
              onClick={takeFreeTrial}
              className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-101 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <BookOpen className="h-5 w-5" />
              Take Mentorship Assessment Test
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          <p className="text-gray-600 mt-6 text-sm">
            Our assessment helps match you with the perfect mentor based on your unique needs
          </p>
        </div>

      </div>
    </section>
  );
};

export default MentorshipAudience;