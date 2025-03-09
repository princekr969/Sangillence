import React from 'react';
import { 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  FileSpreadsheet, 
  Laptop,
  CheckCircle2
} from 'lucide-react';

function FeatureBox(props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-full">
        <props.icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{props.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{props.description}</p>
      <ul className="space-y-2">
        {props.points.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CourseStructure() {
  const features = [
    {
      icon: BookOpen,
      title: "About Coaching Offerings",
      description: "Comprehensive educational programs designed to enhance learning through personalized attention.",
      points: [
        "A dedicated coaching for class 3rd - 8th",
        "ICSE, CBSE & UP board Compatibility",
        "We teach All subjects",
      ]
    },
    {
      icon: Calendar,
      title: "Regular Classes (Mon-Fri)",
      description: "Daily structured learning sessions with expert instructors.",
      points: [
        "We cover the Full School Syllabus.",
        "Tests after each Chapter overs.",
        "Interactive Teaching style.",
        "We also provide Compact Notes.",
        "Additional grammar classes at weekends."
      ]
    },
    {
      icon: GraduationCap,
      title: "Master Class (Sun)",
      description: "Intensive weekend sessions focused on advanced topics.",
      points: [
        "Special classes on special topics",
        `Online class taken by IITian, NITians, IIITians/ NEET Qualified professionals.`,
      ]
    },
    {
      icon: FileSpreadsheet,
      title: "Monthly Reports & Online Touch",
      description: "Detailed progress tracking and continuous online support.",
      points: [
        `Student's monthly assessment reports (attendance, test scores etc) directly available to parent`,
        `Each update on dedicated What's app group, 24x7 availability`,
        "Every activity will be updated on Social media platforms.",
      ]
    },
    {
      icon: Laptop,
      title: "Smart Saturday (S²)",
      description: "Interactive learning sessions combining technology and education.",
      points: [
        "Duniya-Gyaan",
        "Weekly Words",
        "Brain Booster Games",
      ]
    }
  ];

  return (
    <div className="courseStructure min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-center md:text-5xl font-bold text-gray-900 mb-4">Our Course Structure</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive learning approach designed to maximize your educational journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureBox
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              points={feature.points}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseStructure;