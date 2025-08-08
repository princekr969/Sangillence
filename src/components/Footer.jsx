import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white py-8 overflow-hidden">
      {/* Background with geometric shapes */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 via-slate-900 to-indigo-900"></div>
        
        {/* Geometric overlays */}
        <div className="absolute inset-0">
          {/* Large angular shapes */}
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Blue angular shape - top left */}
            <div 
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-600/20 to-transparent"
              style={{
                clipPath: 'polygon(0 0, 60% 0, 20% 100%, 0 100%)'
              }}
            ></div>
            
            {/* Orange/amber angular shape - top right */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-amber-500/15 to-transparent"
              style={{
                clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 80% 100%)'
              }}
            ></div>
            
            {/* Teal angular shape - bottom left */}
            <div 
              className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-teal-500/15 to-transparent"
              style={{
                clipPath: 'polygon(0 0, 70% 0, 0 100%)'
              }}
            ></div>
            
            {/* Purple angular shape - bottom right */}
            <div 
              className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-purple-600/20 to-transparent"
              style={{
                clipPath: 'polygon(30% 0, 100% 0, 100% 100%)'
              }}
            ></div>
          </div>
          
          {/* Additional layered geometric elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rotate-45 blur-sm"
            ></div>
            <div 
              className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-amber-500/10 -rotate-12 blur-sm"
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
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="container pr-4 flex flex-col md:flex-row justify-between items-start gap-8">
          
          <div className="space-y-4 ml-5">
            <h2 className="text-xl font-bold">Contact Us</h2>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-white" />
               <p>Contact: +91 6307616741</p>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-white mt-1" />
              <p>ABV-IIITM, Morena Link Road, Gwalior, Madhya Pradesh, India-474015</p>
            </div>
          </div>
          
          <div className="space-y-4 ml-5">
            <h2 className="text-xl font-bold">Follow Us</h2>
            <div className="flex gap-4">
              <a href="https://www.whatsapp.com/channel/0029VbAfanC23n3f8Zn3eD3O" target="_blank" rel="noopener noreferrer" className="group hover:text-red-500 transition-colors">
                <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-green-600 text-white relative z-10' icon={faWhatsapp} />
              </a>
              <a href="https://www.linkedin.com/company/106711182/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="group hover:text-red-500 transition-colors">
                <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-blue-600 text-white relative z-10' icon={faLinkedinIn} />
              </a>
              <a href="https://www.instagram.com/sangillence/" target="_blank" rel="noopener noreferrer" className="group hover:text-red-500 transition-colors">
                <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-pink-500 text-white relative z-10' icon={faInstagram} />
              </a>
              <a href="https://www.youtube.com/@sangillenceacademy" target="_blank" rel="noopener noreferrer" className="group hover:text-red-500 transition-colors">
                <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-red-600 text-white relative z-10' icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-2 left-4 w-1 h-6 bg-gradient-to-t from-blue-500 to-transparent"></div>
      <div className="absolute bottom-2 right-4 w-1 h-6 bg-gradient-to-t from-amber-500 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </footer>
  )
}

export default Footer;