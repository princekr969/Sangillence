import { useEffect, useRef } from 'react';

function CareersApply() {
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

    const careerCards = document.querySelectorAll('.career-card');
    careerCards.forEach(el => {
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
    <section id="apply" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-slate-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Ready to Apply?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="career-card bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg">
            <div className="w-12 h-12 mb-4 bg-white/80 rounded-lg flex items-center justify-center">
              <i className="fas fa-file-alt text-gray-800 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Application Process</h3>
            <p className="text-gray-700 text-sm mb-2 font-medium">
              Please fill out all sections of the application form completely and accurately. Applications will be reviewed on a rolling basis.
            </p>
            <p className="text-gray-700 text-sm font-medium">
              Make sure to highlight your skills, experience, and motivation for joining our program.
            </p>
          </div>

          <div className="career-card bg-gradient-to-br from-amber-200 to-orange-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg">
            <div className="w-12 h-12 mb-4 bg-white/80 rounded-lg flex items-center justify-center">
              <i className="fas fa-info-circle text-gray-800 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Important Notes</h3>
            <p className="text-gray-700 text-sm mb-2 font-medium">
              This internship is designed for learning and skill development. While unpaid, you'll gain valuable experience that will boost your career.
            </p>
            <p className="text-gray-700 text-sm font-medium">
              All positions are remote, but we expect consistent communication and commitment to the agreed schedule.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="https://forms.gle/ULsALGvwJ8VqNXi56" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
          >
            Apply Now via Google Form <i className="fas fa-external-link-alt"></i>
          </a>
          <p className="mt-5 text-slate-600 max-w-2xl mx-auto text-sm">
            Applications will be reviewed on a rolling basis. Early applications have a higher chance of selection.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CareersApply;

