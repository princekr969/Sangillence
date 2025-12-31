import { useEffect, useRef } from 'react';

function CareersSocialGood() {
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

    const cards = document.querySelectorAll('.social-good-card');
    cards.forEach(el => {
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
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Build for Social Good</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Join our mission to create meaningful impact through technology. Work on projects that make a difference in education and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="social-good-card bg-gradient-to-br from-emerald-200 to-teal-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-graduation-cap text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Education Impact</h3>
            <p className="text-gray-700 text-sm font-medium text-center">
              Develop tools and platforms that help students learn better and achieve their academic goals
            </p>
          </div>

          {/* Card 2 */}
          <div className="social-good-card bg-gradient-to-br from-blue-200 to-indigo-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-users text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Community Building</h3>
            <p className="text-gray-700 text-sm font-medium text-center">
              Create platforms that connect students, mentors, and educators across the globe
            </p>
          </div>

          {/* Card 3 */}
          <div className="social-good-card bg-gradient-to-br from-purple-200 to-pink-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/80 rounded-full flex items-center justify-center">
              <i className="fas fa-heart text-gray-800 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Social Impact</h3>
            <p className="text-gray-700 text-sm font-medium text-center">
              Build solutions that address real-world challenges in education accessibility and equity
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-700 mb-6 text-lg">
            Make a difference while building your skills. Every line of code you write contributes to empowering students worldwide.
          </p>
          <a 
            href="https://forms.gle/ULsALGvwJ8VqNXi56" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
          >
            Join Build for Social Good <i className="fas fa-hands-helping"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CareersSocialGood;

