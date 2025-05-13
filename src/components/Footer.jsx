import React from 'react'
import { Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-8">
    <div className="container pr-4 flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="space-y-4 ml-5">
        <h2 className="text-xl font-bold">Contact Us</h2>
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-white" />
           <p>Contact: +91 6307616741</p>
        </div>
        <div className="flex items-start gap-2">
          <MapPin size={18} className="text-white mt-1" />
          <p>Address: 361, near Ahirwan police station, Akash Ganga Vihar Colony, Kanpur Nagar, UP-208007</p>
        </div>
      </div>
      
      <div className="space-y-4 ml-5">
        <h2 className="text-xl font-bold">Follow Us</h2>
        <div className="flex gap-4">
          <Link to="https://www.youtube.com/@sangillenceacademy" className="hover:text-red-800 transition-colors">
            <Youtube size={24} />
          </Link>
          <Link to="https://www.instagram.com/p/DDm4CykhfLk/" className="hover:text-pink-400 transition-colors">
            <Instagram size={24} />
          </Link>
          <Link to="https://www.linkedin.com/in/sangillence-academy-810258342/" className="hover:text-blue-500 transition-colors">
            <Linkedin size={24} />
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
