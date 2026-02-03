import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Phone, Mail} from 'lucide-react';

function ContactItem({ icon: Icon, title, text }) {
  return (
    <div className="relative group">
      {/* Background with geometric accent */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-transparent to-amber-500/10 rounded-lg opacity-0"></div>
      
      <div className="relative flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-slate-50/50 to-slate-100/30 backdrop-blur-sm border border-slate-200/50">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-family-givonic-semiBold font-semibold tracking-wider text-slate-900 mb-1">{title}</h3>
          <p className="text-slate-600 font-family-givonic-regular break-words">{text}</p>
        </div>
      </div>
    </div>
  );
}

const ContactUs = () => (
  <div className="cursor-default">
    
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
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 lg:px-8">
        {/* Main heading */}
        <h1 className="text-3xl font-family-givonic-bold lg:text-5xl font-bold text-white tracking-wider text-center">
          CONTACT DETAILS
        </h1>
        <p className="text-slate-300 font-family-givonic-regular">
            Feel free to reach out to us through any of the following channels. We're always here to help!
        </p>
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
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:px-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">

          {/* Contact information */}
          <div className="p-8">
            <div className="space-y-6 mb-12">
              <ContactItem 
                icon={MapPin} 
                title="Address" 
                text="Abv-iiitm, Morena Link Road, Gwalior, Madhya Pradesh, India-474015"
              />
              {/* <ContactItem 
                icon={Phone} 
                title="Mobile" 
                text="+91-6307616741" 
              /> */}
              <ContactItem 
                icon={Mail} 
                title="Email" 
                text="sangillence@gmail.com" 
              />
            </div>

            {/* Social Media Section */}
            <div className="relative">
              {/* Section divider with geometric accent */}
              <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                <div className="px-6">
                  <h3 className="font-family-givonic-bold font-bold text-slate-900 text-lg">Social Media</h3>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              </div>

              <div className="flex justify-center space-x-6">
                
                <Link 
                    to="https://www.whatsapp.com/channel/0029VbAfanC23n3f8Zn3eD3O"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon size='2x' className='group-hover:text-green-600 text-white relative z-10' icon={faWhatsapp} />
                </Link>
                <Link 
                    to="https://www.linkedin.com/company/106711182/admin/dashboard/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-blue-600 text-white relative z-10' icon={faLinkedinIn} />
                </Link>
                <Link 
                    to="https://www.instagram.com/sangillence/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-pink-500 text-white relative z-10' icon={faInstagram} />
                </Link>
                <Link 
                    to="https://www.youtube.com/@Sangillence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    aria-label="LinkedIn"
                    >
                      <FontAwesomeIcon size='2x' className='w-8 h-8 group-hover:text-red-600 text-white relative z-10' icon={faYoutube} />
                </Link>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

export default ContactUs;
