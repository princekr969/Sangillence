import { useState, useRef, useEffect } from 'react';
import { Trophy, Medal, Star, Gift } from 'lucide-react';

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

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-16 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Awards & Recognition
          </h2>
          <div className={`text-6xl font-family-givonic-bold md:text-8xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 transition-all delay-200 duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            ₹25,000
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
            
            <p className="font-family-givonic-regular text-slate-600">Top performer across all skills</p>
          </div>

          <div className={`bg-gradient-to-br from-silver-100 to-gray-200 rounded-2xl p-8 text-center shadow-lg transition-all delay-100 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Medal className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="font-family-givonic-regular text-slate-600">Best in individual skill categories</p>
          </div>

          <div className={`bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center shadow-lg transition-all delay-200 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Star className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Rising Stars</h3>

            <p className="font-family-givonic-regular text-slate-600">Most improved performance</p>
          </div>

          <div className={`bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 text-center shadow-lg transition-all delay-300 duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}>
            <Gift className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Special Recognition</h3>
            <p className="font-family-givonic-regular text-slate-600">Innovation and creativity awards</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-b-3xl p-8 shadow-lg">
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