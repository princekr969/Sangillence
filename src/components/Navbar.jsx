import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import sangillenceLogo from './../../assets/sangillenceLogo.png';

const Navbar = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="mb-4">
      <header className="relative font-family-givonic-bold z-50 pt-3">
        <div className="flex justify-between h-16 items-center px-4 sm:px-6 md:px-16">
          {/* Logo */}
          <Link to={"/"} className='flex items-center space-x-2'>
          <div className="h-16 w-12 lg:w-16 rounded-lg flex items-center justify-center">
              <img src={sangillenceLogo} className="h-full w-full object-contain" />
          </div>
              <span className="text-4xl font-family-givonic-bold tracking-wide bg-gradient-to-r from-slate-900 via-[#203A43] to-[#2C5364] bg-clip-text text-transparent font-bold">Sangillence</span>
          </Link>
          

          {/* Desktop Navigation */}
          <nav className="hidden  md:flex space-x-2 text-gray-700 font-medium">
            <NavLink to="/home" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} hover:text-white hover:bg-[#1e3366] rounded-4xl px-3 py-2 transition-colors`}>
                  Home
              </NavLink>
              <NavLink to="/mentorship" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                  Mentorship
              </NavLink>
              <NavLink to="/olympiad" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                  Olympiad
              </NavLink>
              <NavLink to="/contactUs" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                  Contact
              </NavLink>
              <NavLink to="/about" className={({isActive}) => `${isActive? "text-white bg-[#1e3366]":"bg-transparent text-gray-700"} rounded-4xl px-3 py-2 hover:text-white hover:bg-[#1e3366] transition-colors`}>
                  About
              </NavLink>
              
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 z-50 border-t-0 border-2 rounded-b-2xl border-white/80 bg-[#1e3366]/60 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col space-y-1 p-4">
              <NavLink to="/home" className={({isActive}) => `${isActive?'bg-[#0a2972]':'bg-transparent'} hover:bg-[#0a2972] text-slate-50 rounded-2xl px-4 py-2 font-medium transition-colors`}>
              Home
              </NavLink>
              <NavLink to="/olympiad" className={({isActive}) => `${isActive?'bg-[#0a2972]':'bg-transparent'} hover:bg-[#0a2972] text-slate-50 rounded-2xl px-4 py-2 font-medium transition-colors`}>
              Olympiad
              </NavLink>
              <NavLink to="/contactUs" className={({isActive}) => `${isActive?'bg-[#0a2972]':'bg-transparent'} hover:bg-[#0a2972] text-slate-50 rounded-2xl px-4 py-2 font-medium transition-colors`}>
              Contact
              </NavLink>
              <NavLink to="/about" className={({isActive}) => `${isActive?'bg-[#0a2972]':'bg-transparent'} hover:bg-[#0a2972] text-slate-50 rounded-2xl px-4 py-2 font-medium transition-colors`}>
              About
              </NavLink>
            </nav>
          </div>
        )}
      </header>

    </nav>
  );
};

export default Navbar;
