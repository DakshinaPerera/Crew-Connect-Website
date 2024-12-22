'use client';
import { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (searchData: {
    keywords: string;
    location: string;
    jobType: string;
    jobIndustry: string;
  }) => void;
  className?: string;
}

export default function SearchForm({ onSearch, className = '' }: SearchFormProps) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobIndustry, setJobIndustry] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keywords, location, jobType, jobIndustry });
  };

  return (
    <div
      className={`w-full  bg-white rounded-lg shadow-2xl border-2 px-4 py-2 ${className}`}
    >
      {isMobile ? (
        // Mobile Search Form
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Keywords Input */}
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src="/images/search_icon.png"
                alt="Search"
                className="h-5 w-5"
              />
            </div>
            <input
              type="text"
              placeholder="Job title or keywords"
              className="w-full px-4 pl-10 py-2 bg-white rounded-md"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Location Input */}
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img
                src="/images/location_icon.png"
                alt="Location"
                className="h-5 w-5"
              />
            </div>
            <input
              type="text"
              placeholder="Search Australia"
              className="w-full px-4 pl-10 py-2 bg-white rounded-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Job Type Dropdown */}
          <div className="relative border-2 border-[#393E46] rounded-lg">
            <select
              className="appearance-none w-full px-4 py-2 pr-8 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="casual">Casual</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
              <img
                src="/images/down_arrow.png"
                alt="Dropdown"
                className="h-3 w-5"
              />
            </div>
          </div>

          {/* Job Industry Dropdown */}
          <div className="relative border-2 border-[#393E46] rounded-lg">
            <select
              className="appearance-none w-full px-4 py-2 pr-8 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={jobIndustry}
              onChange={(e) => setJobIndustry(e.target.value)}
            >
              <option value="">Job Industry</option>
              <option value="logistics">Logistics</option>
              <option value="warehousing">Warehousing</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="security">Security</option>
              <option value="meat-processing">Meat Processing</option>
              <option value="poultry-processing">Poultry Processing</option>
              <option value="horiculture">Horiculture</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
              <img
                src="/images/down_arrow.png"
                alt="Dropdown"
                className="h-3 w-5"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full px-6 py-2 bg-primary text-white rounded-md hover:bg-[#112a45] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      ) : (
        // Desktop Search Form
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Keywords Input */}
            <div className="flex-1 relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src="/images/search_icon.png"
                  alt="Search"
                  className="h-5 w-5"
                />
              </div>
              <input
                type="text"
                placeholder="Job title or keywords"
                className="w-full px-4 pl-10 py-2 bg-white rounded-md"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            {/* Vertical Line */}
            <div className="border-r border-gray-300 h-10"></div>

            {/* Location Input */}
            <div className="flex-1 relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src="/images/location_icon.png"
                  alt="Location"
                  className="h-5 w-5"
                />
              </div>
              <input
                type="text"
                placeholder="Search Australia"
                className="w-full px-4 pl-10 py-2 bg-white rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md hover:bg-[#112a45] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>

          {/* Divider line with more defined shadow */}
          <div className="border-t border-gray-200 my-2 shadow-md"></div>

          {/* Bottom section with filters */}
          <div className="flex flex-wrap gap-4">
            {/* Job Type Dropdown */}
            <div className="relative border-2 border-[#393E46] rounded-lg">
              <select
                className="appearance-none px-4 py-2 pr-8 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">Job Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="casual">Casual</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src="/images/down_arrow.png"
                  alt="Dropdown"
                  className="h-3 w-5"
                />
              </div>
            </div>

            {/* Job Industry Dropdown */}
            <div className="relative border-2 border-[#393E46] rounded-lg">
              <select
                className="appearance-none px-4 py-2 pr-8 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={jobIndustry}
                onChange={(e) => setJobIndustry(e.target.value)}
              >
                <option value="">Job Industry</option>
                <option value="logistics">Logistics</option>
                <option value="warehousing">Warehousing</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="security">Security</option>
                <option value="meat-processing">Meat Processing</option>
                <option value="poultry-processing">Poultry Processing</option>
                <option value="horiculture">Horiculture</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <img
                  src="/images/down_arrow.png"
                  alt="Dropdown"
                  className="h-3 w-5"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}