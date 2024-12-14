'use client';
import React, { useState } from 'react'

const page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    jobIndustry: '',
    jobType: '',
    jobLocation: '',
    salary: '',
    jobDescription: ''
  })

  const [errors, setErrors] = useState({
    phoneNumber: ''
  })

  const validatePhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleanedPhone = phone.replace(/\D/g, '')
    
    // Check if the cleaned phone number is between 10-15 digits
    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      return 'Please enter a valid phone number'
    }
    
    return ''
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    
    // Validate phone number
    const phoneError = validatePhoneNumber(formData.phoneNumber)
    
    if (phoneError) {
      setErrors(prev => ({
        ...prev,
        phoneNumber: phoneError
      }))
      return
    }

    // Clear any previous errors
    setErrors({
      phoneNumber: ''
    })

    // Handle form submission logic here
    console.log('Form submitted', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))

    // Clear error when user starts typing
    if (name === 'phoneNumber') {
      setErrors(prev => ({
        ...prev,
        phoneNumber: ''
      }))
    }
  }

  return (
    <main>
      <div className="bg-primary flex flex-col lg:flex-row mt-[60px] px-8 items-center justify-between relative overflow-hidden">
        
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-100 rounded-lg p-8 w-full max-w-2xl shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
               Get started with Crew Connect
               <p className="text-sm font-semibold text-gray-800 pt-5 text-center">Create descriptive job selections and attract your ideal work force with each post!</p>
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-400'} rounded focus:outline-none focus:ring-2 ${errors.phoneNumber ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  required
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Industry (Eg: Logistics, Warehousing, etc.)
                </label>
                <input
                  type="text"
                  name="jobIndustry"
                  value={formData.jobIndustry}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type (Eg: Part time)
                </label>
                <input
                  type="text"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Location (Eg: Melbourne, VIC)
                </label>
                <input
                  type="text"
                  name="jobLocation"
                  value={formData.jobLocation}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary (Eg: $30 - $35 per hour)
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  required
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[#0a192f] text-white px-6 py-2 rounded hover:bg-[#112a45] transition-colors duration-300"
                >
                  Post Your Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page