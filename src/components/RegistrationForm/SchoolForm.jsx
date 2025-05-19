import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('School form data:', formData);
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="bg-blue-50 rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-1">School Registration</h2>
        <p className="text-sm text-blue-600">
          Please provide details about your institution.
        </p>
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

      </div>

      {/* Contact Person Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800  ">
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
      className="block w-full text-sm text-gray-700
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-blue-100
        transition-all"
      onChange={(e) => {
        const file = e.target.files[0];
        console.log('Selected Excel file:', file);
        // You can store it in state if needed, or process it further
      }}
    />
    <p className="text-xs text-gray-500">
      Accepted formats: .xls, .xlsx
    </p>
  </div>
</div>

        </div>

        
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
        >
          Submit Registration
        </button>
      </div>
    </form>
  );
};

export default SchoolForm;
