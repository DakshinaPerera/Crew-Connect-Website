'use client';
import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import AvailableJobRecords from '../components/AvailableJobRecords';

export default function JobsPage() {
  const handleSearch = (searchData: {
    keywords: string;
    location: string;
    jobType: string;
    jobIndustry: string;
  }) => {
    // Implement search logic here
    console.log(searchData);
  };

  return (
    <div>
      <div className="w-full h-[60px] border  border-white"></div>
      <div className="w-full h-[650px] relative"> 
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/available_jobs.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center pt-32 md:pt-40 px-4 sm:px-6 lg:px-8"> 
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-8">
            Find Work That Fits Your Skills.
          </h1>

          {/* Search Form */}
          <SearchForm className='max-w-6xl' onSearch={handleSearch} />
        
        </div>       
      </div>
      <div><AvailableJobRecords /></div>
    </div>
  );
}