import React, { useState } from 'react';
import FormInput from './UI/FormInput';
import FormSelect from './UI/FormSelect';

const classOptions = [
  { value: '3', label: 'Class 3' },
  { value: '4', label: 'Class 4' },
  { value: '5', label: 'Class 5' },
  { value: '6', label: 'Class 6' },
  { value: '7', label: 'Class 7' },
  { value: '8', label: 'Class 8' },
];

const StudentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    class: '',
    mobile: '',
    email: '',
    dob:'',
    schoolEmail:''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    class: '',
    mobile: '',
    email: '',
    dob: '',
    schoolEmail:''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: '',
      class: '',
      mobile: '',
      email: '',
      dob: '',
      schoolEmail:''
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }

    if (!formData.class) {
      newErrors.class = 'Class is required';
      isValid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    }

    if (!formData.schoolEmail.trim()) {
      newErrors.schoolEmail = 'School email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) {
      newErrors.schoolEmail = 'Please enter a valid email address';
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
        const response = await fetch('http://localhost:5001/api/student/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Student registration successful:', result);
          onSubmit();
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
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="bg-blue-50 rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-1">Student Information</h2>
        <p className="text-sm text-blue-600">
          Please provide your personal details below.
        </p>
      </div>

      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <FormInput
          id="mobile"
          label="Mobile Number"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          error={errors.mobile}
          required
        />

        <FormInput
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          error={errors.email}
          required
        />

        <FormInput
          id="schoolEmail"
          label="School Email Address"
          type="email"
          value={formData.schoolEmail}
          onChange={handleChange}
          placeholder="school@email.com"
          error={errors.schoolEmail}
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
  );
};

export default StudentForm;
