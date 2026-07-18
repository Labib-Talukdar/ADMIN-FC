 

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   // 🎯 আইডি ট্র্যাক করার জন্য নতুন স্টেট (যদি ইউআরএল এ আইডি না থাকে)
//   const [searchId, setSearchId] = useState(id || "");
//   const [loading, setLoading] = useState(false);

//   // প্রোডাক্টের বাকি সব স্টেট
//   const [title, setTitle] = useState("");
//   const [sku, setSku] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [fabric, setFabric] = useState("");
//   const [inStock, setInStock] = useState(true);
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [mainImage, setMainImage] = useState(null);
//   const [existingImage, setExistingImage] = useState("");

//   const availableSizes = ["XS", "S", "M", "L", "XL"];
//   const availableColors = ["Red", "Emerald Green", "Maroon", "Navy Blue", "Black", "White"];

//   // 🎯 ডাটা ফেচ করার মূল ফাংশন
//   const fetchProductData = async (productId) => {
//     if (!productId) return;
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/products/single/${productId}`);
//       console.log("Backend Response:", response.data);
//       const product = response.data.data || response.data;

//       if (product) {
//         setTitle(product.title);
//         setSku(product.sku);
//         setPrice(product.price);
//         setCategory(product.category);
//         setFabric(product.fabric);
//         setInStock(product.inStock !== undefined ? product.inStock : true);
//         setSelectedSizes(product.sizes || []);
//         setSelectedColors(product.colors || []);
//         setExistingImage(product.mainImage);
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Product not found! Please check the ID.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // যদি ইউআরএল এ সরাসরি আইডি থাকে (যেমন: /product/edit/123)
//   useEffect(() => {
//     if (id) {
//       fetchProductData(id);
//     }
//   }, [id]);

//  // ম্যানুয়ালি আইডি সার্চ করার হ্যান্ডলার
// const handleSearchSubmit = (e) => {
//   e.preventDefault();
//   if (searchId.trim()) {
//     // 🎯 এটি এখন আমাদের নতুন রাউটের সাথে পারফেক্টলি ম্যাচ করবে
//     navigate(`/admin/dashboard/edit-product/${searchId.trim()}`); 
//     fetchProductData(searchId.trim());
//   }
// };

//   // বাকি হ্যান্ডলারগুলো (Size, Color, Submit) আগের মতোই থাকবে...
//   const handleSizeChange = (size) => {
//     setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
//   };

//   const handleColorChange = (color) => {
//     setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("sku", sku);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("fabric", fabric);
//     formData.append("inStock", inStock);
//     formData.append("sizes", JSON.stringify(selectedSizes));
//     formData.append("colors", JSON.stringify(selectedColors));
//     if (mainImage) formData.append("mainImage", mainImage);

//     try {
//       const targetId = id || searchId;
//       const res = await axios.put(`http://localhost:5000/api/products/update/${targetId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (res.data.success) {
//         alert("Product updated successfully! 🎉");
//       }
//     } catch (error) {
//       alert("Something went wrong while updating.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-12 font-sans text-neutral-900 mt-10">
      
//       {/* 🎯 ১. কুইক আইডি সার্চ বার (যেহেতু আলাদা ফাইল নেই) */}
//       <div className="mb-10 border border-dashed border-gray-300 p-4 bg-gray-50 rounded">
//         <form onSubmit={handleSearchSubmit} className="flex gap-2">
//           <input 
//             type="text" 
//             placeholder="Paste Product ID here to edit..." 
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
//           />
//           <button type="submit" className="bg-black text-white px-5 py-2 text-sm uppercase tracking-wider">
//             Load Product
//           </button>
//         </form>
//       </div>

//       <h1 className="text-2xl font-light tracking-widest uppercase text-center mb-10">Edit Product Panel</h1>
      
//       {loading ? (
//         <div className="text-center py-10 text-gray-500">Fetching Product Details...</div>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-6 border border-gray-100 p-8 bg-white shadow-sm">
//           {/* বাকি সব ইনপুট ফিল্ড (Title, Price, Stock Status, Size, Color) আগের কোডের মতো নিচে বসে যাবে */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Title</label>
//               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
//             </div>
//             <div>
//               <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SKU</label>
//               <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Price</label>
//               <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
//             </div>
//             <div>
//               <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Category</label>
//               <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Stock Availability</label>
//             <select value={inStock} onChange={(e) => setInStock(e.target.value === "true")} className="w-full border border-gray-200 px-4 py-2.5 text-sm bg-white focus:border-black outline-none">
//               <option value="true">🟢 In Stock (Available)</option>
//               <option value="false">🔴 Out of Stock (Sold Out)</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Available Sizes</label>
//             <div className="flex flex-wrap gap-4">
//               {availableSizes.map(size => (
//                 <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
//                   <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} className="accent-black" />
//                   {size}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Available Colors</label>
//             <div className="flex flex-wrap gap-4">
//               {availableColors.map(color => (
//                 <label key={color} className="flex items-center gap-2 text-sm cursor-pointer">
//                   <input type="checkbox" checked={selectedColors.includes(color)} onChange={() => handleColorChange(color)} className="accent-black" />
//                   {color}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Main Image</label>
//             {existingImage && <p className="text-xs text-gray-400 mb-2">Current: {existingImage}</p>}
//             <input type="file" onChange={(e) => setMainImage(e.target.files[0])} className="text-sm" />
//           </div>

//           <div className="pt-4">
//             <button type="submit" className="w-full bg-neutral-950 text-white text-xs tracking-[0.2em] uppercase py-4 font-medium hover:bg-black transition-colors">
//               Update Product
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EditProduct;






 
































import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [searchId, setSearchId] = useState(id || "");
  const [loading, setLoading] = useState(false);


  // প্রোডাক্টের স্টেটগুলো
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [inStock, setInStock] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const availableColors = ["Red", "Emerald Green", "Maroon", "Navy Blue", "Black", "White"];

  // ফর্ম ফিল্ডগুলো পূরণ করার কমন ফাংশন
  const fillFormFields = (product) => {
    setTitle(product.title || "");
    setSku(product.sku || "");
    setPrice(product.price || "");
    setCategory(product.category || "");
    setFabric(product.fabric || "");
    setInStock(product.inStock !== undefined ? product.inStock : true);
    setSelectedSizes(product.sizes || []);
    setSelectedColors(product.colors || []);
    setExistingImage(product.mainImage || "");
  };

  // 🎯 ডাটা ফেচ করার স্মার্ট ফাংশন (ID এবং SKU দুইটাই হ্যান্ডেল করবে)
  const fetchProductData = async (inputKey) => {
    if (!inputKey) return;
    setLoading(true);
    try {
      // চেক করছি ইনপুটটি কি ২৪ ডিজিটের মঙ্গোডিবি আইডি কি না
      const isMongoDBId = /^[0-9a-fA-F]{24}$/.test(inputKey);

      if (isMongoDBId) {
        // ১. ২৪ ডিজিটের আইডি হলে সরাসরি সিঙ্গেল প্রোডাক্ট রাউটে হিট করবে
        const response = await axios.get(`http://localhost:5000/api/products/single/${inputKey}`);
        const product = response.data.data || response.data.product || response.data;
        if (product) fillFormFields(product);
      } else {
        // 🚀 ২. ২৪ ডিজিট না হলে (যেমন SKU), সব প্রোডাক্ট এনে ফিল্টার করবে
        const response = await axios.get(`http://localhost:5000/api/products`);
        const allProducts = response.data.data || response.data.products || response.data;
        
        // SKU এর সাথে ম্যাচ করানো (কেস ইনসেনসিটিভ)
        const matchedProduct = allProducts.find(
          (p) => p.sku?.toString().trim().toLowerCase() === inputKey.trim().toLowerCase()
        );

        if (matchedProduct) {
          fillFormFields(matchedProduct);
          // ইউআরএলটি ওই প্রোডাক্টের আসল মঙ্গোডিবি আইডি দিয়ে আপডেট করে দিচ্ছি যাতে আপডেট করতে সুবিধা হয়
          navigate(`/admin/dashboard/edit-product/${matchedProduct._id}`, { replace: true });
        } else {
          alert("Product not found with this SKU!");
        }
      }
    } catch (error) {
      console.error("🚨 Error fetching product:", error);
      alert("Error loading product. Please check the ID or SKU.");
    } finally {
      setLoading(false);
    }
  };



  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm("Are you sure delete product")

    if(confirmDelete) {
      try{
        const response = await axios.delete(`http://localhost:5000/api/products/delete/${id}`);

        if (response.data.success) {
          alert("product delete successfully!");

          navigate('/')
        }
      } catch(error) {
        console.error("Delete Failed", error);
        alert(error.response?.data?.message || "something went wrong while deleting the product. ")

      }
    }


  }


  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      fetchProductData(searchId.trim());
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleColorChange = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  // 🎯 প্রোডাক্ট এডিট/আপডেট সাবমিট ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("sku", sku);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("fabric", fabric);
    formData.append("inStock", inStock);
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("colors", JSON.stringify(selectedColors));
    if (mainImage) formData.append("mainImage", mainImage);

    try {
      // 🚀 আপনার ব্যাকএন্ডের সঠিক পুট (PUT) রাউট স্ট্রাকচার অনুযায়ী URL সেট করা হলো:
      const targetId = id; 
      if (!targetId) {
        alert("Please load a valid product first before updating!");
        setLoading(false);
        return;
      }

      const res = await axios.put(`http://localhost:5000/api/products/update/${targetId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.success || res.status === 200) {
        alert("Product updated successfully! 🎉");
      }
    } catch (error) {
      console.error("🚨 Update Error:", error);
      alert("Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-sans text-neutral-900 mt-10">
      
      {/* ১. সার্চ বার (আইডি অথবা SKU দুটোই কাজ করবে) */}
      <div className="mb-10 border border-dashed border-gray-300 p-4 bg-gray-50 rounded">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Paste Product ID or SKU here to edit..." 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <button type="submit" className="bg-black text-white px-5 py-2 text-sm uppercase tracking-wider">
            Load Product
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-light tracking-widest uppercase text-center mb-10">Edit Product Panel</h1>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Processing...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-100 p-8 bg-white shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SKU</label>
              <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Stock Availability</label>
            <select value={inStock} onChange={(e) => setInStock(e.target.value === "true")} className="w-full border border-gray-200 px-4 py-2.5 text-sm bg-white focus:border-black outline-none">
              <option value="true">🟢 In Stock (Available)</option>
              <option value="false">🔴 Out of Stock (Sold Out)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {availableSizes.map(size => (
                <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} className="accent-black" />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-4">
              {availableColors.map(color => (
                <label key={color} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={selectedColors.includes(color)} onChange={() => handleColorChange(color)} className="accent-black" />
                  {color}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Main Image</label>
            {existingImage && <p className="text-xs text-gray-400 mb-2">Current: {existingImage}</p>}
            <input type="file" onChange={(e) => setMainImage(e.target.files[0])} className="text-sm" />
          </div>

          <div className="flex gap-4 mt-8">
            <div className="pt-4">
            <button type="submit" className="w-full bg-neutral-950 text-white text-xs tracking-[0.2em] uppercase py-4 font-medium hover:bg-black transition-colors">
              Update Product
            </button>

            <button type="button" onClick={handleDeleteProduct}
             className="px-6 bg-red-600 text-white text-xs uppercase tracking-wider py-3 font-semibold hover:bg-red-700 transition-colors">
              Delete Product
            </button>
          </div>
          </div>
        </form>
      )}





    </div>
  );
};

export default EditProduct;