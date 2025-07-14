import React from 'react';
import { Brain, Users, Trophy, Lightbulb, Zap } from 'lucide-react';

const coreValues = [
  {
    icon: Brain,
    title: "AI-Powered Assessment",
    description: "Advanced AI evaluates your problem-solving abilities beyond traditional testing"
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Open-book format encourages research, analysis, and innovative thinking"
  },
  {
    icon: Trophy,
    title: "Merit Recognition",
    description: "Celebrating diverse talents and skills that matter in the real world"
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Emphasizing creativity, critical thinking, and practical application"
  },
  {
    icon: Zap,
    title: "Future Ready",
    description: "Preparing students for tomorrow's challenges with today's insights"
  }
];

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            About SOBO 25
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Experience the revolutionary open-book examination format powered by cutting-edge AI technology. 
            SOBO 25 evaluates your comprehensive skills, creativity, and problem-solving abilities rather than 
            just memorization, preparing you for real-world challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
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