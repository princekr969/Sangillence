import React from 'react';
import { Star, Target, Brain, Users, Lightbulb, Zap } from 'lucide-react';

function AboutMainSection() {
  return (
    <section className="relative bg-white overflow-hidden py-16 px-4 sm:px-6 md:px-16">
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
                  <Brain className="mx-auto mb-4 text-blue-300" size={40} />
                  <h3 className="text-xl font-bold mb-2">Today.</h3>
                  <h3 className="text-xl font-bold mb-2">Tomorrow.</h3>
                  <h3 className="text-xl font-bold text-blue-300">Together.</h3>
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
                    <Zap className="mx-auto mb-2 text-amber-300" size={32} />
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
                  <Users className="text-blue-600 mr-2" size={20} />
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
                  <Target className="text-purple-600 mr-2" size={20} />
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
                  <Lightbulb className="text-green-600 mr-2" size={20} />
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
  )
}

export default AboutMainSection
