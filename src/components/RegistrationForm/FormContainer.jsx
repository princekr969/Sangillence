import React, { useState } from 'react';
import FormToggle from './FormToggle';
import StudentForm from './StudentForm';
import SchoolForm from './SchoolForm';

const FormContainer = () => {
  const [formType, setFormType] = useState('student');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggle = (type) => {
    setFormType(type);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log('Form submitted:', formType);

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">

      <div className="relative z-10 flex py-12 justify-center px-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* Main form container with geometric styling */}
          <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 overflow-hidden">
            {/* Header with geometric background */}
            <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8">
              {/* Geometric overlay */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/20 to-transparent"
                  style={{
                    clipPath: 'polygon(60% 0, 100% 0, 100% 100%, 80% 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-amber-500/15 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 40% 0, 20% 100%, 0 100%)'
                  }}
                ></div>
              </div>
              
              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-white mb-2">Registration Form</h1>
                <p className="text-slate-300">Choose your registration type and fill out the form below</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-2 left-8 w-1 h-6 bg-gradient-to-t from-blue-500 to-transparent"></div>
              <div className="absolute bottom-2 right-8 w-1 h-6 bg-gradient-to-t from-amber-500 to-transparent"></div>
            </div>

            {/* Form content */}
            <div className="p-8">
              <FormToggle activeType={formType} onToggle={handleToggle} />
              
              <div className="mt-8">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    {/* Success state with geometric styling */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-transparent rounded-full"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Thank You!</h2>
                    <p className="text-slate-600 text-lg">
                      Your {formType} form has been submitted successfully.
                    </p>
                  </div>
                ) : (
                  <>
                    {formType === 'student' ? (
                      <StudentForm onSubmit={handleSubmit} />
                    ) : (
                      <SchoolForm onSubmit={handleSubmit} />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Bottom decorative accent */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-teal-500 to-amber-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FormContainer;
