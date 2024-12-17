'use client';

import React, { useState } from 'react'

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    residentialStatus: '',
    passportDocument: null as File | null,
    visaGrantNotice: null as File | null,
    preferredIndustry: '',
    preferredJobs: '',
    resume: null as File | null
  })

  const [errors, setErrors] = useState<{
    firstName?: string,
    lastName?: string,
    email?: string,
    mobileNumber?: string,
    address?: string,
    preferredIndustry?: string,
    preferredJobs?: string,
    passportDocument?: string,
    visaGrantNotice?: string,
    resume?: string
  }>({})

  // Sanitization helpers
  const sanitizeInput = (input: string): string => {
    // Remove any HTML tags and trim whitespace
    return input.replace(/<[^>]*>/g, '').trim();
  }

  const validateFileSize = (file: File, maxSizeMB: number = 2): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024; // 2MB in bytes
    return file.size <= maxSizeBytes;
  }

  const validateMobileNumber = (number: string): boolean => {
    // Regex for international mobile number formats
    // Allows: +1234567890, 1234567890, (123) 456-7890
    const mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return mobileRegex.test(number);
  }

  const validateEmail = (email: string): boolean => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'passportDocument' | 'visaGrantNotice' | 'resume') => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check for file size
    if (!validateFileSize(file)) {
      setErrors(prev => ({
        ...prev,
        [fileType]: `File size must not exceed 2MB. Oversized file: ${file.name}`
      }));
      e.target.value = ''; // Clear the file input
      return;
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [fileType]: file
    }));

    // Clear any previous errors for this file type
    setErrors(prev => ({
      ...prev,
      [fileType]: undefined
    }));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);

    setFormData(prevState => ({
      ...prevState,
      [name]: sanitizedValue
    }));

    // Validate mobile number
    if (name === 'mobileNumber') {
      if (!validateMobileNumber(sanitizedValue)) {
        setErrors(prev => ({
          ...prev,
          mobileNumber: 'Please enter a valid mobile number'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          mobileNumber: undefined
        }));
      }
    }

    // Validate email
    if (name === 'email') {
      if (!validateEmail(sanitizedValue)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          email: undefined
        }));
      }
    }

    // Reset file-related states when residential status changes
    if (name === 'residentialStatus') {
      setFormData(prevState => ({
        ...prevState,
        passportDocument: null,
        visaGrantNotice: null
      }));
      setErrors(prevErrors => ({
        ...prevErrors,
        passportDocument: undefined,
        visaGrantNotice: undefined
      }));
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation checks
    const submissionErrors: typeof errors = {};

    // Validate firstName and lastName (no numbers or special characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.firstName)) {
      submissionErrors.firstName = 'First name should only contain letters';
    }
    if (!nameRegex.test(formData.lastName)) {
      submissionErrors.lastName = 'Last name should only contain letters';
    }

    // Validate mobile number
    if (!validateMobileNumber(formData.mobileNumber)) {
      submissionErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      submissionErrors.email = 'Please enter a valid email address';
    }

    // Check passport and visa documents for non-residents
    if (formData.residentialStatus === 'non-resident') {
      if (!formData.passportDocument) {
        submissionErrors.passportDocument = 'Please upload your passport document';
      }
      if (!formData.visaGrantNotice) {
        submissionErrors.visaGrantNotice = 'Please upload your visa grant notice';
      }
    }

    // Check resume
    if (!formData.resume) {
      submissionErrors.resume = 'Please upload your resume';
    }

    // If there are errors, update state and prevent submission
    if (Object.keys(submissionErrors).length > 0) {
      setErrors(submissionErrors);
      return;
    }

    // Proceed with form submission
    console.log(formData);
    // Add your actual submission logic here
  }

  return (
    <main>
      <div className="bg-primary flex flex-col lg:flex-row mt-[60px] px-8 items-center justify-between relative overflow-hidden">
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          <div className="bg-[#D9D9D9] rounded-lg p-8 w-full max-w-2xl shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Register to CrewConnect
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+1 (123) 456-7890"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Residential Status
                  </label>
                  <select
                    name="residentialStatus"
                    value={formData.residentialStatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="resident">Resident</option>
                    <option value="non-resident">Non-Resident</option>
                  </select>
                </div>
              </div>

              {/* Conditionally render non-resident document uploads */}
              {formData.residentialStatus === 'non-resident' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passport Document
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'passportDocument')}
                      className="w-full p-1.5 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {errors.passportDocument && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.passportDocument}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visa Grant Notice
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'visaGrantNotice')}
                      className="w-full p-1.5 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {errors.visaGrantNotice && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.visaGrantNotice}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Job Industry to work
                  </label>
                  <input
                    type="text"
                    name="preferredIndustry"
                    value={formData.preferredIndustry}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Jobs
                  </label>
                  <input
                    type="text"
                    name="preferredJobs"
                    value={formData.preferredJobs}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload your resume. (.docx, .pdf, .doc, .jpg formats only) (Size : max 2 MB)
                </label>
                <input
                  type="file"
                  accept=".docx,.pdf,.doc,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'resume')}
                  className="w-full p-1.5 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.resume}
                  </p>
                )}
              </div>

              <div className="flex justify-center mt-8 pt-4">
                <button
                  type="submit"
                  className="bg-[#0a192f] text-white px-6 py-4 rounded hover:bg-[#112a45] transition-colors duration-300"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-[0px] border border-white"></div>
    </main>
  )
}

export default Page