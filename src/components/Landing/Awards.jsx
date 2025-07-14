import React from 'react';
import { Trophy, Medal, Star, Gift } from 'lucide-react';

const Awards = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Awards & Recognition
          </h2>
          <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
            ₹25,000
          </div>
          <p className="text-2xl text-slate-700 font-semibold mb-4">Prize Pool</p>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Celebrating excellence across diverse skills and recognizing the multifaceted talents 
            of India's brightest minds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Overall Excellence</h3>
            <p className="text-3xl font-bold text-yellow-600 mb-2">₹10,000</p>
            <p className="text-slate-600">Top performer across all skills</p>
          </div>

          <div className="bg-gradient-to-br from-silver-100 to-gray-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Medal className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Skill Champions</h3>
            <p className="text-3xl font-bold text-gray-600 mb-2">₹8,000</p>
            <p className="text-slate-600">Best in individual skill categories</p>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Star className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Rising Stars</h3>
            <p className="text-3xl font-bold text-orange-600 mb-2">₹5,000</p>
            <p className="text-slate-600">Most improved performance</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Special Recognition</h3>
            <p className="text-3xl font-bold text-purple-600 mb-2">₹2,000</p>
            <p className="text-slate-600">Innovation and creativity awards</p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Recognition Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Digital Certificates</h4>
              <p className="text-slate-600">Verified digital credentials for your achievements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">National Recognition</h4>
              <p className="text-slate-600">Stand out in college applications and job interviews</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Merit Badge</h4>
              <p className="text-slate-600">Special badges for your LinkedIn and social profiles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards; 