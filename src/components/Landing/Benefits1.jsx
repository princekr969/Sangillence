import { useEffect, useState, useRef } from 'react';
import { DollarSign, Award, TrendingUp, Users, Clock, Star } from 'lucide-react';


const benefits = [
{
  icon: DollarSign,
  title: "Zero Registration Fee",
  description: "Completely free participation for all eligible students",
  iconBgColor: "bg-green-100",     
  classes:"bg-blue-100 delay-0",

},
{
  icon: Award,
  title: "Skill Certification",
  description: "Get certified for your unique talents and abilities",
  iconBgColor: "bg-yellow-100",     
  classes:"bg-blue-100 delay-50",      
},
{
  icon: TrendingUp,
  title: "Career Insights",
  description: "Discover your strengths and potential career paths",
  iconBgColor: "bg-blue-100" ,     
  classes:"bg-blue-100 delay-100",      
},
{
  icon: Users,
  title: "National Recognition",
  description: "Stand out among peers across the country",
  iconBgColor: "bg-purple-100",     
  classes:"bg-blue-100 delay-150",     
},
{
  icon: Clock,
  title: "Flexible Format",
  description: "Open-book examination at your own pace",
  iconBgColor: "bg-teal-100",     
  classes:"bg-blue-100 delay-200",        
},
{
  icon: Star,
  title: "AI-Powered Reports",
  description: "Detailed analysis of your performance and potential",
  iconBgColor: "bg-indigo-100",     
  classes:"bg-blue-100 delay-250",        
}
];

function Benefits1() {
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
        <div ref={sectionRef} className="min-h-screen bg-gradient-to-t from-blue-100 via-blue-50 to-white py-16 px-4 sm:px-6 md:px-16">
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
                Why Join the Future of Learning?
            </h2>
            <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
              SOBO'25 offers unprecedented opportunities to showcase your true potential 
              and gain insights that traditional assessments simply cannot provide.
            </p>
            </div>

            {/* Main Content */}
            <div ref={sectionCardRef} className="grid md:grid-cols-2 gap-5 items-center">
        
                {benefits.map((benefit, index) => (
                <div 
                    key={index}
                    className={`${benefit.classes} flex items-start h-32 space-x-4 p-6 bg-white rounded-xl shadow-lg transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
                >
                    <div className={`w-12 h-12 ${benefit.iconBgColor} rounded-full flex items-center justify-center shadow-lg`}>
                        <benefit.icon className="w-6 h-6 text-slate-600" />
                    </div>
            
                    <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                    </p>
                    </div>
                </div>
                ))}
            
            </div>
        </div>
        </div>
    );
}

export default Benefits1;