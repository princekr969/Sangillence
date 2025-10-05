import React, { useState } from 'react';
import FormInput from './UI/FormInput';
import FormSelect from './UI/FormSelect';
import { div } from 'framer-motion/client';

const classOptions = [
  { value: '3', label: 'Class 3' },
  { value: '4', label: 'Class 4' },
  { value: '5', label: 'Class 5' },
  { value: '6', label: 'Class 6' },
  { value: '7', label: 'Class 7' },
  { value: '8', label: 'Class 8' },
  { value: '9', label: 'Class 9' },
  { value: '10', label: 'Class 10' }
];

const StudentLoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    class: '',
    dob: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    class: '',
    dob: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      class: '',
      dob: '',
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }

    if (!formData.class) {
      newErrors.class = 'Class is required';
      isValid = false;
    }


    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    setSubmitError('');
    
    if (validateForm()) {
      setIsLoading(true);
      console.log('Student form data:', formData);
      
      try {
        const response = await fetch('http://localhost:5000/api/students/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Student registration successful:', result);
          if (onSubmit) onSubmit();
        } else {
          console.error('Student registration failed:', result);
          setSubmitError(result.message || 'Failed to submit registration. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting student form:', error);
        setSubmitError('Network error. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 px-4">
        <div className="max-w-4xl mx-auto w-full">
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
                <h1 className="text-3xl font-bold text-white mb-2">Login Form</h1>
                <p className="text-slate-300">Enter your Name, Class and DOB for login</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-2 left-8 w-1 h-6 bg-gradient-to-t from-blue-500 to-transparent"></div>
              <div className="absolute bottom-2 right-8 w-1 h-6 bg-gradient-to-t from-amber-500 to-transparent"></div>
            </div>
            <div className='p-8'>
              
              <form onSubmit={handleSubmit} className="animate-fade-in">

                {submitError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {submitError}
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <FormInput
                    id="fullName"
                    label="Full Name"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    error={errors.fullName}
                    required
                  />

                  <FormSelect
                    id="class"
                    label="Class"
                    value={formData.class}
                    onChange={handleChange}
                    options={classOptions}
                    error={errors.class}
                    required
                  />

                  <FormInput
                      id="dob"
                      label="DOB"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      error={errors.dob}
                      required
                    />

                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
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
};

export default StudentLoginForm;
