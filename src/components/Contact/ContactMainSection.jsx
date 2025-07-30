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

function ContactDetails() {
  return (
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
              <ContactItem 
                icon={Phone} 
                title="Mobile" 
                text="+91-6307616741" 
              />
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
                    to="https://www.youtube.com/@SangillenceAcademy"
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
  );
}

export default ContactDetails;
