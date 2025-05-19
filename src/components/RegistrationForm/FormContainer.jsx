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
    <div className='min-h-screen flex py-12 justify-center'>

        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">

        <FormToggle activeType={formType} onToggle={handleToggle} />

        <div className="mt-8">
            {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600">
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
    </div>
  );
};

export default FormContainer;
