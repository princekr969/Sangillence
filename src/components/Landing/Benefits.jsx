import React from 'react';
import { DollarSign, Award, TrendingUp, Users, Clock, Star } from 'lucide-react';

const benefits = [
  {
    icon: DollarSign,
    title: "Zero Registration Fee",
    description: "Completely free participation for all eligible students"
  },
  {
    icon: Award,
    title: "Skill Certification",
    description: "Get certified for your unique talents and abilities"
  },
  {
    icon: TrendingUp,
    title: "Career Insights",
    description: "Discover your strengths and potential career paths"
  },
  {
    icon: Users,
    title: "National Recognition",
    description: "Stand out among peers across the country"
  },
  {
    icon: Clock,
    title: "Flexible Format",
    description: "Open-book examination at your own pace"
  },
  {
    icon: Star,
    title: "AI-Powered Reports",
    description: "Detailed analysis of your performance and potential"
  }
];

const Benefits = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Why Join the Future of Learning?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            SOBO 25 offers unprecedented opportunities to showcase your true potential 
            and gain insights that traditional assessments simply cannot provide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
            MORE DETAILS
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits; 