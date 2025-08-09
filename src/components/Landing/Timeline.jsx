import { useState,useRef,useEffect } from 'react';
import { Calendar, Lock, } from 'lucide-react';

const timelineData = [
  {
    date: "August 01, 2025",
    month: "August",
    day: "01",
    year: "2025",
    icon: <Calendar className="w-4 h-4" />,
    title: "Registration Opens",
    description: "Free registration begins for all eligible students",
    status: "completed"
  },
  {
    date: "September 15, 2025",
    month: "September",
    day: "15",
    year: "2025",
    icon: <Lock className="w-4 h-4" />,
    title: "Registrations Closed",
    description: "Registration period for the AI-powered open-book exam has ended.",
    status: "current"
  },
  // {
  //   date: "March 1-15, 2025",
  //   month: "March",
  //   day: "1-15",
  //   year: "2025",
  //   icon: <Users className="w-4 h-4" />,
  //   title: "Evaluation Phase",
  //   description: "AI analysis and comprehensive skill assessment",
  //   status: "current"
  // },
  // {
  //   date: "March 30, 2025",
  //   month: "March",
  //   day: "30",
  //   year: "2025",
  //   icon: <Award className="w-4 h-4" />,
  //   title: "Results & Awards",
  //   description: "Results announcement and award ceremony",
  //   status: "current"
  // }
];


const Timeline = () => {
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const [visibleCards, setVisibleCards] = useState([]);
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);


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
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleCards((prev) =>
            prev.includes(index) ? prev : [...prev, index]
          );
        }
      });
    },
    {
      threshold: 0.2,
    }
  );


  cardRefs.current.forEach((ref) => ref && observer.observe(ref));
  
  return () => {
    cardRefs.current.forEach((ref) => ref && observer.unobserve(ref));
  };
}, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-slate-100 py-8 px-4 sm:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Important Timeline
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
            Stay updated with key dates and milestones for SOBO 25. 
            Mark your calendar and don't miss any important deadlines.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950"></div>
          {/* Vertical Line - Mobile */}
          <div className="md:hidden absolute left-8 top-0 w-0.5 h-full bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950"></div>

          {/* Timeline Items */}
          <div className="space-y-8 font-family-givonic-bold sm:space-y-12">
            {timelineData.map((item, index) => (
                <div
                    data-index={index}
                    ref={(el) => (cardRefs.current[index] = el)}
                    key={index} 
                    className={`relative transition-all duration-1000
                        ${
                            visibleCards.includes(index)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10'
                        }
                     `}
                >
                {/* Desktop */}
                <div className="hidden md:flex items-center">
                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 rounded-full flex items-center justify-center z-10 shadow-lg">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full flex">
                    {index % 2 === 0 ? (
                      <>
                        {/* Left - Date */}
                        <div className="w-1/2 pr-12 text-right">
                          <div className="text-gray-500 text-sm font-medium">{item.month}</div>
                          <div className="text-4xl font-bold text-gray-800">{item.day}</div>
                          <div className="text-gray-500 text-sm">{item.year}</div>
                        </div>

                        {/* Right - Details */}
                        <div className="w-1/2 pl-12">
                          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Left - Details */}
                        <div className="w-1/2 pr-12">
                          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                          </div>
                        </div>

                        {/* Right - Date */}
                        <div className="w-1/2 pl-12 text-left">
                          <div className="text-gray-500 text-sm font-medium">{item.month}</div>
                          <div className="text-4xl font-bold text-gray-800">{item.day}</div>
                          <div className="text-gray-500 text-sm">{item.year}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-start">
                  {/* Dot */}
                  <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center z-10 shadow-lg mr-6 mt-2 flex-shrink-0">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-gray-500 text-xs font-medium">{item.month}</div>
                          <div className="text-2xl font-bold text-gray-800">{item.day}</div>
                          <div className="text-gray-500 text-xs">{item.year}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
