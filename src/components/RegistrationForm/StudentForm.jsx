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
    name: '',
    class: '',
    mobile: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    class: '',
    mobile: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      class: '',
      mobile: '',
      email: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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
          id="name"
          label="Full Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          error={errors.name}
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
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 ${
            isLoading
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
