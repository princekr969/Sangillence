function AboutHeader() {
  return (

     <div className="relative h-[15vh] md:h-[20vh] bg-slate-900 overflow-hidden">
      {/* Background with geometric shapes */}
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
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center h-full px-6 lg:px-8">
        {/* Main heading */}
        <h1 className="text-3xl font-family-givonic-bold lg:text-5xl font-bold text-white tracking-wider text-center">
          ABOUT
        </h1>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-4 left-4 w-1 h-8 bg-gradient-to-t from-blue-500 to-transparent"></div>
      <div className="absolute bottom-4 right-4 w-1 h-8 bg-gradient-to-t from-amber-500 to-transparent"></div>
      
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


  )
}

export default AboutHeader
