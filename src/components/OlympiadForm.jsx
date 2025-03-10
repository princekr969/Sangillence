import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const OlympiadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    grade: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.school.trim()) newErrors.school = 'School name is required';
    if (!formData.grade) newErrors.grade = 'Grade level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form submitted:', formData);
      
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', school: '', grade: '' });
        setSubmitted(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Student Application</h2>
            {submitted ? (
              <div className="flex flex-col items-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
                <p className="text-xl font-medium text-gray-700">Application Submitted!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'phone', 'school'].map((field) => (
                  <div key={field} className="relative">
                    <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-blue-200 ${errors[field] ? 'border-red-300' : 'focus:border-blue-500'}`}
                      placeholder={`Enter your ${field}`}
                    />
                    {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
                  </div>
                ))}
                <div className="relative">
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade Level</label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:ring-blue-200"
                  >
                    <option value="">Select Grade</option>
                    {[4, 5, 6, 7 ,8, 9, 10, 11, 12].map((grade) => (
                      <option key={grade} value={grade}>{grade}th Grade</option>
                    ))}
                  </select>
                  {errors.grade && <p className="mt-1 text-sm text-red-500">{errors.grade}</p>}
                </div>
                <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" /> Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlympiadForm;
