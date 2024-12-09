import Link from 'next/link';
import React from 'react';

interface JobSearchButtonProps {
  title?: string;
  href: string;
  className?: string;
}

const JobSearchButton: React.FC<JobSearchButtonProps> = ({ 
  title = 'Search for job', 
  href, 
  className 
}) => {
  return (
    <Link 
      href={href}
      className={`
        bg-secondary 
        hover:bg-[#0077b6] 
        transition-colors 
        duration-300 
        text-white 
        px-2 
        py-4 
        rounded-lg 
        text-lg
        inline-block
        text-center
        ${className || ''}
      `}
    >
      {title}
    </Link>
  );
};

export default JobSearchButton;