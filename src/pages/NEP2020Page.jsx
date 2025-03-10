import React from "react";
import { 
  BookOpen, Brain, Languages, Layout, 
  MessageSquare, MonitorSmartphone, School, Users 
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-indigo-600 mr-3" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);


const NEP2020 = () => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
    {/* Hero Section */}
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Coaching Structure Inspired by NEP2020
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Transforming education through holistic development, interactive pedagogy, and innovative learning approaches.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Education"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        <FeatureCard
          icon={Brain}
          title="Holistic Development"
          description="Smart Saturdays (S²) and Duniya-Gyaan sessions promote critical thinking, problem-solving, and creativity through hands-on activities."
        />
        
        <FeatureCard
          icon={Users}
          title="Interactive Pedagogy"
          description="Interactive teaching methods and Sunday Master Classes by IITians and NITians provide real-world relevance and deeper understanding."
        />
        
        <FeatureCard
          icon={School}
          title="Skill-Based Education"
          description="Build essential skills through Pragati Olympiad, collaborative learning, and group activities to develop analytical and interpersonal abilities."
        />
        
        <FeatureCard
          icon={Layout}
          title="Assessment Reforms"
          description="Comprehensive evaluation through chapter-end tests and monthly progress reports shared with parents."
        />
        
        <FeatureCard
          icon={Languages}
          title="Multilingual Education"
          description="Enhanced language proficiency through additional grammar classes, weekly words, and support for regional languages."
        />
        
        <FeatureCard
          icon={MonitorSmartphone}
          title="Technology Integration"
          description="24/7 support via WhatsApp groups, online master classes, and tech-focused Duniya-Gyaan lectures."
        />
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Program?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Experience education that aligns with NEP2020 guidelines and prepares students for the future.
        </p>
      </div>
    </div>
  </div>
);

export default NEP2020;
