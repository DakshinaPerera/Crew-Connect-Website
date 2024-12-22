'use client';
import React, { useState } from 'react'
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import Image from 'next/image';
import BackArrow from '/public/images/back_arrow.png';


const Page = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/jobs/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage('Job posted successfully!');
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
        throw new Error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      setError(error instanceof Error ? error.message : 'Failed to post job');
    }
  }

  return (
    <ProtectedRoute>
      <div className="bg-primary flex flex-col lg:flex-row mt-[60px] px-8 items-center justify-between relative overflow-hidden">
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-100 rounded-lg p-8 w-full max-w-2xl shadow-lg relative">
            {/* Back to Admin Button - Desktop Version */}
            <Link
              href="/admin"
              className="absolute top-8 left-4 hidden md:flex items-center bg-primary text-white px-3 py-1 rounded-full hover:bg-[#112a45] transition-colors duration-300 shadow-sm text-sm"
            >
              <Image
                src={BackArrow}
                alt="Back"
                width={24}
                height={24}
                className="mr-1.5"
              />
              Back to Admin
            </Link>

            {/* Mobile Version - Only Arrow */}
            <Link
              href="/admin"
              className="absolute top-4 left-4 md:hidden p-2 bg-primary rounded-full hover:bg-[#112a45] transition-colors duration-300 shadow-sm"
            >
              <Image
                src={BackArrow}
                alt="Back"
                width={24}
                height={24}
              />
            </Link>

            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Upload a Job
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
                  maxLength={12}
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
                  Job Type
                </label>
                <select
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
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

              <div className="flex flex-col items-center mt-6 space-y-3">
                <button
                  type="submit"
                  className="bg-[#0a192f] text-white px-6 py-2 rounded hover:bg-[#112a45] transition-colors duration-300"
                >
                  Post Job
                </button>

                {successMessage && (
                  <div className="text-green-600 text-sm font-medium bg-green-50 px-4 py-2 rounded-full animate-fadeIn">
                    {successMessage}
                  </div>
                )}

                {error && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-full animate-fadeIn">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-[0px] border border-white"></div>
    </ProtectedRoute>
  )
}
export default Page