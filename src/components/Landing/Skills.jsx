import React from 'react';
import { 
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

const Skills = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Skills We Measure
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI-powered assessment evaluates a comprehensive range of skills that matter 
            in today's dynamic world, going far beyond traditional academic metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-200"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {skill.name}
              </h3>
              <p className="text-sm text-slate-600">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sample Skill Report Visualization */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            Sample Skill Assessment Report
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {skills.slice(0, 5).map((skill, index) => (
                <div key={index} className="flex items-center gap-4">
                  <skill.icon className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{85 + index * 3}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${85 + index * 3}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">92</div>
                  <div className="text-lg font-semibold text-slate-700">Overall Score</div>
                  <div className="text-sm text-slate-500">Top 5% Nationally</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 