import { useEffect, useRef } from 'react';

function CareersRoles() {
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

    const roleCards = document.querySelectorAll('.career-role-card');
    roleCards.forEach(el => {
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
    <section id="roles" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Available Roles</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Generative AI Intern */}
          <div className="career-role-card bg-gradient-to-br from-blue-200 to-cyan-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="mb-4">
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <i className="fas fa-brain text-gray-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Generative AI Intern</h3>
              <p className="text-gray-700 font-medium">Work on AI projects and tools</p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Develop and fine-tune generative AI models</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Work on natural language processing projects</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Create AI-powered tools and applications</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Collaborate with AI researchers and engineers</span>
              </li>
            </ul>
          </div>

          {/* Flutter Intern */}
          <div className="career-role-card bg-gradient-to-br from-purple-200 to-pink-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="mb-4">
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <i className="fas fa-mobile-alt text-gray-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Flutter Intern</h3>
              <p className="text-gray-700 font-medium">Build mobile applications with Flutter</p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Develop cross-platform mobile applications</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Implement responsive UI designs</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Integrate REST APIs and third-party services</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Participate in app testing and deployment</span>
              </li>
            </ul>
          </div>

          {/* Node.js Intern */}
          <div className="career-role-card bg-gradient-to-br from-green-200 to-teal-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="mb-4">
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <i className="fas fa-server text-gray-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Node.js Intern</h3>
              <p className="text-gray-700 font-medium">Develop REST APIs and backend systems</p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Build scalable REST APIs with Node.js</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Design and implement database schemas</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Create server-side logic and authentication systems</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Optimize backend performance and security</span>
              </li>
            </ul>
          </div>

          {/* Psychologist - Human Computer Interaction */}
          <div className="career-role-card bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="mb-4">
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <i className="fas fa-user-friends text-gray-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Psychologist - HCI</h3>
              <p className="text-gray-700 font-medium">Human Computer Interaction & UX Research</p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Conduct user research and usability studies</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Analyze user behavior and cognitive patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Design intuitive user interfaces based on psychological principles</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Improve user experience through behavioral insights</span>
              </li>
            </ul>
          </div>

          {/* Digital Marketer and Social Media Manager */}
          <div className="career-role-card bg-gradient-to-br from-orange-200 to-red-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="mb-4">
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <i className="fas fa-bullhorn text-gray-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Digital Marketer & Social Media Manager</h3>
              <p className="text-gray-700 font-medium">Drive brand awareness and engagement</p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Create and manage social media content across platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Develop and execute digital marketing campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Analyze marketing metrics and optimize strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Build and engage with online communities</span>
              </li>
            </ul>
          </div>

          {/* React Frontend Intern */}
          <div className="career-role-card bg-gradient-to-br from-cyan-200 to-blue-300 rounded-2xl p-6 border-b-4 border-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
            <div className="mb-4">
              <div className="rounded-full bg-white/80 p-3 inline-flex items-center justify-center mb-4">
                <i className="fab fa-react text-gray-800 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">React Frontend Intern</h3>
              <p className="text-gray-700 font-medium">Build modern web applications with React</p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Develop responsive web applications using React</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Implement component-based architecture and state management</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Create interactive user interfaces with modern UI libraries</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-check text-gray-800 mt-1 text-sm flex-shrink-0"></i>
                <span className="text-sm font-medium">Optimize performance and ensure cross-browser compatibility</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersRoles;

