import React from 'react';
import { BarChart3, PieChart, TrendingUp, Award } from 'lucide-react';

const Results = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            AI-Powered Results & Reports
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience detailed insights with our advanced AI analysis, featuring comprehensive 
            reports validated through successful pilots at IIIT Gwalior.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Comprehensive Analytics</h3>
              </div>
              <p className="text-slate-600">
                Detailed breakdown of your performance across all measured skills with 
                percentile rankings and improvement suggestions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-slate-800">Skill Distribution</h3>
              </div>
              <p className="text-slate-600">
                Visual representation of your strongest and developing areas with 
                personalized learning pathways.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-slate-800">Growth Tracking</h3>
              </div>
              <p className="text-slate-600">
                Compare your progress against national averages and track your 
                improvement over time.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">IIIT Gwalior Pilot Results</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-sm text-slate-300">Students Assessed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                <div className="text-sm text-slate-300">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">10</div>
                <div className="text-sm text-slate-300">Skills Measured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">AI</div>
                <div className="text-sm text-slate-300">Powered Analysis</div>
              </div>
            </div>

            <div className="bg-slate-700 rounded-2xl p-4">
              <p className="text-sm text-slate-300 italic">
                "The AI-powered assessment provided insights that traditional exams never could. 
                Students discovered strengths they didn't know they had."
              </p>
              <p className="text-sm text-slate-400 mt-2">— Dr. Rajesh Kumar, IIIT Gwalior</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results; 