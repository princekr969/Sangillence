function CareersHero() {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Dark futuristic background with geometric shapes */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900"></div>
        
        {/* Geometric overlays */}
        <div className="absolute inset-0">
          {/* Large angular shapes */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Blue angular shape - top left */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/30 to-transparent"
              style={{
                clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)'
              }}
            ></div>
            
            {/* Orange/amber angular shape - top right */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/20 to-transparent"
              style={{
                clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 70% 100%)'
              }}
            ></div>
            
            {/* Teal angular shape - bottom left */}
            <div 
              className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-teal-500/20 to-transparent"
              style={{
                clipPath: 'polygon(0 0, 60% 0, 0 80%)'
              }}
            ></div>
            
            {/* Purple angular shape - bottom right */}
            <div 
              className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/25 to-transparent"
              style={{
                clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
              }}
            ></div>
          </div>
          
          {/* Additional layered geometric elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rotate-45 blur-sm"
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 -rotate-12 blur-sm"
            ></div>
          </div>
        </div>
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent" 
              style={{
                letterSpacing: '0.05em'
              }}>
            Career Opportunities
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              With Sangillence
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          "Build for Social Good" Internship Program 2026
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
          We're excited that you're interested in joining our internship program! This is your opportunity to work on real projects, build practical skills, and grow professionally in a flexible remote environment.
        </p>
        <a 
          href="https://forms.gle/ULsALGvwJ8VqNXi56" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
        >
          Click Here to Apply <i className="fas fa-rocket"></i>
        </a>
      </div>
    </section>
  );
}

export default CareersHero;
