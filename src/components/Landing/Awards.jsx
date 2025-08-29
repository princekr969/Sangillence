import { useState, useRef, useEffect } from 'react';
import useCountry from '../../hooks/useCountry';
import { Trophy, Medal, Star, Gift, BadgeCheck, LineChart, Users} from 'lucide-react';

const Awards = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(false);
  const sectionRef = useRef(null);
  const sectionCardRef = useRef(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '5px 0px 0px 0px',
      }
    );

    const cardObserver = new IntersectionObserver(
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

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    if (sectionCardRef.current) cardObserver.observe(sectionCardRef.current);

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      if (sectionCardRef.current) cardObserver.unobserve(sectionCardRef.current);
    };
  }, []);

  const { isOman } = useCountry();

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-16 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Awards & Recognition
          </h2>
          {/* Decorative line */}
          <div className={`flex items-center justify-center mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
          </div>
          <div className={`text-6xl font-family-givonic-bold md:text-8xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 transition-all delay-200 duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            {isOman ? '110 OMR' : '₹25,000'}
          </div>
          <p className={`text-2xl text-slate-700 font-family-givonic-semiBold font-semibold mb-4 transition-all duration-1000 delay-400 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>Prize Pool</p>
          <p className={`text-xl text-slate-600 font-family-givonic-regular max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Celebrating excellence across diverse skills and recognizing the multifaceted talents 
            of India's brightest minds.
          </p>
        </div>

        <div ref={sectionCardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-family-givonic-bold">
          <div className={`bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-8 text-center shadow-lg transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-xl font-family-givonic-bold font-bold text-slate-800 mb-2">Overall Excellence</h3>
            
            <p className="font-family-givonic-regular text-slate-600">Awarded to the <strong>Top 3 students</strong> in each pool based on their overall skill performance.</p>
          </div>

          <div className={`bg-gradient-to-br from-silver-100 to-gray-200 rounded-2xl p-8 text-center shadow-lg transition-all delay-100 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Medal className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-family-givonic-bold font-bold text-slate-800 mb-2">Special Mentions</h3>
            <p className="font-family-givonic-regular text-slate-600">Honoring the <strong>best-performing student in each core skill</strong> category within every pool.</p>
          </div>

          <div className={`bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center shadow-lg transition-all delay-200 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Star className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2"> Skilled School Award</h3>

            <p className="font-family-givonic-regular text-slate-600">Presented to the <strong>school with the highest combined performance</strong> across all skill areas.</p>
          </div>

          <div className={`bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 text-center shadow-lg transition-all delay-300 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Special Recognition</h3>
            <p className="font-family-givonic-regular text-slate-600">Recognizing <strong>schools that lead in individual skill categories</strong> within each pool.</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-b-3xl p-8 shadow-lg">
            <p className={`text-2xl text-slate-700 font-family-givonic-semiBold font-semibold mb-4`}>#For Everyone</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="relative group">
                <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02] overflow-hidden">
                  {/* Geometric hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  
                  {/* Icon content */}
                  <BadgeCheck className="relative z-10 w-8 h-8 text-white" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Digital Certificates</h4>
              <p className="text-slate-600">Verified proof of your participation.</p>
            </div>
            <div className="text-center">
              <div className="relative group">
                <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02] overflow-hidden">
                  {/* Geometric hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  
                  {/* Icon content */}
                  <LineChart className="relative z-10 w-8 h-8 text-white" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2"> Skill Reports</h4>
              <p className="text-slate-600">AI-based insights on your core skills.</p>
            </div>
            <div className="text-center">
              <div className="relative group">
                <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02] overflow-hidden">
                  {/* Geometric hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  
                  {/* Icon content */}
                  <Users className="relative z-10 w-8 h-8 text-white" />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-gradient-to-t from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Stakeholder Insights</h4>
              <p className="text-slate-600">Smart suggestions for students, parents & teachers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;