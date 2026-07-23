import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // BASE URL Config
  const BASE_URL = import.meta.env.VITE_API_URL || "https://fc-server-side.onrender.com";

  // Search & Loading States
  const [searchId, setSearchId] = useState(id || "");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // Update/Delete Loading

  // 🎯 ১. currentProductId স্টেট (যা মিসিং থাকার কারণে ReferenceError আসছিল)
  const [currentProductId, setCurrentProductId] = useState(id || "");

  // Form Field States
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

  // 🎯 ২. ফর্মে ডাটা ফিল করার হেলপার ফাংশন
  const fillFormFields = (product) => {
    setCurrentProductId(product._id); // আসল মঙ্গোডিবি _id সেট হচ্ছে
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

  // 🎯 ৩. প্রোডাক্ট ডাটা লোড করার ফাংশন (ID বা SKU দুইটাই সাপোর্ট করবে)
  const fetchProductData = async (inputKey) => {
    if (!inputKey) return;
    setLoading(true);
    try {
      const isMongoDBId = /^[0-9a-fA-F]{24}$/.test(inputKey);

      if (isMongoDBId) {
        const response = await axios.get(`${BASE_URL}/api/products/single/${inputKey}`);
        const product = response.data.data || response.data.product || response.data;
        if (product) fillFormFields(product);
      } else {
        const response = await axios.get(`${BASE_URL}/api/products`);
        const allProducts = response.data.data || response.data.products || response.data || [];

        const matchedProduct = allProducts.find(
          (p) => p.sku?.toString().trim().toLowerCase() === inputKey.trim().toLowerCase()
        );

        if (matchedProduct) {
          fillFormFields(matchedProduct);
        } else {
          alert("No product found with this SKU!");
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Error loading product. Please check the ID or SKU.");
    } finally {
      setLoading(false);
    }
  };

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

  // 🎯 ৪. সম্পূর্ণ ফিক্সড এবং সেফ Delete Function
  const handleDeleteProduct = async () => {
    if (!currentProductId) {
      alert("No valid product loaded to delete!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to permanently delete this product?");

    if (confirmDelete) {
      try {
        setActionLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.delete(`${BASE_URL}/api/products/delete/${currentProductId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        if (response.data.success || response.status === 200) {
          alert("Product deleted successfully! 🗑️");
           setCurrentProductId("");
          setSearchId("");

          navigate('/admin/dashboard/dashboard', { replace: true });
        }
      } catch (error) {
        console.error("Delete Failed:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Session expired or Unauthorized access! Please login again.");
        } else {
          alert(error.response?.data?.message || "Failed to delete product.");
        }
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  // 🎯 ৫. Update Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentProductId) {
      alert("Please load a valid product first before updating!");
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem("token");

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
      const res = await axios.put(`${BASE_URL}/api/products/update/${currentProductId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (res.data.success || res.status === 200) {
        alert("Product updated successfully! 🎉");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert(error.response?.data?.message || "Something went wrong while updating.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-sans text-gray-800">
      
      {/* Search Header Bar */}
      <div className="mb-8 border border-teal-800/20 p-5 bg-[#022525]/5 rounded-xl shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Paste Product ID or SKU here to edit..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-600 bg-white"
          />
          <button 
            type="submit" 
            className="bg-[#022525] hover:bg-teal-900 text-white font-medium px-6 py-2.5 rounded-lg text-sm tracking-wide transition duration-200 shadow-md"
          >
            Load Product
          </button>
        </form>
      </div>

      <h1 className="text-2xl sm:text-3xl font-light tracking-wider uppercase text-center mb-8 text-[#022525]">
        Edit Product Panel
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#022525]"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-100 p-6 sm:p-8 bg-white rounded-2xl shadow-lg">
          
          {/* Title & SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Product Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>
          </div>

          {/* Fabric */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Fabric Material</label>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              placeholder="e.g. 100% Organic Cotton"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition"
            />
          </div>

          {/* In Stock Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Stock Availability</label>
            <select
              value={inStock}
              onChange={(e) => setInStock(e.target.value === "true")}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-teal-500 outline-none transition cursor-pointer"
            >
              <option value="true">🟢 In Stock (Available)</option>
              <option value="false">🔴 Out of Stock (Sold Out)</option>
            </select>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {availableSizes.map((size) => (
                <label key={size} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="accent-teal-700 w-4 h-4 rounded"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-4">
              {availableColors.map((color) => (
                <label key={color} className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="accent-teal-700 w-4 h-4 rounded"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Product Main Image</label>
            {existingImage && (
              <p className="text-xs text-teal-700 font-medium mb-2 truncate">
                Current Image URL: <span className="underline">{existingImage}</span>
              </p>
            )}
            <input 
              type="file" 
              onChange={(e) => setMainImage(e.target.files[0])} 
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-800 hover:file:bg-teal-100 cursor-pointer" 
            />
          </div>

          {/* 🎯 🌟 6. Modernized Update & Delete Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
            
            {/* Update Button */}
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-0.5 font-medium text-white shadow-lg transition duration-300 hover:shadow-emerald-500/30 active:scale-[0.98] disabled:opacity-60"
            >
              <span className="relative flex w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition duration-300 group-hover:bg-opacity-0">
                {actionLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Update Product
                  </span>
                )}
              </span>
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDeleteProduct}
              disabled={actionLoading}
              className="flex-1 group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-red-500 via-rose-600 to-red-700 p-0.5 font-medium text-white shadow-lg transition duration-300 hover:shadow-rose-500/30 active:scale-[0.98] disabled:opacity-60"
            >
              <span className="relative flex w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition duration-300 group-hover:bg-opacity-0">
                {actionLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Delete Product
                  </span>
                )}
              </span>
            </button>

          </div>

        </form>
      )}
    </div>
  );
};

export default EditProduct;