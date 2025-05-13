import React from "react";
import { 
  MapPin, Phone, Clock, Mail, 
  Facebook, Twitter, Linkedin, Instagram ,
  YoutubeIcon,
  Youtube
} from "lucide-react";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

const ContactUs = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with Our Team</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Details</h2>
        <p className="text-gray-600 mb-8">
          Feel free to reach out to us through any of the following channels. We're always here to help!
        </p>

        <div className="space-y-6">
          <ContactItem icon={MapPin} title="Address" text="361, near Ahirwan police station, Akash Ganga Vihar Colony, Kanpur Nagar, UP-208007" />
          <ContactItem icon={Phone} title="Mobile" text="+91 6307616741" />
          <ContactItem icon={Mail} title="Email" text="sangillence@gmail.com" />
        </div>

        {/* Social Media */}
        <div className="mt-12">
          <h3 className="font-semibold text-gray-900 mb-4">Social Media:</h3>
          <div className="flex space-x-4">
            <Link to="https://www.linkedin.com/in/sangillence-academy-810258342/" className="text-gray-600 hover:text-blue-400">
            <Linkedin className="w-6 h-6" />
            </Link>
            <Link to="https://www.instagram.com/p/DDm4CykhfLk/" className="text-gray-600 hover:text-pink-400">
            <Instagram className="w-6 h-6" />
            </Link>
            <Link to="https://www.youtube.com/@sangillenceacademy" className="text-gray-600 hover:text-red-800">
            <Youtube className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Contact Item Component
const ContactItem = ({ icon: Icon, title, text }) => (
  <div className="flex items-start space-x-4">
    <Icon className="w-6 h-6 text-gray-900 mt-1" />
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);


export default ContactUs;
