'use client';
import React, { useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute';
const page = () => {
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    job_type: '',
    job_industry: '',
    job_location: '',
    job_rate: '',
    company_name: '',
    company_number: '',
    company_email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Job posted successfully:');
        // Reset form
        setFormData({
          job_title: '',
          job_description: '',
          job_type: '',
          job_industry: '',
          job_location: '',
          job_rate: '',
          company_name: '',
          company_number: '',
          company_email: '',
        });
      } else {
        console.error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  }

  return (
  <ProtectedRoute>
      <div className="bg-primary flex flex-col lg:flex-row mt-[60px] px-8 items-center justify-between relative overflow-hidden">
        
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-100 rounded-lg p-8 w-full max-w-2xl shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Register to CrewConnect
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Email
                </label>
                <input
                  type="email"
                  name="company_email"
                  value={formData.company_email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Number
                </label>
                <input
                  type="text"
                  name="company_number"
                  value={formData.company_number}
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
                  name="job_industry"
                  value={formData.job_industry}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type (Eg: Full-Time, Part-Time)
                </label>
                <input
                  type="text"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="job_location"
                  value={formData.job_location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Rate (Annual)
                </label>
                <input
                  type="text"
                  name="job_rate"
                  value={formData.job_rate}
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
                  name="job_description"
                  value={formData.job_description}
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
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full h-[0px] border border-white"></div>
  </ProtectedRoute>
  )
}
export default page