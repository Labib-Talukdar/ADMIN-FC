import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"; // Link এর সাথে NavLink ইম্পোর্ট করলাম
import { 
  HiOutlineSquares2X2, 
  HiOutlineShoppingBag, 
  HiOutlineFolderOpen, 
  HiOutlineClipboardDocumentList, 
  HiOutlineUsers, 
  HiOutlineTicket, 
  HiOutlineXMark,
  HiChevronDown
} from "react-icons/hi2";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  // সাধারণ মেনু আইটেমসমূহ
  const menuItems = [
    { name: "Categories", path: "categories", icon: <HiOutlineFolderOpen className="w-5 h-5" /> },
    { name: "Orders", path: "orders", icon: <HiOutlineClipboardDocumentList className="w-5 h-5" /> },
    { name: "Users/Customers", path: "/dashboard/users", icon: <HiOutlineUsers className="w-5 h-5" /> },
    { name: "Coupons", path: "/dashboard/coupons", icon: <HiOutlineTicket className="w-5 h-5" /> },
  ];

  // প্রোডাক্ট CRUD ড্রপডাউন আইটেমসমূহ
  const productCrudItems = [
    { name: "Add Product", path: "add-product" },
    { name: "Edit Product", path: "edit-product" },
    { name: "Delete Product", path: "delete-product" },
  ];

  // ড্রপডাউনের কোনো একটা সাব-মেনু অ্যাক্টিভ আছে কি না তা চেক করার ফাংশন
  const isProductRouteActive = productCrudItems.some(item => location.pathname === item.path);

  return (
    <>
      {/* মোবাইল স্ক্রিনের জন্য ওভারলে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* মেইন সাইডবার - হোয়াইট ব্যাকগ্রাউন্ড */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white text-gray-700 p-5 
        flex flex-col border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* ব্র্যান্ড লোগো */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-wider uppercase">
            Zaara <span className="text-pink-600 font-light">Closet</span>
          </Link>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-800 transition-colors" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <HiOutlineXMark className="w-6 h-6" />
          </button>
        </div>

        {/* নেভিগেশন মেনু */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          
          {/* ১. ড্যাশবোর্ড হোমের জন্য NavLink (অ্যাক্টিভ হলে টেক্সট হলুদ হবে) */}
          <NavLink
            to="dashboard"
            end // শুধুমাত্র একদম হুবহু /dashboard পাথে থাকলে অ্যাক্টিভ হবে
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3.5 px-4 py-3 rounded-xl text-xl font-semibold transition-all duration-200
              ${isActive 
                ? "bg-amber-50 text-yellow-600 font-bold" 
                : "text-gray-600 hover:bg-amber-50/50 hover:text-yellow-600"}
            `}
          >
            <HiOutlineSquares2X2 className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          {/* ২. প্রোডাক্টস CRUD ড্রপডাউন মেনু */}
          <div>
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xl font-semibold transition-all duration-200
                ${isProductRouteActive 
                  ? "bg-amber-50/40 text-yellow-600 font-bold" 
                  : "text-gray-600 hover:bg-amber-50/50 hover:text-yellow-600"}`}
            >
              <div className="flex items-center gap-3.5">
                <HiOutlineShoppingBag className="w-5 h-5" />
                <span>Products</span>
              </div>
              <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductDropdownOpen || isProductRouteActive ? "rotate-180" : ""}`} />
            </button>

            {/* ড্রপডাউন সাব-আইটেমসমূহ */}
            <div className={`pl-9 space-y-1 mt-1 transition-all duration-200 overflow-hidden 
              ${isProductDropdownOpen || isProductRouteActive ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              {productCrudItems.map((subItem) => (
                <NavLink
                  key={subItem.name}
                  to={subItem.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => `
                    block py-2 px-4 text-base-100 font-medium rounded-lg transition-all duration-200
                    ${isActive
                      ? "text-yellow-600 font-bold bg-amber-50/60" 
                      : "text-gray-500 hover:text-yellow-600 hover:bg-amber-50/30"}
                  `}
                >
                  • {subItem.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ৩. বাকি অন্যান্য মেনু আইটেমগুলো লুপ */}
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3.5 px-4 py-3 rounded-xl text-xl font-bold transition-all duration-200
                ${isActive 
                  ? "bg-amber-50 text-yellow-600 font-bold" 
                  : "text-gray-600 hover:bg-amber-50/50 hover:text-yellow-600"}
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* ফুটার */}
        <div className="pt-4 border-t border-gray-100 text-center text-[11px] text-gray-400 tracking-wide">
          Admin Panel v1.0
        </div>
      </aside>
    </>
  );
};

export default Sidebar;