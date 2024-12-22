'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProtectedRoute from '../components/ProtectedRoute';
import SearchForm from '../components/SearchForm';
import Link from 'next/link';
import { MdDelete } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { FaBriefcase } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";




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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [visibleJobs, setVisibleJobs] = useState(6);

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
        const response = await fetch('/api/jobs/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
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

  const handleDeleteClick = (jobId: number) => {
    setJobToDelete(jobId);
    setShowDeleteConfirm(true);
  };

  const truncateDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...';
    }
    return description;
  };

  const loadMore = () => {
    setVisibleJobs(prevVisible => prevVisible + 6);
  };

  const handleDelete = async (jobId: number) => {
    try {
      const response = await fetch(`/api/jobs/admin/${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setJobs(jobs.filter(job => job.job_id !== jobId));
      setShowDeleteConfirm(false);
      setJobToDelete(null);
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
        <div className="text-3xl font-bold mb-4 md:text-start text-center md:ml-[6rem]">Admin Page</div>
        <div className="flex md:justify-between justify-center items-center mb-6 md:mr-[6rem]">
          <div></div>
          <Link
            href="/adminpost"
            className="bg-primary text-white text-lg font-semibold px-6 py-2 rounded-xl hover:bg-[#112a45]">
            Add Job
          </Link>
        </div>

        <div className="flex items-center justify-center px-8 md:px-24  py-4">
          <SearchForm onSearch={handleSearch} />
        </div>

        {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
                    <h3 className="text-xl font-semibold text-center mb-4">Confirm Delete</h3>
                    <p className="text-gray-600 text-center mb-6">Are you sure you want to delete this job posting? This action cannot be undone.</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="px-4 py-2 text-black hover:bg-gray-300 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => jobToDelete && handleDelete(jobToDelete)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-col px-8 md:px-24 space-y-4">
          {jobs.slice(0, visibleJobs).map((job: Job) => (
            <div
              key={job.job_id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex justify-between  items-start">
                <div className="flex-grow pr-4">
                  <div className="flex-col justify-between items-center mb-2">
                    <h2 className="text-3xl font-bold text-secondary">{job.job_title}</h2>
                    <h2 className="text-base font-medium text-secondary">{job.company_name}</h2>
                  </div>
                  <p className="text-gray-700 text-normal max-w-[70rem]  md:text-xl mb-4">
                    {truncateDescription(job.job_description)}
                  </p>
                  <div className="flex flex-wrap  md:justify-between gap-4 pb-4 md:pb-0 text-sm md:text-xl text-gray-600 mb-2">
                    <span className="flex items-center  ">
                      <BiCategoryAlt className='mr-2 md:text-2xl text-secondary' />
                      {job.job_industry}
                    </span>
                    <span className="flex items-center">
                      <ImLocation className='mr-2 md:text-2xl text-secondary' />
                      {job.job_location}
                    </span>
                    <span className="flex items-center">
                       <FaBriefcase className='mr-2 md:text-2xl text-secondary' />
                      {job.job_type}
                    </span>
                    <span className="flex items-center">
                      <FaClockRotateLeft className='mr-2 md:text-2xl text-secondary' />
                      ${job.job_rate} Annual
                    </span>
                  </div>
                </div>
                  <div className="flex-row md:flex-col px-2 flex justify-between items-center">
                    <div className="flex pb-4">
                      <button
                        onClick={() => handleStatusToggle(job.job_id, job.job_status)}
                        className={`py-2 px-6 rounded text-base cursor-pointer transition-colors duration-300 ${
                          job.job_status === 'Active'
                            ? 'bg-green-800 text-green-100 hover:bg-green-600'
                            : 'bg-red-800 text-red-100 hover:bg-red-600'
                        }`}
                      >
                        {job.job_status}
                      </button>
                    </div>
                    <div className="flex pl-2 md:pl-0 pb-4">
                      <Link
                        href={`/admineditpost/${job.job_id}`}
                        className="bg-primary text-white py-2 px-4 rounded hover:bg-[#112a45] transition-colors duration-300 text-center"
                      >
                        Edit Post
                      </Link>
                    </div>  
                    <div className="flex md:pt-6 pb-4">
                      <button
                          onClick={() => handleDeleteClick(job.job_id)}
                          className="bg-white text-red-500 px-4 rounded hover:text-red-600 transition-colors duration-300">
                          <MdDelete className='h-10 text-4xl' />
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
        {jobs.length > visibleJobs && (
          <div className="text-center mt-6">
            <button 
              onClick={loadMore}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}