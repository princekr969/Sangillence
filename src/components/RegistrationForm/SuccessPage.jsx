import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const registrationData = location.state?.registrationData || {};

  const handleNewRegistration = () => {
    navigate('/school-registration');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Registration Successful! 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for registering your school. Your information has been successfully submitted and stored.
        </p>

        {/* Registration Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Registration Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">School Name:</span>
              <p className="text-gray-600">{registrationData.schoolName || 'N/A'}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Contact Person:</span>
              <p className="text-gray-600">{registrationData.contactPersonName || 'N/A'}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <p className="text-gray-600">{registrationData.email || 'N/A'}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Mobile:</span>
              <p className="text-gray-600">{registrationData.mobile || 'N/A'}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">School Type:</span>
              <p className="text-gray-600">{registrationData.schoolType || 'N/A'}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Board:</span>
              <p className="text-gray-600">{registrationData.board || 'N/A'}</p>
            </div>
          </div>

          {/* File Upload Status */}
          {registrationData.fileUploaded && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="text-blue-800 font-medium">Excel file uploaded successfully</span>
              </div>
              {registrationData.fileLink && (
                <a 
                  href={registrationData.fileLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-block"
                >
                  View uploaded file →
                </a>
              )}
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h3>
          <ul className="text-left text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Your registration has been recorded in our database
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Our team will review your submission within 24-48 hours
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              You will receive a confirmation email with further instructions
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              If you uploaded an Excel file, it's now accessible via the link above
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleNewRegistration}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Register Another School
          </button>
          
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Go to Home
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@sangillence.com" className="text-blue-600 hover:text-blue-800">
              support@sangillence.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 