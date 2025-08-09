import { useEffect, useState, useRef } from 'react';
import { IndianRupee, BookOpenCheck, BrainCircuit, ChartColumnIncreasing, Award, School} from 'lucide-react';

const benefits = [
{
  icon: IndianRupee,
  title: "Zero Registration Fee",
  description: "0 registrations fees for all students",
  iconBgColor: "bg-gradient-to-r from-green-200 via-green-300 to-green-400",     
  classes:"bg-blue-100 delay-0",

},
{
  icon: BookOpenCheck,
  title: "21st Century Skills Assessment",
  description: "Test your child’s potential on 21st century skill",
  iconBgColor: "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400",     
  classes:"bg-blue-100 delay-50",      
},
{
  icon: ChartColumnIncreasing,
  title: "Data-Driven Growth for All",
  description: "Data- driven improvements for each stakeholders - Students, Parents, Teachers.",
  iconBgColor: "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400" ,     
  classes:"bg-blue-100 delay-100",      
},
{
  icon: Award,
  title: "Awards & Recognition",
  description: "Exciting awards, certificates, and recognition.",
  iconBgColor: "bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400",     
  classes:"bg-blue-100 delay-150",     
},
{
  icon: School,
  title: "Empowering Schools with Innovation",
  description: (<><strong>Boosts your school’s testing</strong> criteria with new age technology & education.</>),
  iconBgColor: "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400",     
  classes:"bg-blue-100 delay-200",        
},
{
  icon: BrainCircuit,
  title: "AI-Powered Evaluation",
  description: "AI-backed evaluation & insights on child's latent skills",
  iconBgColor: "bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400",     
  classes:"bg-blue-100 delay-250",        
}
];

const solutions = [
    {
      id: 1,
      number: "01",
      description: "The new age education required holistic development of students, knowledge and facts are everywhere, even a small kid can access vast internet."
    },
    {
      id: 2,
      number: "02",
      description: " This Olympiad gives every child a stage to explore, express, and excel with digital tools like calculators, internet access, and open resources — exactly how real-world problem-solving works!"
    },
    {
      id: 3,
      number: "03",
      description: "Their efforts are perfectly analysed by AI and reliable insights, reports will be issued."
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
        <div ref={sectionRef} className="relative min-h-screen bg-gradient-to-t from-blue-100 via-blue-50 to-white py-16 px-4 sm:px-6 md:px-16">
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
                Why Join the Future of Learning?
            </h2>
            {/* Decorative line */}
          <div className={`flex items-center justify-center mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              :'opacity-0 translate-y-12'}`}>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="flex justify-center items-start gap-2 md:gap-5"
            >
              <span className="text-blue-900 font-family-givonic-bold font-bold text-lg sm:text-3xl">
                {solution.number}
              </span>

              <p className="text-gray-600 font-family-givonic-regular text-start text-sm sm:text-base leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

            </div>

            {/* Main Content */}
            <div ref={sectionCardRef} className="grid md:grid-cols-2 gap-5 items-center">
        
                {benefits.map((benefit, index) => (
                <div 
                    key={index}
                    className={`${benefit.classes} flex items-start lg:h-36 space-x-4 p-6 bg-white rounded-xl shadow-lg transition-all duration-1000 ${
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
        
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
        </div>
    );
}

export default Benefits;