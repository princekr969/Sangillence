import React from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, Phone, Clock, Mail, 
  Facebook, Twitter, Linkedin, Instagram ,
  YoutubeIcon,
  Youtube
} from "lucide-react";
import { ContactDetails, ContactHeader } from "../components";

const ContactUs = () => (
  <div className="cursor-default">
    <ContactHeader/>
    <ContactDetails/>
  </div>
);

export default ContactUs;
