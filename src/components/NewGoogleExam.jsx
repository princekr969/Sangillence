import React, { useState } from 'react';

const FreshStudentsFormPage = () => {
  const [showIframe, setShowIframe] = useState(false);

  const handleOpenForm = () => {
    // Try to open in a new tab first
    const newWindow = window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSebmXGvXrtWkGDVjY74QUSy_GJLtxPtsL5i5FWYwZt4Oz-X5Q/viewform?usp=sf_link',
      '_blank',
      'noopener,noreferrer'
    );
    
    // If popup was blocked, show iframe as fallback
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setShowIframe(true);
    }
  };

  if (showIframe) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full h-screen relative">
          <button
            onClick={() => setShowIframe(false)}
            className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Close
          </button>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSebmXGvXrtWkGDVjY74QUSy_GJLtxPtsL5i5FWYwZt4Oz-X5Q/viewform?embedded=true"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Fresh Student Exam Link"
            className="w-full h-full"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          >
            Loading...
          </iframe>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Fresh Student Exam</h1>
          <p className="text-lg text-gray-600 mb-8">
            Click the button below to access the exam form. The form will open in a new tab for the best experience.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleOpenForm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Open Exam Form
          </button>
          
          <button
            onClick={() => setShowIframe(true)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Open in This Page (Fallback)
          </button>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> If the exam form doesn't open in a new tab, try the fallback option or check if your browser is blocking popups.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreshStudentsFormPage;