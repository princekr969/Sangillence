import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollText, ArrowRight, ArrowUp } from 'lucide-react';
import img from "./../../assets/sangillenceBanner1.svg"
import { Link } from 'react-router-dom';

function OlympiadPage() {

  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div 
        className="relative h-[30vh] md:h-[60vh] bg-cover bg-center flex pb-2 md:pb-7 lg:pb-4 items-end justify-center"
        style={{
          backgroundImage: ` url(${img})`,
        }}
      >
        <div className=" text-white max-md:hidden">
        
          <a 
            href="#apply"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full inline-flex items-center transition-all"
          >
            Register Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Rules Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center mb-8">
          <ScrollText className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Competition Rules</h2>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Eligibility</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Open to students of classes 3rd to 8th.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Competition Format</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>A single question paper for all grades contains 10 intelligence based questions.</li>
              <li>Each question has an integer-type answer worth 7 marks, and a logical explanation (up to 100 words only) worth 3 marks.</li>
              <li>Marks for the explanation depend on the quality of logic, not the length of the response.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Duration</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Students have one full day to solve and submit the answers.</li>
              
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Submission</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Answers must be submitted through a Google Form accessible via a QR code in the booklet.</li>        
              <li>In case of a tie, the student who submits first will rank higher.
              </li>        
            </ul> 
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Integrity</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Students must work independently plagiarism or copying will lead to disqualification.</li>      
            </ul> 
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Important Dates</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Registration Deadline: March 31, 2025</li>
              <li>Preliminary Round: April 15, 2025</li>
              <li>Final Event: June 1-5, 2025</li>
            </ul>
          </div>
        </div>

        {/* Apply Section */}
        <div id="apply" className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Participate?</h2>
          <Link
            to=""
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-full inline-flex items-center transition-all text-lg"
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