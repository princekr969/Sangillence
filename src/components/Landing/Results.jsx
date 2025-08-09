import { useState, useRef, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp} from 'lucide-react';

const Results = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
        const [isCardSectionVisible, setIsCardSectionVisible] = useState(false);
        const sectionRef = useRef(null);
        const sectionCardRef = useRef(null);
      
        useEffect(() => {
          
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsSectionVisible(true);
              }
            },
            {
              threshold: 0.1,
              rootMargin: '5px 0px 0px 0px'
            }
          );
      
          if (sectionRef.current) {
            observer.observe(sectionRef.current);
          }
      
          return () => {
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          };
        }, []);
      
      useEffect(() => {
          const observer = new IntersectionObserver(
              ([entry]) => {
              if (entry.isIntersecting) {
                  setIsCardSectionVisible(true);
              }
              },
              {
              threshold: 0.1,
              rootMargin: '10px 0px 0px 0px',
              }
          );
  
          if (sectionCardRef.current) {
              observer.observe(sectionCardRef.current);
          }
  
          return () => {
              if (sectionCardRef.current) {
              observer.unobserve(sectionCardRef.current);
              }
          };
      }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-t from-blue-100 via-blue-50 to-white py-16 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            AI-Powered Results & Reports
          </h2>
          {/* Decorative line */}
          <div className={`flex items-center justify-center mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>
          <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Experience detailed insights with our advanced AI analysis, featuring comprehensive 
            reports validated through successful pilots at IIIT Gwalior.
          </p>
        </div>

        <div ref={sectionCardRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 delay-0 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Comprehensive Analytics</h3>
              </div>
              <p className="text-slate-600">
                Detailed breakdown of your performance across all measured skills with 
                percentile rankings and improvement suggestions.
              </p>
            </div>

            <div className={`bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 delay-100 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-slate-800">Skill Distribution</h3>
              </div>
              <p className="text-slate-600">
                Visual representation of your strongest and developing areas with 
                personalized learning pathways.
              </p>
            </div>

            <div className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 transition-all delay-200 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
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

          <div className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
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
              <p className="text-sm text-slate-400 mt-2">— Mr. Akshat Dubey, IIIT Gwalior</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
    </section>
  );
};

export default Results; 