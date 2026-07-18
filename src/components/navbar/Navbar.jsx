 import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineBars3BottomLeft, HiOutlineBell } from "react-icons/hi2";

const Navbar = ({ setIsSidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 w-full shadow-sm">
      
      {/* বামপাশ: মোবাইল মেনু বাটন এবং টাইটেল */}
      <div className="flex items-center gap-3">
        {/* এই বাটনটি শুধুমাত্র মোবাইলে (md স্ক্রিনের নিচে) শো করবে */}
        <button 
          type="button"
          className="block md:hidden text-gray-600 hover:text-gray-900 p-2 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none"
          onClick={() => setIsSidebarOpen(true)}
        >
          <HiOutlineBars3BottomLeft className="w-6 h-6" />
        </button>
        
        {/* রেসপন্সিভ টেক্সট: ছোট স্ক্রিনে হাইড থাকবে, বড় স্ক্রিনে দেখাবে */}
        <div className="text-sm font-semibold text-gray-700 hidden sm:block">
          Welcome back, <span className="text-gray-900 font-bold">Admin</span> 👋
        </div>
      </div>

      {/* ডানপাশ: নোটিফিকেশন এবং প্রোফাইল ড্রপডাউন */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* নোটিফিকেশন আইকন */}
        <button className="p-2 text-gray-500 hover:text-gray-800 rounded-xl hover:bg-gray-50 transition-colors relative">
          <HiOutlineBell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full"></span>
        </button>

        {/* প্রোফাইল বাটন ও মেনু */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors outline-none focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 text-yellow-700 flex items-center justify-center font-bold text-xs border border-amber-200 shadow-sm">
              A
            </div>
          </button>

          {/* প্রোফাইল ড্রপডাউন মেনু */}
          {isProfileDropdownOpen && (
            <>
              {/* ব্যাকড্রপ স্ক্রিন যাতে বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হয় */}
              <div className="fixed inset-0 z-10 bg-transparent" onClick={() => setIsProfileDropdownOpen(false)} />
              
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-20 text-sm">
                <Link 
                  to="/dashboard/profile" 
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-yellow-600 font-medium transition-colors"
                >
                  My Profile
                </Link>
                <Link 
                  to="/dashboard/settings" 
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-amber-50 hover:text-yellow-600 font-medium transition-colors"
                >
                  Settings
                </Link>
                <hr className="my-1 border-gray-100" />
                <button 
                  type="button"
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-rose-50 font-semibold transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;