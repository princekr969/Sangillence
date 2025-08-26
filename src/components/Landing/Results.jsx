import { useState, useRef, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp} from 'lucide-react';

const testimonials = [
    {
      id: 1,
      name: "Prof. Anurag Srivastava",
      post: "Head of Engineering Science Dept , ABV IIITM Gwalior",
      text: `I've followed Sangillence and its young founders, impressed by their clarity and courage to test ideas in real settings. SOBO'25, India's first AI-powered open-book Olympiad, challenges traditional assessments and promotes skilled learning. It could redefine how we nurture student intelligence. I commend the team's vision and sincerity.`,
      profileImage: "https://res.cloudinary.com/dstbd40ud/image/upload/v1756060274/Screenshot_2025-08-24_235904_s6lavm.png",
    },
    {
      id: 2,
      name: "Dr. Jeevaraj S",
      post: "Assistant Professor Engineering Science Dept, ABV IIITM Gwalior",
      text: "The Sangillence team shows a sincere, deep commitment to transforming education through AI. SOBO'25 reflects their vision—promoting creativity, reasoning, and real-world problem-solving over rote learning. It's a rare, forward-thinking effort with real potential for impact.",
      profileImage: "https://res.cloudinary.com/dstbd40ud/image/upload/v1756060274/Screenshot_2025-08-24_235916_aofpbk.png",
    },
  ];

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
            <div className={` rounded-2xl p-6 bg-blue-50 shadow-xl delay-0 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-slate-800">Comprehensive Analytics</h3>
              </div>
              <p className="text-slate-600">
                Detailed breakdown of your performance across all measured skills with 
                percentile rankings and improvement suggestions.
              </p>
            </div>

            <div className={`bg-green-50 shadow-xl rounded-2xl p-6 delay-100 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-slate-800">Skill Distribution</h3>
              </div>
              <p className="text-slate-600">
                Visual representation of your strongest and developing areas with 
                personalized learning pathways.
              </p>
            </div>

            <div className={`bg-purple-50  shadow-xl rounded-2xl p-6 transition-all delay-200 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-slate-800">Growth Tracking</h3>
              </div>
              <p className="text-slate-600">
                Compare your progress against national averages and track your 
                improvement over time.
              </p>
            </div>
          </div>

          <div className={`relative group h-full flex justify-center items-center bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl rounded-3xl p-8 text-white overflow-hidden delay-0 transition-all duration-1000  ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
                <div className='relative z-10 flex-col justify-center items-center'>
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
                      <div className="text-3xl font-bold text-amber-400 mb-2">AI</div>
                      <div className="text-sm text-slate-300">Powered Analysis</div>
                    </div>
                  </div>

                  <div className="relative">
                    <p className="text-sm italic">
                      "The AI-powered assessment provided insights that traditional exams never could. 
                      Students discovered strengths they didn't know they had."
                    </p>
                    <p className="text-sm mt-2 text-slate-300">— Mr. Akshat Dubey, IIIT Gwalior</p>
                  </div>
                </div>

          </div>
        </div>
      </div>
      <div className={`max-w-7xl mx-auto delay-200 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`relative group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-lg overflow-hidden ${
                isSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              
            >
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Profile Section */}
                <div className="flex items-center mb-6">
                  <div className="relative group">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg">
                      <img 
                        src={testimonial.profileImage} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Profile image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                    <span className="text-sm text-slate-400">{testimonial.post}</span>
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1 relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-4 text-slate-200 shadow-lg">
                  <blockquote className="text-slate-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-80"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-80"></div>
              
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-6xl text-slate-700/20 font-serif leading-none">"</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
    </section>
  );
};

export default Results; 