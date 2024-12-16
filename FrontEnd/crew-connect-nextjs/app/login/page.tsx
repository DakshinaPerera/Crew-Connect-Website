'use client';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'


const page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    admin_username: '',
    admin_password: ''
  });

  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4500/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        router.push('/admin');
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('An error occurred during login');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear login error when user modifies credentials
    setLoginError('');
  }

  return (
    <main>
      <div className="bg-primary flex flex-col lg:flex-row mt-[60px] px-8 items-center justify-between relative overflow-hidden">

        <div className="w-full min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-100 rounded-2xl p-8 w-full max-w-2xl shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Login to CrewConnect
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="admin_username"
                  value={formData.admin_username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="admin_password"
                  value={formData.admin_password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {loginError && (
                  <p className="text-red-500 text-md mt-2">
                    {loginError}
                  </p>
                )}
              </div>

              <div className="flex justify-center mt-6 pt-2">
                <button
                  type="submit"
                  className="bg-[#0a192f] text-white px-6 py-3 rounded hover:bg-[#112a45] transition-colors duration-300"
                >
                  Login
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