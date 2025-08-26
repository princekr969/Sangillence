import { useState, useRef, useEffect } from 'react';

const TestimonialSection = () => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Prof. Anurag Srivastava",
      text: `I've followed Sangillence and its young founders, impressed by their clarity and courage to test ideas in real settings. SOBO'25, India's first AI-powered open-book Olympiad, challenges traditional assessments and promotes skilled learning. It could redefine how we nurture student intelligence. I commend the team's vision and sincerity.`,
      profileImage: "https://res.cloudinary.com/dstbd40ud/image/upload/v1756060274/Screenshot_2025-08-24_235904_s6lavm.png",
    },
    {
      id: 2,
      name: "Dr. Jeevaraj S",
      text: "The Sangillence team shows a sincere, deep commitment to transforming education through AI. SOBO'25 reflects their vision—promoting creativity, reasoning, and real-world problem-solving over rote learning. It's a rare, forward-thinking effort with real potential for impact.",
      profileImage: "https://res.cloudinary.com/dstbd40ud/image/upload/v1756060274/Screenshot_2025-08-24_235916_aofpbk.png",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 md:px-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold text-slate-800 mb-4 transition-all duration-1000 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            What Experts Say
          </h2>
          <div className={`flex items-center justify-center mb-6 transition-all duration-1000 delay-200 ${
            isSectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`relative group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-lg transition-all duration-1000 transform hover:shadow-xl hover:scale-[1.02] overflow-hidden ${
                isSectionVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200 + 400}ms` }}
            >
              {/* Geometric hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Profile Section */}
                <div className="flex items-center mb-6">
                  <div className="relative group">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-[1.05]">
                      <img 
                        src={testimonial.profileImage} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Profile image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1">
                  <blockquote className="text-slate-300 leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-6xl text-slate-700/20 font-serif leading-none">"</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;