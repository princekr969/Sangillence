import { useEffect, useState, useRef } from 'react';
import { 
  Target, Users, Brain, Calendar, Clock, 
  Video, MessageSquare, BookOpen, Award,
  CheckCircle, Zap, IndianRupee, Star,
  ArrowRight, Phone, Shield, TrendingUp, Check,
  Clock as ClockIcon, AlertCircle
} from 'lucide-react';

const mentorshipPrograms = [
  {
    title: "Mentorship Program",
    type:"(Personal)",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    duration: "Jan 2026 - May 2026",
    sessions: "2 personalized + 1 common session / month",
    totalSessions: "15 sessions till JEE Advanced",
    medium: "Google Meet Video Call",
    support: "24×7 WhatsApp Support",
    features: [
      "Personalized strategy after JEE Session-1 result",
      "Identifying high-ROI topics for Session-2 & Advanced",
      "Subject/Chapters prioritization (what to study/ignore)",
      "Advanced-specific problem-solving approach",
      "Mistake analysis & score improvement planning",
      "Mental conditioning & confidence building",
      "Direct access to IIT/NIT/IIIT mentors",
      "Balance between Boards & JEE"
    ],
    status: "Coming Soon",
    statusColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
  },
  {
    title: "Counselling",
    type:"(1-on-1)",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    duration: "May 2026 - July 2026",
    sessions: "Personalized 1-on-1 sessions",
    features: [
      "Student profiling (strengths, interests, risk appetite)",
      "Understanding long-term goals",
      "College vs branch trade-off analysis",
      "Personalized choice filling strategy",
      "Backup & worst-case planning",
      "Guidance till final seat acceptance",
      "Parent involvement for decision-making"
    ],
    status: "Coming Soon",
    statusColor: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    title: "Bridge Mentoring Program",
    type:"(Group)",
    icon: TrendingUp,
    color: "from-green-500 to-teal-500",
    duration: "July 2026 - Dec 2026",
    sessions: "Group sessions + Expert lectures",
    features: [
      "Domain exploration: Web/App Dev, AI/ML, Data, Cybersecurity, etc.",
      "Basics of coding & tech ecosystem awareness",
      "Skill development: communication, productivity, leadership",
      "Clubs, societies & PORs guidance",
      "Networking basics & LinkedIn optimization",
      "Expert & alumni lectures from top companies",
      "First-year roadmap & common mistakes to avoid",
      "Making students confident & college-ready"
    ],
    status: "Coming Soon",
    statusColor: "bg-gradient-to-r from-green-500 to-teal-500"
  }
];

function Courses() {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isPlansVisible, setIsPlansVisible] = useState(false);
  const [isProgramsVisible, setIsProgramsVisible] = useState(false);
  const sectionRef = useRef(null);
  const plansRef = useRef(null);
  const programsRef = useRef(null);

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
          setIsPlansVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '10px 0px 0px 0px',
      }
    );

    if (plansRef.current) {
      observer.observe(plansRef.current);
    }

    return () => {
      if (plansRef.current) {
        observer.unobserve(plansRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProgramsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '10px 0px 0px 0px',
      }
    );

    if (programsRef.current) {
      observer.observe(programsRef.current);
    }

    return () => {
      if (programsRef.current) {
        observer.unobserve(programsRef.current);
      }
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id='courses-section' ref={sectionRef} className="relative bg-gradient-to-b from-slate-50 to-blue-50 pb-16 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Mentorship Programs Section */}
        <div ref={programsRef} className="mb-16">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            isProgramsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full mb-4">
              <Target className="w-5 h-5" />
              <span className="font-bold">Mentorship Programs Overview</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Comprehensive Support for Your Entire Journey
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From JEE preparation to college admission and beyond - we guide you at every step
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mentorshipPrograms.map((program, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  isProgramsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Coming Soon Ribbon */}
                <div className="absolute top-0 right-0">
                  <div className="relative">
                    <div className={`absolute top-5 -right-7 w-50 h-8 ${program.statusColor} flex items-center justify-center  transform rotate-45 translate-x-8 translate-y-2`}>
                        <div className="flex items-center justify-center">
                        <span className="text-white  text-xs font-bold flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {program.status}
                        </span>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <h4 className="text-lg font-bold text-gray-900">{program.type}</h4>
                  </div>

                  {/* Program Details */}
                  <div className="space-y-4 mb-6">
                    {program.duration && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-gray-700">Duration</div>
                          <div className="text-gray-600 text-sm">{program.duration}</div>
                        </div>
                      </div>
                    )}
                    
                    {program.sessions && (
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-purple-500" />
                        <div>
                          <div className="font-medium text-gray-700">Sessions</div>
                          <div className="text-gray-600 text-sm">{program.sessions}</div>
                        </div>
                      </div>
                    )}

                    {program.totalSessions && (
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-medium text-gray-700">Total Sessions</div>
                          <div className="text-gray-600 text-sm">{program.totalSessions}</div>
                        </div>
                      </div>
                    )}

                    {program.medium && (
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-red-500" />
                        <div>
                          <div className="font-medium text-gray-700">Medium</div>
                          <div className="text-gray-600 text-sm">{program.medium}</div>
                        </div>
                      </div>
                    )}

                    {program.support && (
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-gray-700">Support</div>
                          <div className="text-gray-600 text-sm">{program.support}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 mb-2">Key Features:</h4>
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check strokeWidth={5} className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Notify Me Button */}
                  <div className="relative w-full mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => {
                        // Add notification signup logic here
                        alert(`We'll notify you when ${program.title} opens for enrollment!`);
                      }}
                      className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Notify Me When Available
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

export default Courses;