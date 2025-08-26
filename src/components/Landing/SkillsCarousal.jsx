import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Brain,
  PenTool,
  Sigma,
  SearchCode,
  Eye,
  FileSearch,
  Landmark,
  Scale,
  Puzzle,
  Sparkles,
} from "lucide-react";

const skills = [
  {
    icon: Brain,
    name: "Memory",
    description: "Ability to retain and recall key information when it matters most.",
  },
  {
    icon: PenTool,
    name: "Creativity",
    description: "Thinking beyond limits to generate fresh and original ideas.",
  },
  {
    icon: Sigma,
    name: "Logical",
    description: "Applying structured reasoning to reach sound conclusions.",
  },
  {
    icon: SearchCode,
    name: "Analytical",
    description: "Breaking down problems to understand patterns and relationships.",
  },
  {
    icon: Eye,
    name: "Observation",
    description: "Noticing details others miss to make smarter decisions.",
  },
  {
    icon: FileSearch,
    name: "Research",
    description: "Finding, filtering, and using relevant information effectively.",
  },
  {
    icon: Landmark,
    name: "Metacognition",
    description: "Understanding how you think and learn to improve performance.",
  },
  {
    icon: Scale,
    name: "Critical Thinking",
    description: "Evaluating ideas objectively to make informed judgments.",
  },
  {
    icon: Puzzle,
    name: "Out-of-the-Box (OOTB)",
    description: "Approaching problems in unconventional, innovative ways.",
  },
  {
    icon: Sparkles,
    name: "Intelligence",
    description: "The balanced use of knowledge, skills, and reasoning to adapt and excel.",
  },
];

const SkillsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skills.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [skills.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skills.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skills.length) % skills.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % skills.length;
      visible.push(skills[index]);
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
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-xl p-6 transition-all duration-500 transform ${
                  index === 1 ? 'scale-105 bg-white shadow-lg' : 'hover:shadow-md'
                }`}
              >
                {/* skills */}
                <div className='flex flex-col justify-center items-center'>
                  <div className="relative group">
                      <div className={`relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:shadow-xl overflow-hidden`}>
                        {/* Geometric hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20  rounded-full"></div>
                        
                        {/* Icon content */}
                        <testimonial.icon className="relative z-10 w-6 h-6 text-white" />
                        
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-500 to-transparent"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-amber-500 to-transparent "></div>
                      </div>
                    </div>
                
                    <h3 className="text-xl font-family-givonic-semiBold font-semibold text-slate-800 my-2 ">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 font-normal text-center">
                      {testimonial.description}
                    </p>
                </div>
                 
            
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2">
            {skills.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-slate-800 to-slate-900 w-8'
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

export default SkillsCarousel;