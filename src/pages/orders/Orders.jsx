// import React, { useEffect, useState } from 'react';
// import API from '../../api';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ব্যাকএন্ড থেকে সব অর্ডার নিয়ে আসার ফাংশন
//   const fetchOrders = async () => {
//     try {
//       const response = await API.get('/api/orders/all');
//       setOrders(response.data);
//     } catch (error) {
//       console.error("Orders Fetching Error:", error);
//       alert("অর্ডার ডাটা লোড করতে সমস্যা হয়েছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="text-gray-500 font-medium text-lg animate-pulse">
//           Loading Orders...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto font-sans">
//       {/* হেডার সেকশন */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gray-800">
//             Customer Orders ({orders.length})
//           </h1>
//           <p className="text-xs sm:text-sm text-gray-500 mt-1">
//             Manage and review all client purchases
//           </p>
//         </div>
//         <button 
//           onClick={fetchOrders}
//           className="w-full sm:w-auto bg-black text-white text-xs sm:text-sm uppercase px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
//         >
//           Refresh Orders
//         </button>
//       </div>

//       {orders.length === 0 ? (
//         <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400 text-base">
//           কোনো অর্ডার পাওয়া যায়নি।
//         </div>
//       ) : (
//         /* responsive table container */
//         <div className="overflow-x-auto rounded-xl">
//           <table className="w-full text-left border-separate border-spacing-y-3 min-w-[900px]">
//             <thead>
//               <tr className="text-xs lg:text-sm uppercase tracking-wider text-gray-500 px-4">
//                 <th className="pb-2 pl-4 w-12 text-center">#</th>
//                 <th className="pb-2">Customer</th>
//                 <th className="pb-2">Phone & Address</th>
//                 <th className="pb-2">Items</th>
//                 <th className="pb-2">Total Amount</th>
//                 <th className="pb-2">Payment & Note</th>
//                 <th className="pb-2 pr-4">Date</th>
//               </tr>
//             </thead>

//             <tbody className="text-sm lg:text-base text-gray-800">
//               {orders.map((order, index) => (
//                 <tr 
//                   key={order._id} 
//                   className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-100"
//                 >
//                   {/* ১. সিরিয়াল নম্বর */}
//                   <td className="p-4 rounded-l-xl font-bold text-gray-400 text-center align-top bg-gray-50/50">
//                     {index + 1}
//                   </td>

//                   {/* ২. কাস্টমার নাম ও ইমেইল */}
//                   <td className="p-4 align-top">
//                     <p className="font-bold text-gray-900 text-sm lg:text-base">
//                       {order.customer?.fullName || 'N/A'}
//                     </p>
//                     <p className="text-xs lg:text-sm text-gray-500 break-all">
//                       {order.customer?.email || 'N/A'}
//                     </p>
//                   </td>

//                   {/* ৩. ফোন ও ডেলিভারি ঠিকানা */}
//                   <td className="p-4 align-top max-w-xs">
//                     <p className="font-semibold text-gray-900 text-sm lg:text-base">
//                       {order.customer?.phone}
//                     </p>
//                     <p className="text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">
//                       {order.customer?.fullAddress}
//                     </p>
//                     <span className="inline-block mt-2 text-[11px] lg:text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full uppercase">
//                       {order.customer?.shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}
//                     </span>
//                   </td>

//                   {/* ৪. অর্ডারের আইটেমগুলো */}
//                   <td className="p-4 align-top max-w-xs">
//                     <div className="space-y-2">
//                       {order.items?.map((item, idx) => (
//                         <div key={idx} className="text-xs lg:text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
//                           <p className="font-semibold text-gray-800">{item.title}</p>
//                           <p className="text-gray-500 text-xs lg:text-sm">
//                             Size: <span className="font-semibold text-black">{item.size}</span> | 
//                             Color: <span className="font-semibold text-black">{item.color}</span> | 
//                             Qty: <span className="font-semibold text-black">{item.quantity}</span>
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </td>

//                   {/* ৫. পেমেন্ট সামারি */}
//                   <td className="p-4 align-top whitespace-nowrap">
//                     <p className="font-bold text-black text-base lg:text-lg">
//                       Tk. {order.grandTotal}
//                     </p>
//                     <p className="text-xs lg:text-sm text-gray-500 mt-0.5">
//                       Subtotal: Tk. {order.subtotal} <br/>
//                       Shipping: Tk. {order.shippingCharge}
//                     </p>
//                   </td>

//                   {/* ৬. পেমেন্ট মেথড ও স্পেশাল নোট */}
//                   <td className="p-4 align-top max-w-xs">
//                     <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase ${
//                       order.customer?.paymentMethod === 'cod' 
//                         ? 'bg-amber-100 text-amber-800' 
//                         : 'bg-green-100 text-green-800'
//                     }`}>
//                       {order.customer?.paymentMethod === 'cod' ? 'COD (500 Advance)' : 'Direct Payment'}
//                     </span>
//                     {order.customer?.orderNote && (
//                       <p className="text-xs lg:text-sm text-red-600 mt-2 bg-red-50 p-2.5 border border-red-100 rounded-lg">
//                         <strong>Note:</strong> {order.customer?.orderNote}
//                       </p>
//                     )}
//                   </td>

//                   {/* ৭. অর্ডারের তারিখ */}
//                   <td className="p-4 rounded-r-xl align-top text-xs lg:text-sm text-gray-500 whitespace-nowrap pr-4">
//                     {new Date(order.createdAt).toLocaleDateString('en-GB', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric',
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })}
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;





























//  import React, { useEffect, useState } from 'react';
// import API from '../../api';
// import { 
//   HiOutlineCheckCircle, 
//   HiOutlineClock, 
//   HiOutlineTrash, 
//   HiOutlineArrowPath 
// } from "react-icons/hi2";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // all, pending, confirmed

//   // ১. সব অর্ডার লোড করা
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/api/orders/all');
//       const data = Array.isArray(response.data) ? response.data : response.data?.orders || [];
//       setOrders(data);
//     } catch (error) {
//       console.error("Orders Fetching Error:", error);
//       alert("অর্ডার ডাটা লোড করতে সমস্যা হয়েছে!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ২. পেন্ডিং বাটন ক্লিক করলে অর্ডার কনফার্ম/এপ্রুভ করা
//   const handleApproveOrder = async (orderId) => {
//     try {
//       // ব্যাকএন্ডে স্টেটাস 'confirmed' করা
//       await API.put(`/api/orders/${orderId}/status`, { status: 'confirmed' });
      
//       // ফ্রন্টএন্ড স্টেট আপডেট (তাত্ক্ষণিক কালার ও টেক্সট চেঞ্জ হবে)
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order._id === orderId ? { ...order, status: 'confirmed' } : order
//         )
//       );
//     } catch (error) {
//       console.error("Status Update Error:", error);
//       alert("অর্ডার কনফার্ম করতে সমস্যা হয়েছে! ব্যাকএন্ড রাউট চেক করুন।");
//     }
//   };

//   // ৩. অর্ডার ডিলিট করা (সেফটি কনফার্মেশন সহ)
//   const handleDeleteOrder = async (orderId) => {
//     const isConfirmed = window.confirm("আপনি কি নিশ্চিত যে এই অর্ডারটি স্থায়ীভাবে মুছে ফেলতে চান?");
//     if (!isConfirmed) return;

//     try {
//       await API.delete(`/api/orders/${orderId}`);
      
//       // ফ্রন্টএন্ড লিস্ট থেকে মুছে ফেলা
//       setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
//       alert("অর্ডারটি সফলভাবে মুছে ফেলা হয়েছে।");
//     } catch (error) {
//       console.error("Delete Order Error:", error);
//       alert("অর্ডার মুছে ফেলতে সমস্যা হয়েছে!");
//     }
//   };

//   // ৪. ট্যাব অনুযায়ী ফিল্টারড লিস্ট
//   const filteredOrders = orders.filter(order => {
//     const currentStatus = order.status || 'pending'.toLowerCase();
//     if (filter === 'pending') return currentStatus === 'pending';
//     if (filter === 'confirmed') return currentStatus === 'confirmed';
//     return true;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[50vh]">
//         <div className="text-amber-600 font-bold text-lg animate-pulse">
//           Loading Orders...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto font-sans">
      
//       {/* হেডার সেকশন এবং ফিল্টার ট্যাব */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gray-800">
//             Customer Orders ({orders.length})
//           </h1>
//           <p className="text-xs sm:text-sm text-gray-500 mt-1">
//             Manage, approve, and filter client orders
//           </p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
//           {/* Status Filter Tabs (ক্যাটাগরি অনুযায়ী সংক্ষ্যা সহ) */}
//           <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
//             <button 
//               onClick={() => setFilter('all')}
//               className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
//             >
//               All ({orders.length})
//             </button>
//             <button 
//               onClick={() => setFilter('pending')}
//               className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'pending' ? 'bg-amber-500 text-white shadow' : 'text-gray-500'}`}
//             >
//               Pending ({orders.filter(o => (o.status || 'pending').toLowerCase() === 'pending').length})
//             </button>
//             <button 
//               onClick={() => setFilter('confirmed')}
//               className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'confirmed' ? 'bg-green-600 text-white shadow' : 'text-gray-500'}`}
//             >
//               Confirmed ({orders.filter(o => (o.status || 'pending').toLowerCase() === 'confirmed').length})
//             </button>
//           </div>

//           {/* Refresh Button */}
//           <button 
//             onClick={fetchOrders}
//             className="flex items-center gap-1.5 bg-black text-white text-xs sm:text-sm uppercase px-4 py-2 rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-sm ml-auto sm:ml-0"
//           >
//             <HiOutlineArrowPath className="w-4 h-4" />
//             <span>Refresh</span>
//           </button>
//         </div>
//       </div>

//       {filteredOrders.length === 0 ? (
//         <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400 text-base">
//           কোনো অর্ডার পাওয়া যায়নি।
//         </div>
//       ) : (
//         /* Responsive Table Container */
//         <div className="overflow-x-auto rounded-xl">
//           <table className="w-full text-left border-separate border-spacing-y-3 min-w-[1000px]">
//             <thead>
//               <tr className="text-xs lg:text-sm uppercase tracking-wider text-gray-500 px-4">
//                 <th className="pb-2 pl-4 w-12 text-center">#</th>
//                 <th className="pb-2">Customer</th>
//                 <th className="pb-2">Phone & Address</th>
//                 <th className="pb-2">Items</th>
//                 <th className="pb-2">Total Amount</th>
//                 <th className="pb-2">Payment & Note</th>
//                 <th className="pb-2">Status</th>
//                 <th className="pb-2 pr-4 text-right">Action & Date</th>
//               </tr>
//             </thead>

//             <tbody className="text-sm lg:text-base text-gray-800">
//               {filteredOrders.map((order, index) => {
//                 const currentStatus = order.status || 'pending';

//                 return (
//                   <tr 
//                     key={order._id} 
//                     className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-100"
//                   >
//                     {/* ১. সিরিয়াল নম্বর */}
//                     <td className="p-4 rounded-l-xl font-bold text-gray-400 text-center align-top bg-gray-50/50">
//                       {index + 1}
//                     </td>

//                     {/* ২. কাস্টমার নাম ও ইমেইল */}
//                     <td className="p-4 align-top">
//                       <p className="font-bold text-gray-900 text-sm lg:text-base">
//                         {order.customer?.fullName || 'N/A'}
//                       </p>
//                       <p className="text-xs lg:text-sm text-gray-500 break-all">
//                         {order.customer?.email || 'N/A'}
//                       </p>
//                     </td>

//                     {/* ৩. ফোন ও ডেলিভারি ঠিকানা */}
//                     <td className="p-4 align-top max-w-xs">
//                       <p className="font-semibold text-gray-900 text-sm lg:text-base">
//                         {order.customer?.phone}
//                       </p>
//                       <p className="text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">
//                         {order.customer?.fullAddress}
//                       </p>
//                       <span className="inline-block mt-2 text-[11px] lg:text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full uppercase">
//                         {order.customer?.shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}
//                       </span>
//                     </td>

//                     {/* ৪. অর্ডারের আইটেমগুলো */}
//                     <td className="p-4 align-top max-w-xs">
//                       <div className="space-y-2">
//                         {order.items?.map((item, idx) => (
//                           <div key={idx} className="text-xs lg:text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
//                             <p className="font-semibold text-gray-800">{item.title}</p>
//                             <p className="text-gray-500 text-xs lg:text-sm">
//                               Size: <span className="font-semibold text-black">{item.size}</span> | 
//                               Color: <span className="font-semibold text-black">{item.color}</span> | 
//                               Qty: <span className="font-semibold text-black">{item.quantity}</span>
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </td>

//                     {/* ৫. পেমেন্ট সামারি */}
//                     <td className="p-4 align-top whitespace-nowrap">
//                       <p className="font-bold text-black text-base lg:text-lg">
//                         Tk. {order.grandTotal}
//                       </p>
//                       <p className="text-xs lg:text-sm text-gray-500 mt-0.5">
//                         Subtotal: Tk. {order.subtotal} <br/>
//                         Shipping: Tk. {order.shippingCharge}
//                       </p>
//                     </td>

//                     {/* ৬. পেমেন্ট মেথড ও স্পেশাল নোট */}
//                     <td className="p-4 align-top max-w-xs">
//                       <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase ${
//                         order.customer?.paymentMethod === 'cod' 
//                           ? 'bg-amber-100 text-amber-800' 
//                           : 'bg-green-100 text-green-800'
//                       }`}>
//                         {order.customer?.paymentMethod === 'cod' ? 'COD (500 Advance)' : 'Direct Payment'}
//                       </span>
//                       {order.customer?.orderNote && (
//                         <p className="text-xs lg:text-sm text-red-600 mt-2 bg-red-50 p-2.5 border border-red-100 rounded-lg">
//                           <strong>Note:</strong> {order.customer?.orderNote}
//                         </p>
//                       )}
//                     </td>

//                     {/* ৭. ডাইনামিক স্টেটাস বাটন (Pending -> Approved Toggle) */}
//                     <td className="p-4 align-top whitespace-nowrap">
//                       {currentStatus === 'pending' ? (
//                         <button
//                           onClick={() => handleApproveOrder(order._id)}
//                           title="Click to approve order"
//                           className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
//                         >
//                           <HiOutlineClock className="w-4 h-4 animate-spin-slow" /> Pending
//                         </button>
//                       ) : (
//                         <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-bold uppercase">
//                           <HiOutlineCheckCircle className="w-4 h-4 text-green-600" /> Confirmed
//                         </span>
//                       )}
//                     </td>

//                     {/* ৮. অ্যাকশন (ডিলিট বাটন) এবং তারিখ */}
//                     <td className="p-4 rounded-r-xl align-top text-right pr-4 space-y-3">
//                       <div>
//                         <button
//                           onClick={() => handleDeleteOrder(order._id)}
//                           title="Delete Order"
//                           className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <HiOutlineTrash className="w-5 h-5" />
//                         </button>
//                       </div>

//                       <p className="text-xs text-gray-400 whitespace-nowrap">
//                         {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {
//                           day: 'numeric',
//                           month: 'short',
//                           year: 'numeric',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         }) : 'N/A'}
//                       </p>
//                     </td>

//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;































import React, { useEffect, useState } from 'react';
import API from '../../api';
import { 
  HiOutlineCheckCircle, 
  HiOutlineClock, 
  HiOutlineTrash, 
  HiOutlineArrowPath 
} from "react-icons/hi2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed

  // ১. সব অর্ডার লোড করা
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/orders/all');
      const data = Array.isArray(response.data) ? response.data : response.data?.orders || [];
      setOrders(data);
    } catch (error) {
      console.error("Orders Fetching Error:", error);
      alert("অর্ডার ডাটা লোড করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ২. স্টেটাস নিখুঁতভাবে চেক করার ফাংশন (Fix for Case & Space issues)
  const getNormalizedStatus = (status) => {
    if (!status) return 'pending';
    const cleanStatus = String(status).trim().toLowerCase();
    return cleanStatus === 'confirmed' ? 'confirmed' : 'pending';
  };

  // ৩. পেন্ডিং বাটন ক্লিক করলে অর্ডার কনফার্ম/এপ্রুভ করা
  const handleApproveOrder = async (orderId) => {
    try {
      await API.put(`/api/orders/${orderId}/status`, { status: 'confirmed' });
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: 'confirmed' } : order
        )
      );
    } catch (error) {
      console.error("Status Update Error:", error);
      alert("অর্ডার কনফার্ম করতে সমস্যা হয়েছে!");
    }
  };

  // ৪. অর্ডার ডিলিট করা
  const handleDeleteOrder = async (orderId) => {
    const isConfirmed = window.confirm("আপনি কি নিশ্চিত যে এই অর্ডারটি স্থায়ীভাবে মুছে ফেলতে চান?");
    if (!isConfirmed) return;

    try {
      await API.delete(`/api/orders/${orderId}`);
      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error("Delete Order Error:", error);
      alert("অর্ডার মুছে ফেলতে সমস্যা হয়েছে!");
    }
  };

  // ৫. ট্যাব কাউন্ট এবং ফিল্টারড লিস্ট (১০০% সিঙ্কড)
  const pendingCount = orders.filter(o => getNormalizedStatus(o.status) === 'pending').length;
  const confirmedCount = orders.filter(o => getNormalizedStatus(o.status) === 'confirmed').length;

  const filteredOrders = orders.filter(order => {
    const currentStatus = getNormalizedStatus(order.status);
    if (filter === 'pending') return currentStatus === 'pending';
    if (filter === 'confirmed') return currentStatus === 'confirmed';
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-amber-600 font-bold text-lg animate-pulse">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto font-sans">
      
      {/* হেডার সেকশন এবং ফিল্টার ট্যাব */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gray-800">
            Customer Orders ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage, approve, and filter client orders
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Status Filter Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'all' ? 'bg-white shadow text-black' : 'text-gray-500'}`}
            >
              All ({orders.length})
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'pending' ? 'bg-amber-500 text-white shadow' : 'text-gray-500'}`}
            >
              Pending ({pendingCount})
            </button>
            <button 
              onClick={() => setFilter('confirmed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filter === 'confirmed' ? 'bg-green-600 text-white shadow' : 'text-gray-500'}`}
            >
              Confirmed ({confirmedCount})
            </button>
          </div>

          {/* Refresh Button */}
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-1.5 bg-black text-white text-xs sm:text-sm uppercase px-4 py-2 rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-sm ml-auto sm:ml-0"
          >
            <HiOutlineArrowPath className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400 text-base">
          কোনো অর্ডার পাওয়া যায়নি।
        </div>
      ) : (
        /* Responsive Table Container */
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left border-separate border-spacing-y-3 min-w-[1000px]">
            <thead>
              <tr className="text-xs lg:text-sm uppercase tracking-wider text-gray-500 px-4">
                <th className="pb-2 pl-4 w-12 text-center">#</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Phone & Address</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Total Amount</th>
                <th className="pb-2">Payment & Note</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 pr-4 text-right">Action & Date</th>
              </tr>
            </thead>

            <tbody className="text-sm lg:text-base text-gray-800">
              {filteredOrders.map((order, index) => {
                const currentStatus = getNormalizedStatus(order.status);

                return (
                  <tr 
                    key={order._id} 
                    className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl border border-gray-100"
                  >
                    {/* ১. সিরিয়াল নম্বর */}
                    <td className="p-4 rounded-l-xl font-bold text-gray-400 text-center align-top bg-gray-50/50">
                      {index + 1}
                    </td>

                    {/* ২. কাস্টমার নাম ও ইমেইল */}
                    <td className="p-4 align-top">
                      <p className="font-bold text-gray-900 text-sm lg:text-base">
                        {order.customer?.fullName || 'N/A'}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 break-all">
                        {order.customer?.email || 'N/A'}
                      </p>
                    </td>

                    {/* ৩. ফোন ও ডেলিভারি ঠিকানা */}
                    <td className="p-4 align-top max-w-xs">
                      <p className="font-semibold text-gray-900 text-sm lg:text-base">
                        {order.customer?.phone}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1 leading-relaxed">
                        {order.customer?.fullAddress}
                      </p>
                      <span className="inline-block mt-2 text-[11px] lg:text-xs font-semibold bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full uppercase">
                        {order.customer?.shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}
                      </span>
                    </td>

                    {/* ৪. অর্ডারের আইটেমগুলো */}
                    <td className="p-4 align-top max-w-xs">
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="text-xs lg:text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-gray-500 text-xs lg:text-sm">
                              Size: <span className="font-semibold text-black">{item.size}</span> | 
                              Color: <span className="font-semibold text-black">{item.color}</span> | 
                              Qty: <span className="font-semibold text-black">{item.quantity}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* ৫. পেমেন্ট সামারি */}
                    <td className="p-4 align-top whitespace-nowrap">
                      <p className="font-bold text-black text-base lg:text-lg">
                        Tk. {order.grandTotal}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-500 mt-0.5">
                        Subtotal: Tk. {order.subtotal} <br/>
                        Shipping: Tk. {order.shippingCharge}
                      </p>
                    </td>

                    {/* ৬. পেমেন্ট মেথড ও স্পেশাল নোট */}
                    <td className="p-4 align-top max-w-xs">
                      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase ${
                        order.customer?.paymentMethod === 'cod' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.customer?.paymentMethod === 'cod' ? 'COD (500 Advance)' : 'Direct Payment'}
                      </span>
                      {order.customer?.orderNote && (
                        <p className="text-xs lg:text-sm text-red-600 mt-2 bg-red-50 p-2.5 border border-red-100 rounded-lg">
                          <strong>Note:</strong> {order.customer?.orderNote}
                        </p>
                      )}
                    </td>

                    {/* ৭. ডাইনামিক স্টেটাস বাটন (Pending -> Approved Toggle) */}
                    <td className="p-4 align-top whitespace-nowrap">
                      {currentStatus === 'pending' ? (
                        <button
                          onClick={() => handleApproveOrder(order._id)}
                          title="Click to approve order"
                          className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <HiOutlineClock className="w-4 h-4" /> Pending
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs px-3 py-1.5 rounded-full font-bold uppercase">
                          <HiOutlineCheckCircle className="w-4 h-4 text-green-600" /> Confirmed
                        </span>
                      )}
                    </td>

                    {/* ৮. অ্যাকশন (ডিলিট বাটন) এবং তারিখ */}
                    <td className="p-4 rounded-r-xl align-top text-right pr-4 space-y-3">
                      <div>
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          title="Delete Order"
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-400 whitespace-nowrap">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'N/A'}
                      </p>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;