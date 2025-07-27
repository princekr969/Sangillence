import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Brain, BookOpen, Target, Users, Globe, Star, Zap, Award, TrendingUp, Shield
} from "lucide-react";

const features = [
    {
      icon: <Brain className="text-amber-600" size={32} />,
      title: "AI-Driven Assessments",
      description: "Advanced algorithms that measure thinking, not memorization. Our AI evaluates cognitive processes and understanding rather than rote learning.",
      color: "amber"
    },
    {
      icon: <BookOpen className="text-orange-600" size={32} />,
      title: "Open-Book Learning",
      description: "Revolutionary models that encourage research and real-world problem solving, preparing students for authentic challenges.",
      color: "orange"
    },
    {
      icon: <Target className="text-yellow-600" size={32} />,
      title: "Skill-Based Evaluations",
      description: "Comprehensive assessment identifying strengths in memory, creativity, logic, metacognition, and critical thinking abilities.",
      color: "yellow"
    },
    {
      icon: <Users className="text-amber-700" size={32} />,
      title: "Stakeholder Reports",
      description: "Detailed, actionable insights designed specifically for parents, teachers, and mentors to guide student development.",
      color: "amber"
    },
    {
      icon: <Globe className="text-orange-700" size={32} />,
      title: "Scalable Innovation",
      description: "Commitment to affordable, scalable, and impactful education innovation that reaches students across diverse backgrounds.",
      color: "orange"
    },
    {
      icon: <Award className="text-yellow-700" size={32} />,
      title: "Research-Backed",
      description: "Every methodology is grounded in educational research and proven pedagogical principles for maximum effectiveness.",
      color: "yellow"
    },
    {
      icon: <TrendingUp className="text-amber-500" size={32} />,
      title: "Future-Ready Skills",
      description: "Focus on developing 21st-century competencies that prepare students for tomorrow's challenges and opportunities.",
      color: "amber"
    },
    {
      icon: <Shield className="text-orange-500" size={32} />,
      title: "Holistic Development",
      description: "Comprehensive approach that nurtures cognitive, emotional, and social development for well-rounded growth.",
      color: "orange"
    }
  ];

const AboutBenefitCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [features.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % features.length;
      visible.push(features[index]);
    }
    return visible;
  };

  return (
    <div className=" bg-transparent flex items-center justify-center p-4">
      <div className="bg-transparent p-8 max-w-7xl w-full">
        

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonials().map((feature, index) => (
              <div
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-500 transform ${
                  index === 1 ? 'scale-105 bg-white shadow-lg' : 'hover:shadow-md'
                }`}
              >
                {/* Icon with background */}
                <div className={`w-16 h-16 bg-${feature.color}-50 rounded-full flex items-center justify-center mb-2`}>
                    {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-family-givonic-semiBold font-semibold text-gray-900 mb-4">
                    {feature.title}
                </h3>
                
                <p className="text-gray-600 font-family-givonic-regular leading-relaxed text-sm">
                    {feature.description}
                </p>
              
            </div>
                 
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-amber-700 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBenefitCarousel;