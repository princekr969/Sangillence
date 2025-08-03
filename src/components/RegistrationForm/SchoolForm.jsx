import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from './UI/FormInput';
import FormSelect from './UI/FormSelect';
import FormTextarea from './UI/FormAreaText';


const boardOptions = [
  { value: 'cbse', label: 'CBSE' },
  { value: 'icse', label: 'ICSE' },
  { value: 'state', label: 'State Board' },
  { value: 'other', label: 'Other' },
];

const SchoolForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactPersonName: '',
    designation: '',
    email: '',
    mobile: '',
    schoolType: '',
    medium: '',
    board: '',
    studentStrength: '',
    requirements: '',
  });

  const [errors, setErrors] = useState({
    schoolName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactPersonName: '',
    designation: '',
    email: '',
    mobile: '',
    schoolType: '',
    medium: '',
    board: '',
    studentStrength: '',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const requiredFields = [
      'schoolName',
      'address',
      'city',
      'state',
      'pincode',
      'contactPersonName',
      'designation',
      'email',
      'mobile',
      'schoolType',
      'board'
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
      isValid = false;
    }

    if (formData.studentStrength && isNaN(Number(formData.studentStrength))) {
      newErrors.studentStrength = 'Must be a number';
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid Excel file (.xlsx or .xls)');
        e.target.value = '';
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        e.target.value = '';
        return;
      }

      setExcelFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Form data:', formData);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      console.log('Errors:', errors);
      return;
    }

    console.log('Form validation passed, submitting...');
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
          console.log(`Adding field: ${key} = ${formData[key]}`);
        }
      });

      // Add Excel file if selected
      if (excelFile) {
        submitData.append('excelFile', excelFile);
        console.log('Adding Excel file:', excelFile.name);
      }

      console.log('Submitting to:', 'http://localhost:5001/api/school/submit');

      // Submit to backend API
      const response = await fetch('http://localhost:5001/api/school/submit', {
        method: 'POST',
        body: submitData,
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        // Prepare registration data for success page
        const registrationData = {
          ...formData,
          fileUploaded: result.data.fileUploaded,
          fileLink: result.data.fileLink,
          timestamp: new Date().toISOString()
        };

        // Call parent onSubmit if provided
        if (onSubmit) {
          onSubmit();
        }

        // Redirect to success page with registration data
        navigate('/registration-success', { 
          state: { registrationData } 
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit registration. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const EXCEL_TEMPLATE_URL = 'https://res.cloudinary.com/dstbd40ud/raw/upload/v1754207308/School_Registrations_Form_sykait.xlsx'; // Replace this with your Excel file link

  // Function to download Excel template from provided link
  const downloadSampleExcel = () => {
    const link = document.createElement('a');
    link.href = EXCEL_TEMPLATE_URL;
    link.target = '_blank';
    link.download = 'participant_template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      {/* Error Messages Only */}
      {submitStatus && submitStatus.type === 'error' && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
          <p className="font-medium">
            ❌ {submitStatus.message}
          </p>
        </div>
      )}

      <div className="bg-blue-50 rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-1">School Registration</h2>
        <p className="text-sm text-blue-600">
          Please provide details about your institution.
        </p>
      </div>


      {/* Excel Template Download Section */}
      <div className="mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-green-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Participant Template
              </h3>
              <p className="text-sm text-green-700 mb-3">
                Download the Excel template to see the required format for participant data. 
                Fill in your student details and upload it in the form below.
              </p>
              <div className="text-xs text-green-600 bg-green-100 rounded p-2 mb-3">
                <strong>Template includes:</strong> Student Name, Class, Section, Roll Number, Date of Birth
              </div>
            </div>
          </div>
          
          <button
            type="button"
            onClick={downloadSampleExcel}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download Template (.xlsx)
          </button>
        </div>
      </div>

      {/* School Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">
          School Information
        </h3>

        <FormInput
          id="schoolName"
          label="School Name"
          type="text"
          value={formData.schoolName}
          onChange={handleChange}
          placeholder="Enter school name"
          error={errors.schoolName}
          required
        />

        <FormTextarea
          id="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete school address"
          error={errors.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            id="city"
            label="City"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            error={errors.city}
            required
          />

          <FormInput
            id="state"
            label="State"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            error={errors.state}
            required
          />

          <FormInput
            id="pincode"
            label="Pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            error={errors.pincode}
            required
          />
        </div>
      </div>

      {/* Contact Person Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800">
          Person of Contact (POC) Details
        </h3>
        <p className="text-sm text-gray-500 pb-2 border-b mb-4">
          Name of the person whom our team will coordinate [ principal, vice-principle, teacher or staff]
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            id="contactPersonName"
            label="Name of the POC"
            type="text"
            value={formData.contactPersonName}
            onChange={handleChange}
            placeholder="Enter full name"
            error={errors.contactPersonName}
            required
          />

          <FormInput
            id="designation"
            label="Post of the POC"
            type="text"
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g., Principal, teacher, Director"
            error={errors.designation}
            required
          />

          <FormInput
            id="email"
            label="Email Address of POC"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@school.com"
            error={errors.email}
            required
          />

          <FormInput
            id="mobile"
            label="Mobile number of POC"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            error={errors.mobile}
            required
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">
          Additional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            id="schoolType"
            label="School Type"
            value={formData.schoolType}
            onChange={handleChange}
            options={[
              { value: 'government', label: 'Government' },
              { value: 'private', label: 'Private' },
              { value: 'aided', label: 'Aided' },
              { value: 'unaided', label: 'Unaided' }
            ]}
            error={errors.schoolType}
            required
          />

          <FormSelect
            id="board"
            label="Board of Education"
            value={formData.board}
            onChange={handleChange}
            options={boardOptions}
            error={errors.board}
            required
          />

          <FormInput
            id="studentStrength"
            label="Enter total number of students Enrolled from Classes 3rd -8th."
            type="number"
            value={formData.studentStrength}
            onChange={handleChange}
            placeholder="Enter approximate number"
            error={errors.studentStrength}
            required
          />
        </div>
      </div>

      {/* Participant Excel Upload Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">
          Upload Participants (Excel)
        </h3>
        <div className="flex flex-col gap-2">
          <label htmlFor="excelFile" className="text-sm font-medium text-gray-700">
            Upload Excel Sheet <span className="text-red-500">*</span>
          </label>
          <input
            id="excelFile"
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              transition-all"
          />
          <p className="text-xs text-gray-500">
            Accepted formats: .xls, .xlsx (Max size: 5MB)
          </p>
          {excelFile && (
            <p className="text-xs text-green-600">
              ✅ Selected: {excelFile.name}
            </p>
          )}
        </div>
      </div>

      <div className="relative group">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`relative w-full py-4 px-8 font-semibold rounded-lg shadow-lg transition-all duration-300 transform overflow-hidden ${
          isSubmitting
            ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
            : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white hover:shadow-xl hover:scale-[1.02]'
        }`}
      >
        {/* Geometric hover overlay - only show when not disabled */}
        {!isSubmitting && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              {/* Loading spinner */}
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              Submitting...
            </>
          ) : (
            'Submit Registration'
          )}
        </span>
        
        {/* Decorative elements - only show when not disabled */}
        {!isSubmitting && (
          <>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        )}

        {/* Loading state geometric overlay */}
        {isSubmitting && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/30 via-slate-500/20 to-slate-600/30 animate-pulse"></div>
        )}
      </button>
    </div>

    </form>
  );
};

export default SchoolForm;
