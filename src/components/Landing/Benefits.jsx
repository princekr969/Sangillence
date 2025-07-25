import { useEffect, useState, useRef } from 'react';
import { IndianRupee, BookOpenCheck, BrainCircuit, ChartColumnIncreasing, Award, School, TrendingUp, Users, Clock, Star } from 'lucide-react';

const benefits = [
{
  icon: IndianRupee,
  title: "Zero Registration Fee",
  description: "Completely free participation for all eligible students",
  iconBgColor: "bg-gradient-to-r from-green-200 via-green-300 to-green-400",     
  classes:"bg-blue-100 delay-0",

},
{
  icon: BookOpenCheck,
  title: "21st Century Skills Assessment",
  description: "Test your child’s potential in critical modern skills like creativity, communication, and problem-solving.",
  iconBgColor: "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400",     
  classes:"bg-blue-100 delay-50",      
},
{
  icon: ChartColumnIncreasing,
  title: "Data-Driven Growth for All",
  description: "Smart recommendations for Students, Parents, and Teachers to support targeted skill development.",
  iconBgColor: "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400" ,     
  classes:"bg-blue-100 delay-100",      
},
{
  icon: Award,
  title: "Awards & Recognition",
  description: "Earn exciting awards, certificates, and national-level recognition for top performers",
  iconBgColor: "bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400",     
  classes:"bg-blue-100 delay-150",     
},
{
  icon: School,
  title: "Empowering Schools with Innovation",
  description: "Enhance your school's assessment practices with cutting-edge EdTech solutions.",
  iconBgColor: "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400",     
  classes:"bg-blue-100 delay-200",        
},
{
  icon: BrainCircuit,
  title: "AI-Powered Evaluation",
  description: "Get personalized insights based on your child’s performance using advanced AI analysis.",
  iconBgColor: "bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400",     
  classes:"bg-blue-100 delay-250",        
}
];

function Benefits() {
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

export default Benefits;