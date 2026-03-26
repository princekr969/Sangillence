import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { ExploraAnimation } from "../components";
import { useAuth } from "../context/AuthContext";

function Explora() {
  const { user } = useAuth();
  return (
    <div className="explora-page min-h-screen bg-black font-family-givonic-regular">
      <div className="explora-navbar relative z-50">
        <Navbar />
      </div>

      <div className="relative">
        <ExploraAnimation />
        
        {/* Call to Action Buttons */}
        <div className="absolute bottom-24 w-full flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 z-20 px-4">
              {!user ? (
                <>
                  <Link
                    to="/new/student"
                    className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-family-givonic-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link
                    to="/student-login"
                    className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-family-givonic-bold text-lg hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/student-dashboard/me"
                  className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-family-givonic-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                >
                  <span className="relative z-10">Go to Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              )}
            </div>
      </div>

      <Footer />
    </div>
  );
}

export default Explora;

