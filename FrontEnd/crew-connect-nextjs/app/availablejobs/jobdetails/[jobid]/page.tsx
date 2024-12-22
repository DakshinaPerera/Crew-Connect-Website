'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
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

const JobPostPage = () => {
  const params = useParams();
  const jobId = params.jobid;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchJob = async () => {
        try {
        const response = await fetch('/api/jobs/jobseeker');
        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        const foundJob = data.find((job: Job) => job.job_id === Number(jobId));
        
        if (!foundJob) {
          throw new Error('Job not found');
        }
        setJob(foundJob);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
        setLoading(false);
        }
    };

    if (jobId) {
        fetchJob();
      }
    }, [jobId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="w-full h-[60px] border  border-white"></div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary ">{job.job_title}</h1>
        <h1 className="text-base font-medium text-secondary mb-4">{job.company_name}</h1>
        
        <div className="flex flex-col md:flex-row gap-6 text-gray-600 mb-8">
          <div className="flex items-center">
            <BiCategoryAlt className='mr-2 md:text-2xl text-2xl text-secondary' />
            <span>{job.job_industry}</span>
          </div>
          <div className="flex items-center">
            <ImLocation className='mr-2 md:text-2xl text-2xl text-secondary' />
            <span>{job.job_location}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className='mr-2 md:text-2xl text-2xl text-secondary' />
            <span>{job.job_type}</span>
          </div>
          <div className="flex items-center">
            <FaClockRotateLeft className='mr-2 md:text-2xl text-2xl text-secondary' />
            <span>${job.job_rate} per hour</span>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <p className="text-gray-700">{job.job_description}</p>
          </section>
          <div className="flex justify-center mt-8">
            <Link
              href="/jobseekers"
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
            >
              Register with CrewConnect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostPage;