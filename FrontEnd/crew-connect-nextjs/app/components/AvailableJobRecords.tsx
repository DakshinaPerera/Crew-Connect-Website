'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import { BiCategoryAlt } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { FaBriefcase } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
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

const AvailableJobRecords = () => {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleJobs, setVisibleJobs] = useState(6);

    useEffect(() => {
    const fetchJobs = async () => {
        try {
        const response = await fetch('/api/jobs/jobseeker');
        if (!response.ok) {
            throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        const sortedJobs = data.sort((a: Job, b: Job) => b.job_id - a.job_id);
        console.log(sortedJobs.length)
        setJobs(sortedJobs);
        } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
        setLoading(false);
        }
    };

    fetchJobs();
    }, []);



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
    if (error) console.log(error);

    return (
        <div className="container mx-auto px-4 z-10 py-8">
            <div className="text-5xl font-bold mb-4 md:text-start text-center md:ml-[6rem]">Browse Jobs</div>
            <div className="flex md:justify-between justify-center items-center mb-6 md:mr-[6rem]">
                <div></div>
                <Link
                    href="/jobseekers"
                    className="bg-primary text-white text-lg font-semibold text-center px-2 py-2 max-w-52 rounded-xl hover:bg-[#112a45]">
                    Register with CrewConnect
                </Link>
            </div>
            <div className="flex flex-col px-8 md:px-24 space-y-4">
                {jobs.slice(0, visibleJobs).map((job: Job) => (
                    <div
                        key={job.job_id}
                        className="bg-white rounded-lg shadow-md border-black border-2 md:border-1 p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="md:flex justify-between items-start h-full">
                            <div className="flex-grow pr-4">
                                <div className="flex-col justify-between items-center mb-2">
                                    <h2 className="text-3xl font-bold text-secondary">{job.job_title}</h2>
                                    <h2 className="text-base font-medium text-secondary">{job.company_name}</h2>
                                </div>
                                <p className="text-gray-700 text-normal max-w-[66rem] md:text-xl mb-4">
                                    {truncateDescription(job.job_description)}
                                </p>
                                <div className="flex flex-wrap md:justify-between gap-4 pb-4 md:pb-0 text-base md:text-xl text-gray-600 mb-2">
                                    <span className="flex items-center">
                                        <BiCategoryAlt className='mr-2 md:text-2xl text-2xl text-secondary' />
                                        {job.job_industry}
                                    </span>
                                    <span className="flex items-center">
                                        <ImLocation className='mr-2 md:text-2xl text-2xl text-secondary' />
                                        {job.job_location}
                                    </span>
                                    <span className="flex items-center">
                                        <FaBriefcase className='mr-2 md:text-2xl text-2xl text-secondary' />
                                        {job.job_type}
                                    </span>
                                    <span className="flex items-center">
                                        <FaClockRotateLeft className='mr-2 md:text-2xl text-2xl text-secondary' />
                                        ${job.job_rate} Annual
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center md:pt-16 md:pr-4 md:h-full">
                                <Link
                                    href={`/availablejobs/jobdetails/${job.job_id}`}
                                    className="bg-primary text-white py-2 px-4 rounded-xl max-w-36 text-lg hover:bg-[#112a45] transition-colors duration-300 text-center"
                                >
                                    View more & Register
                                </Link>
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
    )
}

export default AvailableJobRecords