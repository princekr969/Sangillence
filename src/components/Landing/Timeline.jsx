import { useEffect, useState, useRef } from 'react';
import { Calendar, Users, FileText, Award, CheckCircle } from 'lucide-react';

const timelineEvents = [
  {
    icon: Calendar,
    title: "Registration Opens",
    date: "January 15, 2025",
    description: "Free registration begins for all eligible students",
    status: "completed"
  },
  {
    icon: FileText,
    title: "Assessment Period",
    date: "February 1-28, 2025",
    description: "AI-powered open-book examination window",
    status: "current"
  },
  {
    icon: Users,
    title: "Evaluation Phase",
    date: "March 1-15, 2025",
    description: "AI analysis and comprehensive skill assessment",
    status: "upcoming"
  },
  {
    icon: Award,
    title: "Results & Awards",
    date: "March 30, 2025",
    description: "Results announcement and award ceremony",
    status: "upcoming"
  }
];

const Timeline = () => {
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
    <section ref={sectionRef} className="bg-gradient-to-t from-blue-100 via-blue-50 to-white py-16 px-4 sm:px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 mb-6 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Important Timeline
          </h2>
          <p className={`text-xl font-family-givonic-regular text-slate-600 max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Stay updated with key dates and milestones for SOBO 25. 
            Mark your calendar and don't miss any important deadlines.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                    event.status === 'current' ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        event.status === 'completed' ? 'bg-green-500' :
                        event.status === 'current' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {event.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <event.icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
                        <p className="text-sm font-semibold text-blue-600">{event.date}</p>
                      </div>
                    </div>
                    <p className="text-slate-600">{event.description}</p>
                    {event.status === 'current' && (
                      <div className="mt-4 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full inline-block">
                        Current Phase
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline; 