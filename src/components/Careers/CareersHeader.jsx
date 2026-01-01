import { Link } from 'react-router-dom';

function CareersHeader() {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50" style={{ boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <img 
              src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
              alt="Team Sangillence Logo"
              className="h-12 w-auto"
              style={{ filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))' }}
            />
          </div>
          <div>
            <div className="font-bold text-lg">
              <Link to="/home" className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent hover:from-yellow-300 hover:via-amber-300 hover:to-yellow-400 transition-all">
                Sangillence
              </Link>
            </div>
            <div className="text-slate-400 text-sm">Incubated @TIIC, ABV IIITM Gwalior</div>
          </div>
        </div>
        <div>
          <a 
            href="https://forms.gle/ULsALGvwJ8VqNXi56" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          >
            Apply Now <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default CareersHeader;

