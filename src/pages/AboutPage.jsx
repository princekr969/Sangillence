import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {ChevronLeft, ChevronRight, Brain, BookOpen, Target, Users, Globe, Star, Zap, Award, TrendingUp, Shield } from 'lucide-react';

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

function AboutPage() {
  return (
    <div className='cursor-default'>
      
     <div className="relative h-[15vh] md:h-[20vh] bg-slate-900 overflow-hidden">
      {/* Background with geometric shapes */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>
        
        {/* Geometric overlays */}
        <div className="absolute inset-0">
          {/* Large angular shapes */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Blue angular shape - top left */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
              style={{
                clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)'
              }}
            ></div>
            
            {/* Orange/amber angular shape - top right */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
              style={{
                clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 70% 100%)'
              }}
            ></div>
            
            {/* Teal angular shape - bottom left */}
            <div 
              className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
              style={{
                clipPath: 'polygon(0 0, 60% 0, 0 80%)'
              }}
            ></div>
            
            {/* Purple angular shape - bottom right */}
            <div 
              className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
              style={{
                clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
              }}
            ></div>
          </div>
          
          {/* Additional layered geometric elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rotate-45 blur-sm"
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 -rotate-12 blur-sm"
            ></div>
          </div>
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center h-full px-6 lg:px-8">
        {/* Main heading */}
        <h1 className="text-3xl font-family-givonic-bold lg:text-5xl font-bold text-white tracking-wider text-center">
          ABOUT
        </h1>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-4 left-4 w-1 h-8 bg-gradient-to-t from-blue-500 to-transparent"></div>
      <div className="absolute bottom-4 right-4 w-1 h-8 bg-gradient-to-t from-amber-500 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
      <section className="relative bg-gradient-to-t from-blue-100 via-blue-50 to-white overflow-hidden py-16 px-4 sm:px-6 md:px-16">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Images Grid */}
          <div className="relative max-lg:hidden ">
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src="https://res.cloudinary.com/dstbd40ud/image/upload/v1753539378/WhatsApp_Image_2025-07-26_at_19.36.51_cc82c711_jlnrdn.jpg" 
                  alt="Students learning with technology"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Top Right - Central Dark Box */}
              <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg overflow-hidden">
                {/* Geometric background elements */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"
                    style={{
                      clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)'
                    }}
                  ></div>
                  <div 
                    className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-purple-600/20 to-transparent"
                    style={{
                      clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'
                    }}
                  ></div>
                </div>
                
                <div className="relative z-10 text-center h-full flex flex-col justify-center"> 
                  <p className="text-sm text-gray-200">Today. <br />Tomorrow. <br />Together</p>
                </div>
              </div>

              {/* Bottom Left - Continue the central box */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden lg:col-span-1">
                {/* Geometric elements */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-500/15 to-transparent"
                    style={{
                      clipPath: 'polygon(40% 0, 100% 0, 100% 100%)'
                    }}
                  ></div>
                </div>
                
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-sm text-gray-200">AI-Powered Learning</p>
                  </div>
                </div>
              </div>

              {/* Bottom Right Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg group">
                <img 
                  src="https://res.cloudinary.com/dstbd40ud/image/upload/v1753539378/WhatsApp_Image_2025-07-26_at_19.36.46_6f7d6779_hj1d21.jpg" 
                  alt="Collaborative learning environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
                <h3 className="text-xl sm:text-2xl lg:text-4xl font-family-givonic-bold font-bold">
                    <span className="text-gray-900">Sangillence: </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                    Unfolding Potential
                    </span>
                </h3>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {/* Who We Are */}
              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold text-gray-900">Who We Are</h3>
                </div>
                <p className="text-gray-600 font-family-givonic-regular leading-relaxed">
                  Sangillence is a research-backed education-tech initiative dedicated to reshaping how young minds learn, think, and grow. 
                  Rooted in the belief that <span className="font-semibold text-blue-600">"Sangat से Intelligence है"</span>, we support students 
                  in their formative years through an ecosystem that fosters holistic development, skill-based learning, and brain-powered 
                  exploration through cutting-edge technologies.
                </p>
              </div>

              {/* Our Vision */}
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center mb-3">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 font-family-givonic-regular leading-relaxed">
                  To become a leading force in holistic and skill-centric education, empowering students to unlock their true cognitive 
                  potential and thrive in an ever-evolving world.
                </p>
              </div>

              {/* Our Mission */}
              <div className="border-l-4 border-green-500 pl-6">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold text-gray-900">Our Mission</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                      <Zap className="text-green-600" size={12} />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      <span className="font-family-givonic-regular text-gray-800">To build a nurturing, AI-powered learning environment for students aged 6–14.</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                      <Zap className="text-green-600" size={12} />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      <span className="font-family-givonic-regular text-gray-800">To develop tools that identify and enhance core cognitive skills beyond traditional academics.</span>
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1 flex-shrink-0">
                      <Zap className="text-green-600" size={12} />
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      <span className="font-family-givonic-regular text-gray-800">To support parents, educators, and schools with meaningful insights that drive student growth.</span>
                    </p>
                  </div>
                </div>
              </div>
         
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
    </section>
    
    <section className="bg-slate-100 py-16 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          
          <h2 className="text-4xl lg:text-5xl font-family-givonic-bold font-bold text-gray-900 mb-2">
            Why Choose Sangillence
          </h2>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
          </div>
          
          <p className="text-lg text-gray-600 font-family-givonic-regular max-w-3xl mx-auto">
            Discover what sets our AI-powered education technology apart and why educators, 
            parents, and students trust Sangillence for transformative learning experiences.
          </p>
        </div>

      </div>
        <AboutBenefitCarousel/>
    </section>
    <section className="py-16 px-4 sm:px-6 md:px-16 bg-gradient-to-t from-blue-100 via-blue-50 to-white relative overflow-hidden">

      {/* Background geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl lg:text-5xl font-family-givonic-bold font-bold text-gray-900 mb-4">
            Our Flagship Projects
          </h2>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
          
          <p className="text-lg text-gray-600 font-family-givonic-regular max-w-3xl mx-auto">
            Pioneering the future of education through groundbreaking initiatives that redefine how students learn, think, and grow.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-12 ">
          
          {/* SOBO'25 Project */}
          <div className="group relative">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
              
              {/* Geometric background elements */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-purple-500/20 to-transparent"
                  style={{
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 60% 100%)'
                  }}
                ></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-3xl font-family-givonic-bold font-bold mb-2">SOBO'25</h3>
                  <p className="text-blue-100 text-lg font-family-givonic-semiBold font-medium">Sangillence Open Book Olympiad</p>
                </div>

                {/* Description */}
                <p className="text-white/90 font-family-givonic-regular leading-relaxed mb-8 text-lg">
                  India’s first AI-powered, open-book Olympiad designed to test real skills over rote learning.
                A unique opportunity for students to engage in deep thinking, research, and problem-solving using real-world tools — "Test Your Skills, Not Academics".
                </p>

              </div>
            </div>
          </div>

          {/* SIS Project */}
          <div className="group relative">
            {/* Main Card */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800 rounded-2xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
              
              {/* Geometric background elements */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-pink-400/20 to-transparent"
                  style={{
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 60% 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-500/20 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 70% 0, 40% 100%, 0 100%)'
                  }}
                ></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">

                {/* Title */}
                <div className="mb-6">
                  <h3 className="text-3xl font-family-givonic-bold font-bold mb-2">SIS</h3>
                  <p className="text-purple-100 text-lg font-family-givonic-semiBold font-medium">Sangillence Insight System</p>
                </div>

                {/* Description */}
                <p className="text-white/90 font-family-givonic-regular leading-relaxed mb-8 text-lg">
                  An AI-based, month-long cognitive and personality mapping system that uncovers hidden skills through interactive tasks, activities, and gamified psychological inputs — "helping every student understand how they think, not just what they know".
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
    </section>
      <section className="relative py-16 px-4 sm:px-6 md:px-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      
      {/* Background geometric elements */}
      <div className="absolute inset-0">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        
        {/* Large angular shapes */}
        <div className="absolute inset-0">
          {/* Blue angular shape - top left */}
          <div 
            className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-blue-500/15 to-transparent"
            style={{
              clipPath: 'polygon(0 0, 80% 0, 40% 100%, 0 100%)'
            }}
          ></div>
          
          {/* Purple angular shape - bottom right */}
          <div 
            className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-purple-500/15 to-transparent"
            style={{
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 60% 100%)'
            }}
          ></div>
          
          {/* Amber accent shape - top right */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-400/10 to-transparent"
            style={{
              clipPath: 'polygon(40% 0, 100% 0, 100% 60%)'
            }}
          ></div>
          
          {/* Teal accent shape - bottom left */}
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-400/10 to-transparent"
            style={{
              clipPath: 'polygon(0 40%, 60% 0, 0 100%)'
            }}
          ></div>
        </div>
        
        {/* Additional layered elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        

        {/* Main Content */}
        <div className="text-center">
          {/* Belief Statement */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-100 mb-6 leading-relaxed">
              Our Belief
            </h2>
            
            <div className="max-w-5xl mx-auto">
              <p className="text-3xl lg:text-4xl font-family-givonic-bold font-bold leading-tight mb-8">
                At Sangillence, we don't just 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300"> test</span> — 
                we <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300">empower minds</span> to 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300"> unfold their potential</span>.
              </p>
            </div>
          </div>


          {/* Brand Statement */}
          <div className="mb-16">
            <h3 className="text-2xl lg:text-4xl font-family-givonic-bold font-bold text-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200">
                Sangillence:
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300">
                Unfolding Potential
              </span>
            </h3>
          </div>

          {/* Call to Action */}
          <div className="max-w-3xl mx-auto">
            
            <Link to="/olympiad" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-lg font-family-givonic-semiBold font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1">
              Join Our Mission
            </Link>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-2 h-20 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
      <div className="absolute top-8 right-8 w-2 h-20 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
      <div className="absolute bottom-8 left-8 w-2 h-20 bg-gradient-to-t from-teal-400 to-transparent rounded-full"></div>
      <div className="absolute bottom-8 right-8 w-2 h-20 bg-gradient-to-t from-amber-400 to-transparent rounded-full"></div>
    </section>
    </div>
  )
}

export default AboutPage
