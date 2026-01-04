import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios";

function JeePredictionForm({onComplete}) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    jeeApplicationNo: "",
    passYear: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Generate pass year options (from 2010 to current year + 1)
  const passYearOptions = ['Dropper', 'Class 12th'];

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validateForm() {
    const newErrors = {};
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // JEE Application Number validation (optional)
    const appNoRegex = /^\d{12}$/; 
    if (formData.jeeApplicationNo && !appNoRegex.test(formData.jeeApplicationNo)) {
      newErrors.jeeApplicationNo = "Application number must contain 12 digits";
    }

    // Pass Year validation
    if (!formData.passYear) {
      newErrors.passYear = "12th pass year is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Prepare data for submission
    const submitData = {
      ...formData,
      fullName: formData.fullName.toUpperCase().trim(),
      email: formData.email.toLowerCase().trim(),
      jeeApplicationNo: formData.jeeApplicationNo.trim() || undefined, // Send undefined if empty
    };

    try {
    //   console.log("Registration successful:", submitData);
        onComplete && onComplete({ ...submitData, registered: true });
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle specific error cases
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-slate-200/50 overflow-hidden bg-white">
            {/* Header with JEE-themed design */}
            <div className="relative p-4 sm:p-6 md:p-8">
              {/* Background with geometric accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-lg sm:rounded-xl">
                {/* Geometric overlays */}
                <div
                  className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-orange-500/30 to-transparent rounded-l-lg sm:rounded-l-xl"
                  style={{
                    clipPath: "polygon(0 0, 80% 0, 60% 100%, 0 100%)",
                  }}
                ></div>
                <div
                  className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/20 to-transparent rounded-r-lg sm:rounded-r-xl"
                  style={{
                    clipPath: "polygon(40% 0, 100% 0, 100% 100%, 20% 100%)",
                  }}
                ></div>
                
                {/* JEE Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white rotate-45"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-white rounded-full"></div>
                </div>
              </div>

              <div className="relative z-10">

                <img 
                src="https://res.cloudinary.com/dstbd40ud/image/upload/v1766321457/Untitled_design_5_zq2tz9.png" 
                alt="Sangillence" 
                style={{
                    height: '60px', 
                    display: 'block',             // 1. Allows margin auto to work
                    margin: '0 auto 10px auto',   // 2. Centers the image horizontally
                    filter: 'drop-shadow(0 0 15px rgba(5, 0, 0, 0.8))' // 3. Black Glow
                }} 
            />
               
                  <h1 className={`font-bold text-white mb-1 sm:mb-2 text-center ${
          isMobile ? "text-xl" : "text-2xl sm:text-3xl"
      }`}>
          JEE Trajectory Challenge 2026
      </h1>
                <p className={`text-slate-200 text-center mx-auto ${
        isMobile ? "text-xs" : "text-sm sm:text-base"
    }`}>
        Enrol now to get your JEE Trajectory - Predicted Score and Understand your preparation gaps, efficiency & skills!
    </p>
              </div>
              

              {/* Decorative elements */}
              <div className="absolute bottom-2 left-4 sm:left-8 w-1 h-4 sm:h-6 bg-gradient-to-t from-orange-500 to-transparent"></div>
              <div className="absolute bottom-2 right-4 sm:right-8 w-1 h-4 sm:h-6 bg-gradient-to-t from-green-500 to-transparent"></div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="animate-fade-in">
                <div className="flex flex-col gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-slate-300"
                      } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base`}
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                        errors.email
                          ? "border-red-500"
                          : "border-slate-300"
                      } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base`}
                      placeholder="Enter your email address"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* JEE Application Number (Optional) */}
                  <div>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <label
                        htmlFor="jeeApplicationNo"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        JEE Application Number
                      </label>
                      <span className="text-xs text-slate-500">Optional</span>
                    </div>
                    <input
                      id="jeeApplicationNo"
                      name="jeeApplicationNo"
                      type="text"
                      value={formData.jeeApplicationNo}
                      onChange={handleChange}
                      className={`block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                        errors.jeeApplicationNo
                          ? "border-red-500"
                          : "border-slate-300"
                      } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base`}
                      placeholder="Enter JEE application number (if available)"
                    />
                    {errors.jeeApplicationNo && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">
                        {errors.jeeApplicationNo}
                      </p>
                    )}
                  </div>

                  {/* 12th Pass Year */}
                  <div>
                    <label
                      htmlFor="passYear"
                      className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2"
                    >
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="passYear"
                      name="passYear"
                      value={formData.passYear}
                      onChange={handleChange}
                      className={`block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border ${
                        errors.passYear ? "border-red-500" : "border-slate-300"
                      } bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm sm:text-base`}
                      required
                    >
                      <option value="">Select Your Class</option>
                      {passYearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    {errors.passYear && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">
                        {errors.passYear}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-slate-500">
                      Click on "Next" to Start your JEE Preparation Analysis & Prediction for JEE 2026 Score.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="relative mt-6 sm:mt-8 group">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative w-full py-3 sm:py-4 px-6 sm:px-8 font-semibold rounded-lg shadow-lg transition-all duration-300 transform overflow-hidden ${
                      isLoading
                        ? "bg-slate-400 text-slate-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-xl sm:hover:scale-[1.02]"
                    } text-sm sm:text-base`}
                  >
                    {/* Geometric hover overlay */}
                    {!isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          {isMobile ? "Registering..." : "Registering..."}
                        </>
                      ) : (
                        <>
                          <span>Next</span>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </>
                      )}
                    </span>

                    {/* Decorative elements */}
                    {!isLoading && (
                      <>
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    )}

                    {/* Loading state overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 via-slate-500/20 to-slate-600/30 animate-pulse"></div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default JeePredictionForm;