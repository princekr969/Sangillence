import React from 'react';
import useCountry from '../hooks/useCountry';
import { useState, useEffect } from 'react';
import { ScrollText, ArrowRight, ArrowUp, Award } from 'lucide-react';
import {ScrollToTop} from '../components';
import { Link, useLocation } from 'react-router-dom';
import OlympiadHeader from '../components/Olympiad/OlympiadHeader';

function OlympiadPage() {
  const { isOman } = useCountry();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen ">

      
      <div className='overflow-hidden'>
        <OlympiadHeader/>
      </div>
      
      {/* Rules Section with geometric theme */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Main container with geometric background */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Geometric background for rules section */}
          <div className="absolute inset-0 rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-indigo-900/95 backdrop-blur-sm"></div>
            
          </div>

          <div className="relative z-10 p-8 border border-white/10 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-family-givonic-bold font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rules & Regulations
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur opacity-0 "></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-white">Eligibility</h3>
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>📝 Open to students from <b className="text-white font-family-givonic-bold">Classes 3 to 10</b> across India.</li>
                    <div className='ml-6 space-y-1'>

                      <li>Pool A : classes 3-5</li>
                      <li>Pool B : classes 6-8</li>
                      <li>Pool C : classes 9-10</li>
                    </div>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur opacity-0"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-white">Competition Format</h3>
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>🧩 <span className="text-white">10 Skill Competency</span> based questions</li>
                    <li>💬 
                      <span className="text-white"><b className="font-family-givonic-bold">Only Integer type answers allowed</b>
                        <p className='ml-6'>Each integer answer is followed by a 100 word explanation.</p>
                      </span>
                    </li>
                    <li>🧠 Use of <span className="text-white">calculators, phones, books</span> allowed</li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-green-600/20 rounded-xl blur opacity-0"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-white">Duration</h3>
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>🕒 Students have <span className="text-white">12 hrs</span> to solve and submit the answers.</li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur opacity-0"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-white">Integrity</h3>
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>💡 <span className="text-white">Fair play. Original thinking. Unique logic.</span></li>      
                    <li>🤖 <span className="text-white">Plagiarized or AI-only</span> copy-paste answers get rejected. <span className="text-white">Thinking matters most.</span></li>      
                  </ul> 
                </div>
              </div>

              <div className="relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 rounded-xl blur opacity-0"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-white">Submission</h3>
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>📥 Test will be conducted on the official website sangillence.com only.</li>        
                    <li>🏃 In case of a tie, the student who <span className="text-white">submits first</span> will rank higher.</li>        
                  </ul> 
                </div>
              </div>

              <div className="relative ">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-red-600/20 rounded-xl blur opacity-0 "></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-white">Important Dates</h3>
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>📍 <span className="text-white">Registration Start:</span> August 21, 2025</li>
                    <li>📍 <span className="text-white">Registration Deadline:</span> October 10, 2025</li>
                    <li>📍 <span className="text-white">Final Event:</span> October 26, 2025</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Awards Section */}
            <div className="mt-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-family-givonic-bold font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Awards
                </h2>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl blur opacity-0"></div>
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ">
                  <ul className="list-none font-family-givonic-regular space-y-2 text-blue-100">
                    <li>💵 Prize pool of  <span className="text-white font-family-givonic-semiBold font-semibold">{isOman ? '110 OMR' : '₹25,000'}</span>.</li>
                    <li>📑 <span className="text-white">Merit certificate</span>.</li>
                    <li>📊 <b className="text-white font-family-givonic-bold">Top 100 Performers:</b > Certificates of appreciation.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Apply Section */}
            <div id="apply" className="mt-16 text-center">
              <h2 className="text-3xl font-family-givonic-bold font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Ready to Participate?
              </h2>
              <Link
                to="/olympiadForm"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-family-givonic-semiBold font-semibold px-12 py-4 rounded-full transition-all text-lg shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transform duration-300"
              >
                <span className="flex items-center gap-3">
                  Apply Now
                  <ArrowRight className="w-6 h-6" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </div>
  );
}

export default OlympiadPage;

