import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollText, ArrowRight, ArrowUp, Award } from 'lucide-react';
import img from "./../../assets/svgs/sangillenceBanner1.svg"
import { Link, useLocation } from 'react-router-dom';

function OlympiadPage() {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

   const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const updateImage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBgImage("https://res.cloudinary.com/dstbd40ud/image/upload/v1753892141/olympiadBanner_rsvmau.png");
      } else {
        setBgImage("https://res.cloudinary.com/dstbd40ud/image/upload/v1753892141/olympiadBanner_rsvmau.png");
      }
    };

    updateImage(); // Set initially
    window.addEventListener("resize", updateImage);
    return () => window.removeEventListener("resize", updateImage);
  }, []);

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
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div 
        className="relative h-[40vh] md:h-[40vh] lg:h-[60vh] bg-cover bg-center flex pb-2 md:pb-7 lg:pb-4 items-end justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
      </div>

      {/* Rules Section */}
      <div className="max-w-4xl mx-auto my-6 px-4 py-12 border-2 shadow-2xl border-slate-800/80 rounded-2xl ">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-family-givonic-bold font-bold text-gray-800">Rules & Regulations</h2>
        </div>
        
        <div className="space-y-2">
          <div className="border-2 border-slate-900/20 rounded-lg p-6">
            <h3 className=" text-xl font-family-givonic-semiBold font-semibold mb-3 text-black">Eligibility</h3>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2 text-black">
              <li>📝 Open to students from <b>Classes 3 to 10</b> across India.</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-slate-900/20 text-black rounded-lg p-6">
            <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 ">Competition Format</h3>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2">
              <li>🧩 10 Skill Competency based questions</li>
              <li>💬 100-word reasoning (should explain their solution)</li>
              <li>🧠 Use of calculators, phones, books allowed</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-slate-900/20 text-black rounded-lg p-6 ">
            <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 ">Duration</h3>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2 ">
              <li>🕒 Students have one full day to solve and submit the answers.</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-slate-900/20 rounded-lg p-6">
            <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-gray-800">Integrity</h3>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2 text-gray-600">
              <li>💡 Fair play. Original thinking. Unique logic.</li>      
              <li>🤖 Plagiarized or AI-only copy-paste answers get rejected. Thinking matters most.</li>      
            </ul> 
          </div>

          <div className="bg-white border-2 border-slate-900/20 rounded-lg p-6 ">
            <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-gray-800">Submission</h3>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2 text-gray-600">
              <li>📥 Answers must be submitted through a Google Form accessible via a QR code in the booklet.</li>        
              <li>🏃 In case of a tie, the student who submits first will rank higher.
              </li>        
            </ul> 
          </div>

          

          <div className="bg-white border-2 border-slate-900/20 rounded-lg p-6">
            <h3 className="text-xl font-family-givonic-semiBold font-semibold mb-3 text-gray-800">Important Dates</h3>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2 text-gray-600">
              <li>📍 Registration Deadline: March 31, 2025</li>
              <li>📍 Preliminary Round: April 15, 2025</li>
              <li>📍 Final Event: June 1-5, 2025</li>
            </ul>
          </div>
        </div>

        
          <div className="flex items-center mt-10 mb-3">
          <h2 className="text-2xl font-family-givonic-bold font-bold text-gray-800">Awards</h2>
          </div>

          <div className='border-2 bg-white border-slate-900/20 rounded-lg p-6'>
            <ul className="list-none list-inside font-family-givonic-regular space-y-2 text-gray-600">
              <li>💵 Cash prize of up to ₹2000.</li>
              <li>📑 Merit certificate.</li>
              <li>🎓 Scholarships.</li>
              <li>📊 <b>Top 100 Performers:</b> Certificates of appreciation. </li>
            </ul>
          </div>

        {/* Apply Section */}
        <div id="apply" className="mt-16 text-center">
          <h2 className="text-3xl font-family-givonic-bold font-bold mb-6 text-gray-800">Ready to Participate?</h2>
          <Link
            to="/olympiadForm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-family-givonic-semiBold font-semibold px-12 py-4 rounded-full inline-flex items-center transition-all text-lg"
          >
            Apply Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>

         {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}   
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      </div>
    </div>
  );
}

export default OlympiadPage;