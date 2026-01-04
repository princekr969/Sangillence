import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Award, Users, ChevronLeft, Send
} from 'lucide-react';

// --- YOUR LIVE GOOGLE SCRIPT URL ---
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3xKFP49Qxsiq2f82P9RLSMoIrqBtADpeLla9u-qBAx43BL3ThVXpXUth3mUnkNeeY/exec"

// Updated list of countries where JEE Mains is conducted
const countryData = [
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Bahrain", code: "+973" },
  { name: "Brazil", code: "+55" },
  { name: "Canada", code: "+1" },
  { name: "China", code: "+86" },
  { name: "France", code: "+33" },
  { name: "Germany", code: "+49" },
  { name: "Hong Kong", code: "+852" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Kuwait", code: "+965" },
  { name: "Malaysia", code: "+60" },
  { name: "Nepal", code: "+977" },
  { name: "Nigeria", code: "+234" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Qatar", code: "+974" },
  { name: "Russia", code: "+7" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Singapore", code: "+65" },
  { name: "South Africa", code: "+27" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Thailand", code: "+66" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Vietnam", code: "+84" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function Registration(props) {
  // --- CRASH PREVENTION LOGIC ---
  // This block automatically fixes data if the Parent passed it incorrectly
  let efficiency = props.efficiency;
  let predictedScore = props.predictedScore || props.predictedMarks; // Try both names
  let weakestLink = props.weakestLink;
  let targetMarks = props.targetMarks;

  // 1. Check if 'efficiency' is actually the huge object (Common White Screen Cause)
  if (typeof efficiency === 'object' && efficiency !== null) {
      // The parent passed the whole 'res' object into the 'efficiency' prop
      const dataObj = efficiency; 
      efficiency = dataObj.efficiency;
      predictedScore = dataObj.predictedMarks || dataObj.predictedScore;
      weakestLink = dataObj.weakestLink;
      targetMarks = dataObj.targetMarks;
  }

  // 2. Default Fallbacks to prevent "undefined" errors
  efficiency = efficiency || "0";
  predictedScore = predictedScore || "Pending";
  // -----------------------------

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const [formData, setFormData] = useState({
    country: '', 
    state: '', 
    city: '',
    name: props.initialData?.fullName || '', 
    email: props.initialData?.email || '', 
    phone: '', 
    phoneCode: '+91', 
    whatsapp: '', 
    whatsappCode: '+91',
    sameAsContact: false,
    jeeAppNo: props.initialData?.jeeApplicationNo || '', 
    currentStatus: props.initialData?.passYear || '',
  });

  // --- LOCATION LOGIC ---
  useEffect(() => {
    if (!formData.country) return;
    setStates([]); 
    setCities([]);
    const cData = countryData.find(c => c.name === formData.country);
    if(cData) setFormData(p => ({...p, phoneCode: cData.code, whatsappCode: cData.code }));
    
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ country: formData.country })
    })
    .then(res => res.json())
    .then(data => { if (!data.error) setStates(data.data.states); })
    .catch(e => console.log("State fetch error", e));
  }, [formData.country]);

  useEffect(() => {
    if (!formData.state) return;
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ country: formData.country, state: formData.state })
    })
    .then(res => res.json())
    .then(data => { if (!data.error) setCities(data.data); })
    .catch(e => console.log("City fetch error", e));
  }, [formData.state, formData.country]);

  // --- HANDLERS ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d+$/.test(phone);
  const validateJeeAppNo = (jeeAppNo) => jeeAppNo.length === 0 || (jeeAppNo.length === 12 && /^\d+$/.test(jeeAppNo));

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'sameAsContact') {
      setFormData(prev => ({ 
        ...prev, 
        sameAsContact: checked, 
        whatsapp: checked ? prev.phone : prev.whatsapp, 
        whatsappCode: checked ? prev.phoneCode : prev.whatsappCode 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) { alert("Please enter a valid email."); return; }
    if (!validatePhone(formData.phone)) { alert("Phone number must be digits."); return; }
    if (!validatePhone(formData.whatsapp)) { alert("WhatsApp number must be digits."); return; }
    if (formData.jeeAppNo && !validateJeeAppNo(formData.jeeAppNo)) { alert("JEE Application number must be 12 digits."); return; }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      efficiency: efficiency,
      predictedScore: predictedScore, 
      weakestLink: weakestLink || "N/A", 
      targetMarks: targetMarks || "N/A",
      subPhysics: "Rank 1",
      subChem: "Rank 1",
      subMath: "Rank 1"
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      props.onComplete(payload);
    } catch (error) {
      console.error("Submission Error:", error);
      props.onComplete(payload); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="relative z-10 px-2 sm:px-4">
        <div className="max-w-4xl mx-auto w-full">
          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-slate-200/50 overflow-hidden">
            
            {/* Header */}
            <div className="relative p-4 sm:p-6 md:p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-lg sm:rounded-xl">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-blue-600/30 to-transparent rounded-l-lg sm:rounded-l-xl" style={{clipPath: "polygon(0 0, 80% 0, 60% 100%, 0 100%)"}}></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-500/20 to-transparent rounded-r-lg sm:rounded-r-xl" style={{clipPath: "polygon(40% 0, 100% 0, 100% 100%, 20% 100%)"}}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-white text-2xl sm:text-3xl">JEE Predictor Challenge 2026</h1>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <p className="text-slate-300 text-sm sm:text-base">If we predicted your JEE 2026 score perfectly... You will unlock a FREE mentorship.</p>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-4 py-1">
                    <span className="text-green-300 font-bold"> Habit Score {efficiency}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            {props.onBack && (
              <div className="px-4 sm:px-6 md:px-8 pt-6">
                <button type="button" onClick={props.onBack} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200">
                  <ChevronLeft className="w-4 h-4" /> Generate Your Trajectory Again
                </button>
              </div>
            )}

            {/* Form */}
            <div className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-slate-600 text-sm sm:text-base">Enrol yourself for this challenge and get back to us after JEE Mains Session 1.</p>

                {/* Location */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-800" />
                    <h2 className="text-xl font-bold text-slate-800">Location Details <span className="text-red-500">*</span></h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                      <select name="country" value={formData.country} onChange={handleChange} required className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                        <option value="">Select Country</option>
                        {countryData.map(c => (<option key={c.name} value={c.name}>{c.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                      <select name="state" value={formData.state} onChange={handleChange} required disabled={!formData.country} className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-500">
                        <option value="">Select State</option>
                        {states.map(s => (<option key={s.name} value={s.name}>{s.name}</option>))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                    <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state} className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-500">
                      <option value="">Select City</option>
                      {cities.map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-800" />
                    <h2 className="text-xl font-bold text-slate-800">Contact Information <span className="text-red-500">*</span></h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="email" name="email" placeholder="email@example.com" required value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Phone <span className="text-red-500">*</span></label>
                    <div className="flex gap-3">
                      <select name="phoneCode" value={formData.phoneCode} onChange={handleChange} required className="w-28 px-3 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                        {countryData.map(c => (<option key={c.code} value={c.code}>{c.code}</option>))}
                      </select>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="tel" name="phone" placeholder="10-digit number" required value={formData.phone} onChange={handleChange} maxLength="10" className="block w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp <span className="text-red-500">*</span></label>
                    <div className="flex gap-3">
                      <select name="whatsappCode" value={formData.whatsappCode} onChange={handleChange} required className="w-28 px-3 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                        {countryData.map(c => (<option key={c.code} value={c.code}>{c.code}</option>))}
                      </select>
                      <div className="flex-1 relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="tel" name="whatsapp" placeholder="10-digit number" required value={formData.whatsapp} onChange={handleChange} maxLength="10" className="block w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" name="sameAsContact" checked={formData.sameAsContact} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
                        <span className="text-sm text-slate-600">Same as primary phone</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Academic */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gray-800" />
                    <h2 className="text-xl font-bold text-slate-800">Academic Profile <span className="text-red-500">*</span></h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">JEE Application No. (12 digits)</label>
                      <input name="jeeAppNo" placeholder="XXXXXXXXXXXX (12 digits)" value={formData.jeeAppNo} onChange={handleChange} maxLength="12" className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Status <span className="text-red-500">*</span></label>
                      <select name="currentStatus" required value={formData.currentStatus} onChange={handleChange} className="block w-full px-4 py-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                        <option value="">Select Status</option>
                        <option value="12th">Class 12th</option>
                        <option value="dropper">Dropper</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button type="submit" disabled={isSubmitting} className="group relative w-full py-4 px-6 font-semibold rounded-lg shadow-lg transition-all duration-300 transform overflow-hidden bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                    {!isSubmitting && <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Submitting...</>) : (<><Send className="w-5 h-5" />Submit Application</>)}
                    </span>
                    {!isSubmitting && <><div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div><div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div></>}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">By submitting, you agree to receive mentorship-related communications</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}