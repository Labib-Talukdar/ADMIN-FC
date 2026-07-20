 

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api"; 
import { 
  HiOutlineShoppingBag, 
  HiOutlineCurrencyBangladeshi, 
  HiOutlineClipboardDocumentList, 
  HiOutlineFolderOpen,
  HiOutlinePlus,
  HiOutlineArrowRight
} from "react-icons/hi2";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesChartData, setSalesChartData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে ডাটা সেফলি আনপ্যাক করার ফাংশন
  const extractArrayData = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.data)) return res.data;
    if (res.data?.orders && Array.isArray(res.data.orders)) return res.data.orders;
    if (res.data?.products && Array.isArray(res.data.products)) return res.data.products;
    if (res.data?.categories && Array.isArray(res.data.categories)) return res.data.categories;
    if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  };

 

// Polling দিয়ে নতুন অর্ডার চেক করা
useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await API.get("/api/orders/all");
      const latestOrders = res.data || [];
      
      // যদি আগে থাকা অর্ডারের চেয়ে ব্যাকএন্ডের অর্ডার বেশি হয়
      if (latestOrders.length > stats.totalOrders && stats.totalOrders > 0) {
        playNotificationSound();
        alert("🔔 New Order Received!"); // অথবা Toast Notification
        fetchDashboardData(); // ড্যাশবোর্ডের ডাটা রিফ্রেশ
      }
    } catch (err) {
      console.error(err);
    }
  }, 15000); // প্রতি ১৫ সেকেন্ড পর পর চেক করবে

  return () => clearInterval(interval);
}, [stats.totalOrders]);



  

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      let orders = [];
      try {
        const ordersRes = await API.get("/api/orders/all");
        orders = extractArrayData(ordersRes);
      } catch (err) {
        console.error("Orders Fetch Error:", err);
      }

      let products = [];
      try {
        const productsRes = await API.get("/api/products");
        products = extractArrayData(productsRes);
      } catch (err) {
        console.error("Products Fetch Error:", err);
      }

      let categories = [];
      try {
        const categoriesRes = await API.get("/api/categories");
        categories = extractArrayData(categoriesRes);
      } catch (err) {
        // যদি আলাদা ক্যাটাগরি API না থাকে, প্রোডাক্ট থেকে ইউনিক ক্যাটাগরি বের করবে
        if (Array.isArray(products) && products.length > 0) {
          const uniqueCats = [...new Set(products.map(p => p.category).filter(Boolean))];
          categories = uniqueCats;
        }
      }

      // ১. টোটাল সেলস
      const totalSalesAmount = Array.isArray(orders) 
        ? orders.reduce((sum, order) => sum + (Number(order?.grandTotal) || Number(order?.totalAmount) || 0), 0)
        : 0;

      // ২. স্ট্যাটস সেট
      setStats({
        totalSales: totalSalesAmount,
        totalOrders: Array.isArray(orders) ? orders.length : 0,
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalCategories: Array.isArray(categories) ? categories.length : 0,
      });

      // ৩. সাম্প্রতিক ৫টি অর্ডার
      if (Array.isArray(orders)) {
        setRecentOrders(orders.slice(0, 5));

        // 📈 চার্ট ডাটা ১: সেলস গ্রোথ (সর্বশেষ কিছু অর্ডারের ওপর ভিত্তি করে)
        const dummyOrRealSalesData = orders.map((order, idx) => ({
          name: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) : `Order ${idx + 1}`,
          sales: Number(order.grandTotal) || Number(order.totalAmount) || 0
        })).reverse();

        setSalesChartData(dummyOrRealSalesData.length > 0 ? dummyOrRealSalesData : [
          { name: 'Jan', sales: 4000 },
          { name: 'Feb', sales: 3000 },
          { name: 'Mar', sales: 5000 },
          { name: 'Apr', sales: 8000 },
        ]);

        // 🥧 চার্ট ডাটা ২: পেমেন্ট বা অর্ডার স্ট্যাটাস
        const codCount = orders.filter(o => o.customer?.paymentMethod === 'cod').length;
        const directCount = orders.length - codCount;
        
        setOrderStatusData([
          { name: 'COD Orders', value: codCount || 1 },
          { name: 'Online/Direct', value: directCount || 0 },
        ]);
      }

    } catch (error) {
      console.error("Dashboard Main Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const COLORS = ['#d97706', '#10b981', '#ec4899', '#6366f1'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-yellow-600 font-bold text-lg animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto font-sans space-y-8">
      
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gray-900">
            Fashion <span className="text-pink-600 font-light">Classy</span> Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Welcome back! Here is what's happening with your store today.
          </p>
        </div>

        <Link 
          to="/admin/dashboard/add-product"
          className="flex items-center gap-2 bg-black text-white text-xs sm:text-sm uppercase font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-all shadow-sm active:scale-95"
        >
          <HiOutlinePlus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* ১. স্ট্যাটস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Sales</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              Tk. {stats.totalSales.toLocaleString()}
            </h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-yellow-600 rounded-2xl">
            <HiOutlineCurrencyBangladeshi className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Orders</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              {stats.totalOrders}
            </h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-yellow-600 rounded-2xl">
            <HiOutlineClipboardDocumentList className="w-7 h-7" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Products</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              {stats.totalProducts}
            </h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-yellow-600 rounded-2xl">
            <HiOutlineShoppingBag className="w-7 h-7" />
          </div>
        </div>

        {/* ক্যাটাগরি কাউন্ট */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
              {stats.totalCategories}
            </h3>
          </div>
          <div className="p-3.5 bg-amber-50 text-yellow-600 rounded-2xl">
            <HiOutlineFolderOpen className="w-7 h-7" />
          </div>
        </div>

      </div>

      {/* ২. গ্রাফ ও চার্ট সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* সেলস ট্রেন্ড/গ্রোথ চার্ট */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide">
              Sales Revenue Growth
            </h2>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Live Data
            </span>
          </div>
          
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesChartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis tickLine={false} axisLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', borderColor: '#f3f4f6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  formatter={(value) => [`Tk. ${value}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="sales" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* পেমেন্ট / অর্ডার টাইপ ডোনাট চার্ট */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 uppercase tracking-wide">
            Payment Breakdown
          </h2>
          
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} Orders`, 'Count']} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center text-xs text-gray-400">
            Ratio of Cash on Delivery vs Online Orders
          </p>
        </div>

      </div>

      {/* ৩. সাম্প্রতিক অর্ডার টেবিল */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-gray-500">Latest 5 orders placed by clients</p>
          </div>
          <Link 
            to="/admin/dashboard/orders" 
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            <span>View All Orders</span>
            <HiOutlineArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            এখনো কোনো সাম্প্রতিক অর্ডার নেই।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 font-semibold">
                  <th className="pb-3 pl-2">Customer</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Payment</th>
                  <th className="pb-3">Total Amount</th>
                  <th className="pb-3 pr-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-gray-900">
                      {order.customer?.fullName || "N/A"}
                    </td>
                    <td className="py-3.5 font-medium text-gray-600">
                      {order.customer?.phone || "N/A"}
                    </td>
                    <td className="py-3.5">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase ${
                        order.customer?.paymentMethod === 'cod' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.customer?.paymentMethod === 'cod' ? 'COD' : 'Direct'}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-black">
                      Tk. {order.grandTotal || order.totalAmount || 0}
                    </td>
                    <td className="py-3.5 pr-2 text-right text-xs text-gray-400 whitespace-nowrap">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      }) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;