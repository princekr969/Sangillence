import React, { useState, useEffect } from 'react';
import { 
    ChevronLeft,
    ChevronRight,
    Brain, 
    Calculator, 
    Palette, 
    MessageSquare, 
    Lightbulb, 
    Users, 
    Target, 
    Book, 
    Zap, 
    Heart 
} from 'lucide-react';

const skills = [
  { icon: Brain, name: "Critical Thinking", description: "Analyze complex problems systematically" },
  { icon: Calculator, name: "Logical Reasoning", description: "Apply mathematical and logical principles" },
  { icon: Palette, name: "Creativity", description: "Generate innovative solutions and ideas" },
  { icon: MessageSquare, name: "Communication", description: "Express ideas clearly and effectively" },
  { icon: Lightbulb, name: "Problem Solving", description: "Find practical solutions to challenges" },
  { icon: Users, name: "Leadership", description: "Guide teams and inspire collaboration" },
  { icon: Target, name: "Focus & Attention", description: "Maintain concentration on important tasks" },
  { icon: Book, name: "Research Skills", description: "Gather and analyze information efficiently" },
  { icon: Zap, name: "Adaptability", description: "Adjust to new situations and challenges" },
  { icon: Heart, name: "Emotional Intelligence", description: "Understand and manage emotions effectively" }
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
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 flex items-center justify-center shadow-xl`}>
                      <testimonial.icon className="w-6 h-6 text-slate-100" />
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
                    ? 'bg-blue-900 w-8'
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