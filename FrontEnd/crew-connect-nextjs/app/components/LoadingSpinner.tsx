import React from 'react';

const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#0a192f] rounded-full animate-spin"></div>
      </div>
    );
};

export default LoadingSpinner;