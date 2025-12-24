import { useEffect, useState, useRef } from "react";
import {
  Target,
  BookOpen,
  MessageSquare,
  Brain,
  BarChart3,
  BookText,
  CheckCircle,
  Users,
  Calendar,
  Clock,
  Shield,
  Zap,
  StepForward,
  ArrowRight,
  Video,
  Phone,
  Award,
} from "lucide-react";

const deliverables = [
  {
    icon: Target,
    title: "Personal Mentorship",
    iconBgColor: "bg-blue-100",
    classes: "bg-gradient-to-br from-blue-50 to-blue-100 delay-0",
    features: [
      "Dedicated 1:1 mentor",
      "Monthly 3 personalized video calls",
      "Customized strategy based on:",
      "• Your syllabus",
      "• Your school curriculum",
      "• Your strengths & weaknesses",
    ],
  },
  {
    icon: BookOpen,
    title: "Subject Expert Support",
    iconBgColor: "bg-purple-100",
    classes: "bg-gradient-to-br from-purple-50 to-purple-100 delay-50",
    features: [
      "Physics / Chemistry / Math experts",
      "Doubt resolution + conceptual clarity",
      "Strategy on which topics to focus more on",
      "Advanced problem-solving techniques",
      "Weekly topic-wise assessments",
    ],
  },
  {
    icon: MessageSquare,
    title: "24×7 WhatsApp Support",
    iconBgColor: "bg-green-100",
    classes: "bg-gradient-to-br from-green-50 to-green-100 delay-100",
    features: [
      "Academic doubts resolution",
      "Strategy confusion clarification",
      "Exam-related stress handling",
      "Quick guidance when you feel stuck",
      "Study material sharing",
    ],
  },
  {
    icon: Brain,
    title: "Mental Conditioning",
    iconBgColor: "bg-rose-100",
    classes: "bg-gradient-to-br from-rose-50 to-rose-100 delay-150",
    features: [
      "Handling exam pressure",
      "Managing fear of failure",
      "Building consistency & discipline",
      "Confidence building before exams",
      "Anxiety management techniques",
    ],
  },
  {
    icon: BarChart3,
    title: "Exam Strategy",
    iconBgColor: "bg-amber-100",
    classes: "bg-gradient-to-br from-amber-50 to-amber-100 delay-200",
    features: [
      "Understanding JEE patterns",
      "How toppers think & solve",
      "Smart shortcuts & time-saving techniques",
      "Mistake analysis & improvement plans",
      "Test-taking strategies",
    ],
  },
  {
    icon: BookText,
    title: "Boards + JEE Balance",
    iconBgColor: "bg-indigo-100",
    classes: "bg-gradient-to-br from-indigo-50 to-indigo-100 delay-250",
    features: [
      "How much to focus on boards vs JEE",
      "Integrated study plans",
      "Avoid burnout while maximizing output",
      "Priority-based scheduling",
      "Time allocation optimization",
    ],
  },
];

const additionalBenefits = [
  {
    icon: Video,
    title: "Interactive Sessions",
    description: "Live video calls with screen sharing and whiteboard",
  },
  {
    icon: Calendar,
    title: "Structured Planning",
    description: "Monthly, weekly, and daily study schedules",
  },
  {
    icon: Shield,
    title: "Accountability",
    description: "Regular progress tracking and goal setting",
  },
  {
    icon: Award,
    title: "Performance Analysis",
    description: "Detailed reports on strengths and areas for improvement",
  },
];

function MentorshipDeliverables() {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isCardSectionVisible, setIsCardSectionVisible] = useState(false);
  const [isAdditionalVisible, setIsAdditionalVisible] = useState(false);
  const sectionRef = useRef(null);
  const sectionCardRef = useRef(null);
  const additionalRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "5px 0px 0px 0px",
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
        rootMargin: "10px 0px 0px 0px",
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAdditionalVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "10px 0px 0px 0px",
      }
    );

    if (additionalRef.current) {
      observer.observe(additionalRef.current);
    }

    return () => {
      if (additionalRef.current) {
        observer.unobserve(additionalRef.current);
      }
    };
  }, []);

  const scrollToForm = () => {
    document
      .getElementById("application-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-gradient-to-t from-slate-50 to-white py-16 px-4 sm:px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-family-givonic-bold font-bold text-slate-800 transition-all duration-1000 ${
              isSectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Your Mentorship Deliverables
          </h2>

          {/* Decorative line */}
          <div
            className={`flex items-center justify-center mb-6 transition-all duration-1000 ${
              isSectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
          </div>

          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isSectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Everything you need for JEE success, delivered systematically
            through our comprehensive mentorship program
          </p>
        </div>

        {/* Main Deliverables Grid */}
        <div
          ref={sectionCardRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {deliverables.map((deliverable, index) => (
            <div
              key={index}
              className={`${
                deliverable.classes
              } rounded-2xl p-6 shadow-lg border border-white transition-all duration-500 ${
                isCardSectionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 ${deliverable.iconBgColor} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <deliverable.icon className="w-6 h-6 text-gray-800" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {deliverable.title}
                  </h3>
                </div>
              </div>

              <ul className="space-y-2">
                {deliverable.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {!feature.includes("•") && (
                      <StepForward
                        fill="true"
                        className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
                      />
                    )}
                    <span
                      className={`text-gray-700 text-sm ${
                        feature.includes("•") ? "pl-8" : "pl-2"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Benefits Section */}
        <div ref={additionalRef} className="mb-12">
          <div
            className={`mb-8 transition-all duration-1000 ${
              isAdditionalVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              More Value Added Features
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border border-blue-100 shadow-sm transition-all duration-300 ${
                  isAdditionalVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mb-4">
                  <benefit.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2 hidden md:block"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2 hidden md:block"></div>
    </div>
  );
}

export default MentorshipDeliverables;
