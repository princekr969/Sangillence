import React from 'react'
import { Brain, BookOpen, Target, Users, Globe, Star, Zap, Award, TrendingUp, Shield } from 'lucide-react';
import AboutBenefitCarousel from './AboutBenefitTestimonial';


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

  const partners = [
    { name: "Education Alliance", logo: "EA" },
    { name: "Tech Innovation Hub", logo: "TIH" },
    { name: "Research Institute", logo: "RI" },
    { name: "Academic Partners", logo: "AP" }
  ];

function AboutBenefitSection() {
  return (

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
  )
}

export default AboutBenefitSection
