 
import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  // লোডিং স্টেট
  const [loading, setLoading] = useState(false);

  // কাস্টম সাইজ ইনপুটের জন্য লোকাল স্টেট
  const [customSize, setCustomSize] = useState("");

  // স্টেট স্ট্রাকচার
  const [product, setProduct] = useState({
    title: "",
    sku: "",
    price: "",
    category: "",
    subCategory: "",
    fabric: "",
    description: "",
    disclaimer: "Product color may slightly vary due to photographic lighting sources or your monitor settings.",
    sizes: [], // সিলেক্টেড বা কাস্টম সাইজ এখানে জমা হবে
    colors: [],
    inStock: true,
    mainImage: null,
    mainImageFile: null,
    galleryImages: [null, null, null],
    galleryImagesFiles: [null, null, null],
  });

  // টেক্সট ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" && value !== "Accessories") {
      setProduct({ ...product, [name]: value, subCategory: "" });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // সাইজ অন/অফ করার হ্যান্ডলার
  const handleSizeChange = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter((s) => s !== size)
      : [...product.sizes, size];
    setProduct({ ...product, sizes: updatedSizes });
  };

  // 👈 কাস্টম সাইজ ইনপুট থেকে যোগ করার ফাংশন
  const handleAddCustomSize = (e) => {
    e.preventDefault();
    const trimmedSize = customSize.trim();
    if (trimmedSize && !product.sizes.includes(trimmedSize)) {
      setProduct({
        ...product,
        sizes: [...product.sizes, trimmedSize],
      });
      setCustomSize(""); // ইনপুট বক্স ফাঁকা করে দেওয়া
    }
  };

  // 👈 সাইজ রিমুভ করার ফাংশন
  const handleRemoveSize = (sizeToRemove) => {
    setProduct({
      ...product,
      sizes: product.sizes.filter((s) => s !== sizeToRemove),
    });
  };

  // কালার সিলেক্টর ফিল্টার
  const handleColorChange = (colorName) => {
    const updatedColors = product.colors.includes(colorName)
      ? product.colors.filter((c) => c !== colorName)
      : [...product.colors, colorName];
    setProduct({ ...product, colors: updatedColors });
  };

  // ১. মেইন ইমেজ আপলোড হ্যান্ডলার
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({
        ...product,
        mainImage: URL.createObjectURL(file),
        mainImageFile: file,
      });
    }
  };

  // ২. ৩টি সাব-গ্যালারি ইমেজ আপলোড হ্যান্ডলার
  const handleGalleryImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedGallery = [...product.galleryImages];
      updatedGallery[index] = URL.createObjectURL(file);
      const updatedFiles = [...(product.galleryImagesFiles || [])];
      updatedFiles[index] = file;
      setProduct({
        ...product,
        galleryImages: updatedGallery,
        galleryImagesFiles: updatedFiles,
      });
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 👈 ব্রাউজার কনসোলে ডাটা চেক করার জন্য এটি যোগ করুন
  // console.log("Submitting Product Data:", {
  //   category: product.category,
  //   subCategory: product.subCategory
  // });

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("sku", product.sku);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);
    formData.append("fabric", product.fabric);
    formData.append("description", product.description);
    formData.append("disclaimer", product.disclaimer);
    formData.append("inStock", product.inStock);

    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("colors", JSON.stringify(product.colors));

    if (product.mainImageFile) {
      formData.append("mainImage", product.mainImageFile);
    }

    const galleryFiles = product.galleryImagesFiles || [];
    galleryFiles.forEach((file) => {
      if (file) formData.append("galleryImages", file);
    });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://fc-server-side-1.onrender.com";
      
      const response = await axios.post(`${apiUrl}/api/products/add`, formData, {
        withCredentials: true,
      });

      alert(response.data.message || "Product added successfully!");
      
    } catch (error) {
      console.error("Upload failed details:", error);
      const errorMsg = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || "Product Upload Failed!";
      alert(`Error: ${errorMsg}`);

    } finally {
      setLoading(false);
    }
  };

  const availableColors = [
    { name: "Red", class: "bg-red-600" },
    { name: "Maroon", class: "bg-amber-950" },
    { name: "Black", class: "bg-black" },
    { name: "White", class: "bg-white border border-gray-300" },
    { name: "Emerald Green", class: "bg-emerald-800" },
    { name: "Navy Blue", class: "bg-blue-900" },
    { name: "Pink", class: "bg-pink-400" },
    { name: "Mustard", class: "bg-yellow-600" },
  ];

  // রেডিমেড দ্রুত সিলেক্ট করার সাইজ লিস্ট
  const availableSizes = ["S 36-38", "M 40-42", "L 44-46", "XL 46-48"];

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm font-sans">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">Add New Luxury Premium Dress</h2>
        <p className="text-sm text-gray-500 mt-1">FC ব্র্যান্ডের রেড কালার থিমে নতুন পাকিস্তানি কালেকশন যুক্ত করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">Product Title</label>
            <input 
              type="text" 
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="e.g., 3 Piece Pure Embroidered Silk Suit" 
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-base text-gray-800 bg-gray-50/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">Product SKU / Code</label>
            <input 
              type="text" 
              name="sku"
              value={product.sku}
              onChange={handleChange}
              placeholder="e.g., S114744" 
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-base text-gray-800 bg-gray-50/30"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">Price (BDT)</label>
            <input 
              type="number" 
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="e.g., 8500" 
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-base text-gray-800 bg-gray-50/30"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">Category</label>
            <select 
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none bg-white transition text-base text-gray-800"
              required
            >
              <option value="">Choose Category</option>
              <option value="Organza Items">Organza Items</option>
              <option value="Sale Items">Sale Items</option>
              <option value="Gawn Collections">Gawn Collections</option>
              <option value="Chiffon 2pis">Chiffon 2pis</option>
              <option value="Mona Embroidery">Mona Embroidery</option>
              <option value="Semi Bridal Boutique">Semi Bridal Boutique</option>
              <option value="Cotton Collections">Cotton Collections</option>
              <option value="Boutique Collections">Boutique Collections</option>
              <option value="Kids Collections">Kids Collections</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Dynamic Accessories Sub-Category */}
        {product.category === "Accessories" && (
          <div className="p-4 bg-red-50/40 border border-red-100 rounded-xl transition-all duration-300">
            <label className="block text-sm font-bold uppercase tracking-wider text-red-600 mb-2">
              Select Accessories Type / Collection
            </label>
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-red-200 rounded-xl focus:ring-1 focus:ring-red-600 outline-none bg-white text-base text-gray-800 font-medium"
              required
            >
              <option value="">Choose Sub-Category</option>
              <option value="Shoes">Shoes</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Bags">Bags</option>
            </select>
          </div>
        )}

        {/* Filter Colors */}
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-800 mb-3">
            Product Filter Color
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableColors.map((color) => {
              const isSelected = product.colors.includes(color.name);
              return (
                <button
                  type="button"
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  className={`flex items-center gap-2.5 p-3 rounded-lg border text-sm font-medium transition-all ${
                    isSelected 
                      ? "border-red-600 bg-red-50 text-red-700 font-bold" 
                      : "border-gray-200 bg-white text-gray-700 hover:border-red-200"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${color.class}`} />
                  <span>{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🌟 Description & Disclaimer */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-6">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Dress Specification & Details</h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fabric Details</label>
            <input 
              type="text" 
              name="fabric"
              value={product.fabric}
              onChange={handleChange}
              placeholder="e.g., Pure Silk shirt with Organza Dupatta"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-red-600 text-gray-800"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Description */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Product Description (বিবরণ)
              </label>
              <textarea 
                name="description" 
                value={product.description} 
                onChange={handleChange} 
                placeholder="এখানে জামার বিস্তারিত বিবরণ বড় করে লিখুন..."
                className="w-full h-48 px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-red-600 resize-y text-gray-800 leading-relaxed" 
              />
            </div>

            {/* Box 2: Disclaimer */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Disclaimer & Note (শর্তাবলী)
              </label>
              <textarea 
                name="disclaimer" 
                value={product.disclaimer} 
                onChange={handleChange} 
                placeholder="এখানে কালার বা ডেলিভারি সংক্রান্ত সতর্কতা/নোট লিখুন..."
                className="w-full h-48 px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-red-600 resize-y text-gray-800 leading-relaxed" 
              />
            </div>
          </div>
        </div>

        {/* 🌟 Update: Sizes Section (Default Buttons + Custom Input) */}
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
            Available Sizes
          </label>

          {/* ১. দ্রুত সিলেক্ট করার ডিফল্ট সাইজ বাটন */}
          <div>
            <span className="text-xs text-gray-500 block mb-2 font-medium">Quick Select Sizes:</span>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                    product.sizes.includes(size)
                      ? "bg-red-600 text-white border-red-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:text-red-600 hover:bg-red-50/20"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ২. কাস্টম সাইজ যোগ করার খালি ইনপুট বক্স */}
          <div>
            <span className="text-xs text-gray-500 block mb-2 font-medium">Or Add Custom Size (ইচ্ছামতো সাইজ লিখুন):</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSize}
                onChange={(e) => setCustomSize(e.target.value)}
                placeholder="e.g. XXL 50-52 or Free Size or 38"
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-red-600 text-gray-800"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustomSize(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomSize}
                className="px-5 py-2.5 bg-gray-800 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition uppercase tracking-wider"
              >
                + Add Size
              </button>
            </div>
          </div>

          {/* ৩. যুক্ত হওয়া সমস্ত সাইজ দেখানোর জায়গা (যেখানে ক্লিক করে বাটন কেটেও দেওয়া যাবে) */}
          {product.sizes.length > 0 && (
            <div className="pt-2">
              <span className="text-xs text-gray-500 block mb-2 font-semibold">Selected Sizes ({product.sizes.length}):</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 font-bold text-xs rounded-lg border border-red-200"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => handleRemoveSize(s)}
                      className="text-red-500 hover:text-red-800 font-black text-sm leading-none ml-1"
                      title="Remove size"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
              Main Cover Image (ইউজার চয়েসের জন্য মূল ছবি)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer bg-gray-50 hover:border-red-500 relative h-36 flex flex-col justify-center items-center">
                <input type="file" onChange={handleMainImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <span className="text-sm text-red-600 font-bold">Upload Main Image</span>
                <span className="text-xs text-gray-400 mt-1">সিঙ্গেল মেইন ব্যানার ফাইল</span>
              </div>
              {product.mainImage && (
                <div className="relative w-28 aspect-[3/4] rounded-lg overflow-hidden border border-red-200">
                  <img src={product.mainImage} alt="Main" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
              Sub-Gallery Images (মেইন ইমেজের আন্ডারে ৩টি স্লাইডার ছবি)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex flex-col items-center gap-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Gallery Image {index + 1}</span>
                  <div className="w-full relative h-28 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden">
                    {product.galleryImages[index] ? (
                      <img src={product.galleryImages[index]} alt="Gallery" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-gray-400">No Image</span>
                    )}
                    <input 
                      type="file" 
                      onChange={(e) => handleGalleryImageChange(e, index)} 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full text-white font-bold text-sm py-4 px-4 rounded-xl transition-all duration-300 tracking-widest uppercase shadow-sm ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-red-600"
          }`}
        >
          {loading ? "Uploading Product..." : "Publish Product (FC Red Style)"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;