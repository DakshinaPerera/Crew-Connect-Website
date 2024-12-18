'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProtectedRoute from '../components/ProtectedRoute';
import SearchForm from '../components/SearchForm';
import Link from 'next/link';

interface Job {
  job_id: number;
  job_title: string;
  job_description: string;
  job_type: string;
  job_industry: string;
  job_location: string;
  job_rate: string;
  company_name: string;
  company_number: string;
  company_email: string;
  job_status: string;
}

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (searchData: {
    keywords: string;
    location: string;
    jobType: string;
    jobIndustry: string;
  }) => {
    console.log(searchData);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        // Sort jobs by job_id in descending order
        const sortedJobs = data.sort((a: Job, b: Job) => b.job_id - a.job_id);
        setJobs(sortedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId: number) => {
    try {
      const response = await fetch(`/api/jobs/admin/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setJobs(jobs.filter(job => job.job_id !== jobId));
    } catch (err) {
      console.log(err)
      setError(err instanceof Error ? err.message : 'Failed to delete job');
    }
  };

  const handleStatusToggle = async (jobId: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

      
      // Make sure the URL matches your API route structure
      const response = await fetch(`/api/jobs/admin/status/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }
  
      console.log('Jobs before update:', jobs);
      setJobs(jobs.map(job => 
        job.job_id === jobId 
          ? { ...job, job_status: newStatus }
          : job
      ));
      console.log('Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  if (error) console.log(error);

  return (
    <ProtectedRoute>
      {loading && <LoadingSpinner />}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-[60px] border border-white mb-8"></div>
        <div className="text-3xl font-bold mb-4 ml-[4rem]">Admin Page</div>
        <div className="flex justify-between items-center mb-6 mr-[3rem]">
          <div></div>
          <Link
            href="/adminpost"
            className="bg-primary text-white text-lg font-semibold px-6 py-2 rounded hover:bg-[#112a45]">
            Add Job
          </Link>
        </div>

        <div className="flex items-center justify-center p-4">
          <SearchForm onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: Job) => (
            <div
              key={job.job_id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">{job.job_title}</h2>
                <button
                  onClick={() => handleStatusToggle(job.job_id, job.job_status)}
                  className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-300 ${
                    job.job_status === 'Active'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {job.job_status}
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 font-semibold">{job.company_name}</p>
                <p className="text-gray-500">{job.job_location}</p>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">{job.job_description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="font-medium">Type:</span> {job.job_type}
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="font-medium">Industry:</span> {job.job_industry}
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Salary:</span> ${Number(job.job_rate).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <span className="font-medium">Contact:</span> {job.company_email}
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/admineditpost/${job.job_id}`}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 text-center"
                  >
                    Edit Post
                  </Link>
                  <button
                    onClick={() => handleDelete(job.job_id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}