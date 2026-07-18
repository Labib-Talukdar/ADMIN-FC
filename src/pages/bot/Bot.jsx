 import React from 'react';

const  Bot = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-4 rounded-full text-red-500 animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-12 h-12"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
          Error 500
        </h1>

        {/* Error Message */}
        <p className="text-base md:text-lg text-gray-600 font-medium">
          Server Error: Please Try Again Later
        </p>
        
        {/* Optional: Home Button (প্রয়োজন না হলে বাদ দিতে পারেন) */}
        <div className="mt-8">
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg text-sm transition-colors duration-200 shadow-sm"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default  Bot;