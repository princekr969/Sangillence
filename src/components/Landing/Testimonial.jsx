import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Rakesh prajapat",
    text: "The testing experience was blissful. The questions ranged from simple to twisted and challenging. The evaluation report was concise and helpful. Overall, it was a wonderful demonstration of what AI can achieve in the field of testing and evaluation.",
    profileImage: "https://res.cloudinary.com/dstbd40ud/image/upload/v1753720704/Rakesh_prajapat_profile_kmephw.png",
  },
  {
    id: 2,
    name: "Sai yogyabhilash",
    text: "The exam I recently that tested my logical thinking and skills related to my thinking abilities . It included tasks like problem-solving and real-world scenarios. The test really made me think and apply my knowledge. I got clear feedback on my strengths and areas to improve. It was fair and accurate, and the experience helped me understand my readiness for a career in software. Overall, it was a helpful and eye-opening experience.",
    profileImage: "https://res.cloudinary.com/dstbd40ud/image/upload/v1753891024/Sai_yogyabhilash_ah8wyv.png",
  },
];

const eventImages = [
  "https://res.cloudinary.com/dstbd40ud/image/upload/v1753539378/WhatsApp_Image_2025-07-26_at_19.36.51_cc82c711_jlnrdn.jpg",
  "https://res.cloudinary.com/dstbd40ud/image/upload/v1753539378/image1_qjqtkv.jpg",
  "https://res.cloudinary.com/dstbd40ud/image/upload/v1753539378/WhatsApp_Image_2025-07-26_at_19.36.46_6f7d6779_hj1d21.jpg",
]


const Testimonial = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 1);
    }, 50); // Smooth scroll speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-t from-blue-100 via-blue-50 to-white px-4 py-16 sm:px-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-family-givonic-bold font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                What Students Are Saying
              </h1>
              <p className="text-gray-600 text-base font-family-givonic-regular lg:text-lg leading-relaxed">
                Real feedback from young minds who’ve discovered their strengths through our Olympiads and assessments.
              </p>
            </div>

            {/* Testimonials List */}
            <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
              <div 
                className="absolute w-full transition-transform duration-100 ease-linear"
                style={{
                  transform: `translateY(-${scrollPosition % (testimonials.length * 200)}px)`,
                }}
              >
                {/* Render testimonials twice for infinite scroll */}
                {[...testimonials,...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={`${testimonial.id}-${index}`} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 mb-4 mx-4">
                    <div className="flex items-start space-x-3 lg:space-x-4 mb-3 lg:mb-4">
                      <img 
                        src={testimonial.profileImage} 
                        alt={testimonial.name}
                        className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base lg:text-lg font-family-givonic-semiBold font-semibold text-gray-900 truncate">
                            {testimonial.name}
                          </h3>
                          
                        </div>
                        <p className="text-gray-600 text-sm font-family-givonic-regular lg:text-base leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* Right Visual Stack */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px] order-1 lg:order-2">
            
            {/* First Card - Top */}
            <div className="absolute top-0 right-0 w-48 h-36 sm:w-56 sm:h-42 md:w-72 md:h-52 lg:w-64 lg:h-48 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg transform rotate-2 lg:rotate-3 hover:rotate-4 lg:hover:rotate-6 transition-transform duration-300">
              <img 
                src={eventImages[0]} 
                alt="Paris" 
                className="w-full h-full object-cover"
              />
              
            </div>

            {/* Second Card - Middle */}
            <div className="absolute top-24 left-4 sm:top-28 sm:left-6 lg:top-32 lg:left-8 w-52 h-40 sm:w-64 sm:h-48 md:w-72 md:h-52 lg:w-72 lg:h-72 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl transform -rotate-1 lg:-rotate-2 hover:-rotate-3 lg:hover:-rotate-6 transition-transform duration-300 z-10">
              <img 
                src={eventImages[1]} 
                alt="Ocean view" 
                className="w-full h-full object-cover"
              />
             
            </div>

            {/* Third Card - Bottom */}
            <div className="absolute bottom-0 right-2 sm:right-4 w-56 h-42 sm:w-68 sm:h-48 md:w-72 md:h-52 lg:w-80 lg:h-56 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-2 lg:hover:rotate-3 transition-transform duration-300">
              <img 
                src={eventImages[2]} 
                alt="Japanese temple" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Elements - Hidden on mobile for cleaner look */}
            <div className="hidden sm:block absolute top-16 left-0 lg:top-20 lg:left-0 w-4 h-4 lg:w-6 lg:h-6 bg-blue-400 rounded-full opacity-60"></div>
            <div className="hidden sm:block absolute bottom-32 left-8 lg:bottom-40 lg:left-12 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full opacity-60"></div>
            <div className="hidden sm:block absolute top-48 right-8 lg:top-60 lg:right-12 w-4 h-4 lg:w-5 lg:h-5 bg-orange-400 rounded-full opacity-60"></div>
          </div>

        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-1 h-16 bg-gradient-to-b from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
    </div>
  );
};

export default Testimonial;