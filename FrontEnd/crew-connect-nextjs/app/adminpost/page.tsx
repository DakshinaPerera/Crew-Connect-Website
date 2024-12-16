'use client';
import React, { useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute';

const page = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobIndustry: '',
    jobType: '',
    location: '',
    salaryRange: '',
    jobDescription: ''
  })

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <ProtectedRoute>
      <main>
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
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (Eg: Melbourne, VIC)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary Range  (Eg: $30 - $35 per hour)
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
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
      </main>
    </ProtectedRoute>
  )
}

export default page