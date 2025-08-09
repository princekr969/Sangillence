import React, { useState, useEffect, useRef } from 'react';
import { Brain, Target, Lightbulb, Puzzle } from 'lucide-react';

const skills = [
  {
    name: 'Critical Thinking',
    percentage: 85,
    icon: Brain,
  },
  {
    name: 'Logical Reasoning',
    percentage: 88,
    icon: Target,
  },
  {
    name: 'Creativity',
    percentage: 91,
    icon: Lightbulb,
  },
  {
    name: 'Problem Solving',
    percentage: 97,
    icon: Puzzle,
  },
];

const SkillBar = ({ skill, isVisible, delay }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const Icon = skill.icon;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(skill.percentage);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.percentage, delay]);

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-800">{skill.name}</span>
          <span className="text-gray-600 font-semibold">{skill.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 transition-all duration-1500 ease-out`}
            style={{ width: `${animatedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const CircularScore = ({ isVisible }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
     if (isVisible) {
    const interval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev >= 92) {
          clearInterval(interval);
          return 92;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }
  }, [isVisible]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative w-[260px] h-[260px]">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="5"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1500 ease-out"
        />
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" />   
                <stop offset="50%" stopColor="#1e3a8a" />  
                <stop offset="100%" stopColor="#172554" /> 
            </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-blue-600">{animatedScore}</span>
        <span className="text-lg font-semibold text-gray-800 mt-1">Overall Score</span>
        <span className="text-sm text-gray-600 mt-1">Top 5% Nationally</span>
      </div>
    </div>
  );
};

const Report = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  return (
    <div ref={sectionRef} className="max-w-6xl mx-auto p-12 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Sample Skill Assessment Report
      </h1>

      <div className=" flex max-md:flex-col-reverse md:justify-between gap-16 md:gap-32">
        <div className="w-full">
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <CircularScore isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
};

export default Report;
