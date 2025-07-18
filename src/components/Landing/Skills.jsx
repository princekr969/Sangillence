import { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Calculator, 
  Palette, 
  MessageSquare, 
  Lightbulb, 
  Users, 
  Target, 
  Book, 
  Zap, 
  Heart 
} from 'lucide-react';
import Report from './Report';

const skills = [
  { icon: Brain, name: "Critical Thinking", description: "Analyze complex problems systematically" },
  { icon: Calculator, name: "Logical Reasoning", description: "Apply mathematical and logical principles" },
  { icon: Palette, name: "Creativity", description: "Generate innovative solutions and ideas" },
  { icon: MessageSquare, name: "Communication", description: "Express ideas clearly and effectively" },
  { icon: Lightbulb, name: "Problem Solving", description: "Find practical solutions to challenges" },
  { icon: Users, name: "Leadership", description: "Guide teams and inspire collaboration" },
  { icon: Target, name: "Focus & Attention", description: "Maintain concentration on important tasks" },
  { icon: Book, name: "Research Skills", description: "Gather and analyze information efficiently" },
  { icon: Zap, name: "Adaptability", description: "Adjust to new situations and challenges" },
  { icon: Heart, name: "Emotional Intelligence", description: "Understand and manage emotions effectively" }
];

const Skills = () => {
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
    <section ref={sectionRef} className="py-20 bg-slate-100 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Skills We Measure
          </h2>
          <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Our AI-powered assessment evaluates a comprehensive range of skills that matter 
            in today's dynamic world, going far beyond traditional academic metrics.
          </p>
        </div>

        <div ref={sectionCardRef} className={`grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mb-16 font-family-givonic-regular`}>
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex justify-start max-sm:gap-2 bg-transparent group p-2 sm:p-6 transition-all duration-1000 ${
                isCardSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
                <div className={`w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center shadow-xl`}>
                      <skill.icon className="w-6 h-6 text-slate-100" />
                  </div>

                <span className={`max-sm:hidden block mt-3 mx-3 border-t-2 w-28 border-slate-600`}></span>
                  <div className='flex flex-col'>
                    <h3 className="text-xl font-family-givonic-bold font-bold text-slate-800 mb-2 ">
                      {skill.name}
                    </h3>
                    <p className="text-gray-600 font-normal leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
              </div>
              
          ))}
        </div>

        {/* Sample Skill Report Visualization */}
        <Report/>
      
      </div>
    </section>
  );
};

export default Skills; 