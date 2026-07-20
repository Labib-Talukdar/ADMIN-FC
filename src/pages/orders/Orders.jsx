import React, { useEffect, useState } from 'react';
import API from '../../api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে সব অর্ডার নিয়ে আসার ফাংশন
  const fetchOrders = async () => {
    try {
      const response = await API.get('/api/orders/all');
      setOrders(response.data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-500 font-medium text-lg animate-pulse">
          Loading Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto font-sans">
      {/* হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-gray-800">
            Customer Orders ({orders.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage and review all client purchases
          </p>
        </div>
        <button 
          onClick={fetchOrders}
          className="w-full sm:w-auto bg-black text-white text-xs sm:text-sm uppercase px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
        >
          Refresh Orders
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400 text-base">
          কোনো অর্ডার পাওয়া যায়নি।
        </div>
      ) : (
        /* responsive table container */
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left border-separate border-spacing-y-3 min-w-[900px]">
            <thead>
              <tr className="text-xs lg:text-sm uppercase tracking-wider text-gray-500 px-4">
                <th className="pb-2 pl-4 w-12 text-center">#</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Phone & Address</th>
                <th className="pb-2">Items</th>
                <th className="pb-2">Total Amount</th>
                <th className="pb-2">Payment & Note</th>
                <th className="pb-2 pr-4">Date</th>
              </tr>
            </thead>

            <tbody className="text-sm lg:text-base text-gray-800">
              {orders.map((order, index) => (
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

                  {/* ৭. অর্ডারের তারিখ */}
                  <td className="p-4 rounded-r-xl align-top text-xs lg:text-sm text-gray-500 whitespace-nowrap pr-4">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;