import { useEffect, useRef } from 'react';

function CareersExpectations() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const expectationItems = document.querySelectorAll('.career-expectation-item');
    expectationItems.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What to Expect</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="career-expectation-item bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl p-6 text-center border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-hands text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Hands-on Experience</h3>
            <p className="text-gray-700 text-sm font-medium">Work on real, live projects that have actual impact</p>
          </div>

          <div className="career-expectation-item bg-gradient-to-br from-purple-200 to-pink-300 rounded-2xl p-6 text-center border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-user-graduate text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Mentorship</h3>
            <p className="text-gray-700 text-sm font-medium">Guidance from experienced industry professionals</p>
          </div>

          <div className="career-expectation-item bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl p-6 text-center border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-briefcase text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Portfolio Building</h3>
            <p className="text-gray-700 text-sm font-medium">Create work samples to showcase your skills</p>
          </div>

          <div className="career-expectation-item bg-gradient-to-br from-green-200 to-teal-300 rounded-2xl p-6 text-center border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-clock text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Flexible Schedule</h3>
            <p className="text-gray-700 text-sm font-medium">Work hours that fit around your schedule</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersExpectations;

