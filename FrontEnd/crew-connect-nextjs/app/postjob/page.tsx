'use client';
import Script from 'next/script';
import React, { useState, useEffect } from 'react'
import Toast from '../components/Toast';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const page = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
  });
  const [toastState, setToastState] = useState<{
    message: string;
    isVisible: boolean;
    type: 'loading' | 'success' | 'error';
  }>({
    message: '',
    isVisible: false,
    type: 'loading'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    phoneNumber: ''
  });

  const validatePhoneNumber = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  useEffect(() => {
    // Load reCAPTCHA script
    const loadReCaptcha = async () => {
      if (typeof window.grecaptcha === 'undefined') {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };
    loadReCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);
    setError(null);

    // Show loading toast
    setToastState({
      message: 'Posting job...',
      isVisible: true,
      type: 'loading'
    });

    const phoneError = validatePhoneNumber(formData.phoneNumber);

    if (phoneError) {
      setFieldErrors(prev => ({
        ...prev,
        phoneNumber: phoneError
      }));
      return;
    }

    setFieldErrors({
      phoneNumber: ''
    });

    try {
      setIsSubmitting(true);

      // Execute reCAPTCHA and get token
      const token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY, {
        action: 'post_job'
      });
      setToastState({
        message: 'Submitting your job posting...',
        isVisible: true,
        type: 'loading'
      });

      const response = await fetch('/api/employer/postjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSuccessMessage(data.message || 'Failed to post job');
        setToastState({
          message: data.message || 'Failed to post job',
          isVisible: true,
          type: 'error'
        });
      }

      // Reset form
      setFormData({
        fullName: '',
        workEmail: '',
        phoneNumber: '',
        companyName: '',
        jobIndustry: '',
        jobType: '',
        jobLocation: '',
        salary: '',
        jobDescription: ''
      });

      setSuccessMessage(data.message || 'Job posted successfully!');
      setToastState({
        message: 'Job posted successfully!',
        isVisible: true,
        type: 'success'
      });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to post job. Please try again.';
      setToastState({
        message: errorMessage,
        isVisible: true,
        type: 'error'
      });
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))

    // Clear error when user starts typing
    if (name === 'phoneNumber') {
      setFieldErrors(prev => ({
        ...prev,
        phoneNumber: ''
      }))
    }

    setToastState(prev => ({ ...prev, isVisible: false }));
  }

  return (
    <main>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}`} />
      <Toast 
      message={toastState.message}
      isVisible={toastState.isVisible}
      type={toastState.type}
      onClose={() => setToastState(prev => ({ ...prev, isVisible: false }))}
    />
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
                  className={`w-full p-2 border ${fieldErrors.phoneNumber ? 'border-red-500' : 'border-gray-400'} rounded focus:outline-none focus:ring-2 ${fieldErrors.phoneNumber ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                  required
                  placeholder="Enter your phone number"
                />
                {fieldErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.phoneNumber}</p>
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
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a job type</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Contract/Temp">Contract/Temp</option>
                  <option value="Casual/Vacation">Casual/Vacation</option>
                </select>
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

              <div className="flex flex-col items-center mt-6 space-y-3">
                <button
                  type="submit"
                  className="bg-[#0a192f] text-white px-6 py-2 rounded hover:bg-[#112a45] transition-colors duration-300"
                >
                  Post Your Job
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
    </main>
  )
}

export default page