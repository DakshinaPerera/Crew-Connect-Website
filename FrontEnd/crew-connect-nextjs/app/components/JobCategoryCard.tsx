'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface JobCategoryCardProps {
  title: string;
  imageUrl: string;
  category: string;
}

const JobCategoryCard: React.FC<JobCategoryCardProps> = ({ 
  title, 
  imageUrl, 
  category 
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    // Navigate to the available jobs page with the specific category
    // router.push(`/jobs?category=${encodeURIComponent(category)}`);
    router.push(`${category}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="relative h-[500px] w-[330px] mx-auto overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover"
      />
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Title positioned at the bottom and centered */}
      <h3 className="absolute bottom-6 left-0 right-0 text-center text-4xl font-bold text-white">
        {title}
      </h3>
    </div>
  );
};

export default JobCategoryCard;