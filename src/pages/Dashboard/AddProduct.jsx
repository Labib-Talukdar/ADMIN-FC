 


// import React, { useState } from "react";
// import axios from "axios";

// const AddProduct = () => {
//   // লোডিং স্টেট
//   const [loading, setLoading] = useState(false);

//   // স্টেট স্ট্রাকচার
//   const [product, setProduct] = useState({
//     title: "",
//     sku: "",
//     price: "",
//     category: "",
//     fabric: "",
//     shirtDetails: "",
//     dupattaDetails: "",
//     trouserDetails: "",
//     sizes: [],
//     colors: [],
//     inStock: true,
//     mainImage: null,
//     mainImageFile: null,
//     galleryImages: [null, null, null],
//     galleryImagesFiles: [null, null, null],
//   });

//   // টেক্সট ইনপুট হ্যান্ডলার
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   // সাইজ সিলেক্টর
//   const handleSizeChange = (size) => {
//     const updatedSizes = product.sizes.includes(size)
//       ? product.sizes.filter((s) => s !== size)
//       : [...product.sizes, size];
//     setProduct({ ...product, sizes: updatedSizes });
//   };

//   // কালার সিলেক্টর ফিল্টার
//   const handleColorChange = (colorName) => {
//     const updatedColors = product.colors.includes(colorName)
//       ? product.colors.filter((c) => c !== colorName)
//       : [...product.colors, colorName];
//     setProduct({ ...product, colors: updatedColors });
//   };

//   // ১. মেইন ইমেজ আপলোড হ্যান্ডলার
//   const handleMainImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProduct({
//         ...product,
//         mainImage: URL.createObjectURL(file),
//         mainImageFile: file,
//       });
//     }
//   };

//   // ২. ৩টি সাব-গ্যালারি ইমেজ আপলোড হ্যান্ডলার
//   const handleGalleryImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const updatedGallery = [...product.galleryImages];
//       updatedGallery[index] = URL.createObjectURL(file);
//       const updatedFiles = [...(product.galleryImagesFiles || [])];
//       updatedFiles[index] = file;
//       setProduct({
//         ...product,
//         galleryImages: updatedGallery,
//         galleryImagesFiles: updatedFiles,
//       });
//     }
//   };

//   // ফর্ম সাবমিট হ্যান্ডলার
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();

//     formData.append("title", product.title);
//     formData.append("sku", product.sku);
//     formData.append("price", product.price);
//     formData.append("category", product.category);
//     formData.append("fabric", product.fabric);
//     formData.append("shirtDetails", product.shirtDetails);
//     formData.append("dupattaDetails", product.dupattaDetails);
//     formData.append("trouserDetails", product.trouserDetails);
//     formData.append("inStock", product.inStock);

//     formData.append("sizes", JSON.stringify(product.sizes));
//     formData.append("colors", JSON.stringify(product.colors));

//     if (product.mainImageFile) {
//       formData.append("mainImage", product.mainImageFile);
//     }

//     const galleryFiles = product.galleryImagesFiles || [];
//     galleryFiles.forEach((file) => {
//       if (file) formData.append("galleryImages", file);
//     });

//     try {
//       // ✅ VITE_API_URL চেক ও Axios call
//       const apiUrl = import.meta.env.VITE_API_URL || "https://fc-server-side-1.onrender.com";
      
//       const response = await axios.post(`${apiUrl}/api/products/add`, formData, {
//         withCredentials: true, // Cookies/Session-এর জন্য
//       });

//       alert(response.data.message || "Product added successfully!");
      
//       // রিসেট ফর্ম (Optional)
//       // setProduct({ ... initial states ... });

//     }  catch (error) {
//   console.error("Upload failed details:", error);
//   // ব্যাকএন্ড থেকে আসা আসল এরর মেসেজ অ্যালার্টে দেখানো
//   const errorMsg = error.response?.data?.message 
//     || error.response?.data?.error 
//     || error.message 
//     || "Product Upload Failed!";
//   alert(`Error: ${errorMsg}`);

//     } finally {
//       setLoading(false);
//     }
//   };

//   const availableColors = [
//     { name: "Red", class: "bg-red-600" },
//     { name: "Maroon", class: "bg-amber-950" },
//     { name: "Black", class: "bg-black" },
//     { name: "White", class: "bg-white border border-gray-300" },
//     { name: "Emerald Green", class: "bg-emerald-800" },
//     { name: "Navy Blue", class: "bg-blue-900" },
//     { name: "Pink", class: "bg-pink-400" },
//     { name: "Mustard", class: "bg-yellow-600" },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm font-sans">
//       <div className="border-b border-gray-100 pb-4 mb-6">
//         <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Add New Luxury Premium Dress</h2>
//         <p className="text-xs text-gray-500 mt-1">FC ব্র্যান্ডের রেড কালার থিমে নতুন পাকিস্তানি কালেকশন যুক্ত করুন</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="md:col-span-2">
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Product Title</label>
//             <input 
//               type="text" 
//               name="title"
//               value={product.title}
//               onChange={handleChange}
//               placeholder="e.g., 3 Piece Pure Embroidered Silk Suit" 
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm text-gray-700 bg-gray-50/30"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Product SKU / Code</label>
//             <input 
//               type="text" 
//               name="sku"
//               value={product.sku}
//               onChange={handleChange}
//               placeholder="e.g., S114744" 
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm text-gray-700 bg-gray-50/30"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Price (BDT)</label>
//             <input 
//               type="number" 
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               placeholder="e.g., 8500" 
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm text-gray-700 bg-gray-50/30"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Category</label>
//             <select 
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none bg-white transition text-sm text-gray-700"
//               required
//             >
//               <option value="">Choose Category</option>
//               <option value="Organza Items">Organza Items</option>
//               <option value="Chiffon Items">Chiffon Items</option>
//               <option value="Gawn Collections">Gawn Collections</option>
//               <option value="Chiffon 2pis">Chiffon 2pis</option>
//               <option value="Mona Embroidery">Mona Embroidery</option>
//               <option value="Semi Bridal Boutique">Semi Bridal Boutique</option>
//               <option value="Cotton Collections">Cotton Collections</option>
//               <option value="Kids Collections">Kids Collections</option>
//             </select>
//           </div>
//         </div>

//         {/* Filter Colors */}
//         <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
//           <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
//             Product Filter Color
//           </label>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//             {availableColors.map((color) => {
//               const isSelected = product.colors.includes(color.name);
//               return (
//                 <button
//                   type="button"
//                   key={color.name}
//                   onClick={() => handleColorChange(color.name)}
//                   className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-all ${
//                     isSelected 
//                       ? "border-red-600 bg-red-50 text-red-700 font-bold" 
//                       : "border-gray-200 bg-white text-gray-600 hover:border-red-200"
//                   }`}
//                 >
//                   <span className={`w-3 h-3 rounded-full ${color.class}`} />
//                   <span>{color.name}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
//           <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Dress Specification</h3>
//           <div>
//             <label className="block text-[11px] font-semibold text-gray-500 mb-1">Fabric Details</label>
//             <input 
//               type="text" 
//               name="fabric"
//               value={product.fabric}
//               onChange={handleChange}
//               placeholder="e.g., Pure Silk shirt with Organza Dupatta"
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:border-red-600"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-[11px] font-semibold text-gray-500 mb-1">Shirt Details</label>
//               <textarea name="shirtDetails" value={product.shirtDetails} onChange={handleChange} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-600 resize-none" />
//             </div>
//             <div>
//               <label className="block text-[11px] font-semibold text-gray-500 mb-1">Dupatta Details</label>
//               <textarea name="dupattaDetails" value={product.dupattaDetails} onChange={handleChange} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-600 resize-none" />
//             </div>
//             <div>
//               <label className="block text-[11px] font-semibold text-gray-500 mb-1">Trouser Details</label>
//               <textarea name="trouserDetails" value={product.trouserDetails} onChange={handleChange} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-600 resize-none" />
//             </div>
//           </div>
//         </div>

//         {/* Sizes */}
//         <div>
//           <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Available Sizes</label>
//           <div className="flex flex-wrap gap-2">
//             {["XS / 34", "S / 36", "M / 38", "L / 40", "XL / 42", "XXL / 44"].map((size) => (
//               <button
//                 type="button"
//                 key={size}
//                 onClick={() => handleSizeChange(size)}
//                 className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
//                   product.sizes.includes(size)
//                     ? "bg-red-50 text-red-600 border-red-600 font-bold"
//                     : "bg-white text-gray-600 border-gray-200 hover:text-red-600 hover:bg-red-50/20"
//                 }`}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Image Section */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
//               Main Cover Image (ইউজার চয়েসের জন্য মূল ছবি)
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
//               <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer bg-gray-50 hover:border-red-500 relative h-32 flex flex-col justify-center items-center">
//                 <input type="file" onChange={handleMainImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
//                 <span className="text-xs text-red-600 font-bold">Upload Main Image</span>
//                 <span className="text-[10px] text-gray-400 mt-1">সিঙ্গেল মেইন ব্যানার ফাইল</span>
//               </div>
//               {product.mainImage && (
//                 <div className="relative w-24 aspect-[3/4] rounded-lg overflow-hidden border border-red-200">
//                   <img src={product.mainImage} alt="Main" className="w-full h-full object-cover" />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
//               Sub-Gallery Images (মেইন ইমেজের আন্ডারে ৩টি স্লাইডার ছবি)
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {[0, 1, 2].map((index) => (
//                 <div key={index} className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex flex-col items-center gap-2">
//                   <span className="text-[11px] font-bold text-gray-500 uppercase">Gallery Image {index + 1}</span>
//                   <div className="w-full relative h-24 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden">
//                     {product.galleryImages[index] ? (
//                       <img src={product.galleryImages[index]} alt="Gallery" className="w-full h-full object-cover" />
//                     ) : (
//                       <span className="text-[10px] text-gray-400">No Image</span>
//                     )}
//                     <input 
//                       type="file" 
//                       onChange={(e) => handleGalleryImageChange(e, index)} 
//                       className="absolute inset-0 opacity-0 cursor-pointer" 
//                       accept="image/*" 
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           disabled={loading}
//           className={`w-full text-white font-bold text-xs py-4 px-4 rounded-xl transition-all duration-300 tracking-widest uppercase shadow-sm ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-red-600"
//           }`}
//         >
//           {loading ? "Uploading Product..." : "Publish Product (FC Red Style)"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;






































import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  // লোডিং স্টেট
  const [loading, setLoading] = useState(false);

  // স্টেট স্ট্রাকচার (subCategory যোগ করা হয়েছে)
  const [product, setProduct] = useState({
    title: "",
    sku: "",
    price: "",
    category: "",
    subCategory: "", // 👈 নতুন সাব-ক্যাটাগরি ফিল্ড
    fabric: "",
    shirtDetails: "",
    dupattaDetails: "",
    trouserDetails: "",
    sizes: [],
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
    // ক্যাটাগরি চেঞ্জ করলে সাব-ক্যাটাগরি রিসেট হবে
    if (name === "category" && value !== "Accessories") {
      setProduct({ ...product, [name]: value, subCategory: "" });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // সাইজ সিলেক্টর
  const handleSizeChange = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter((s) => s !== size)
      : [...product.sizes, size];
    setProduct({ ...product, sizes: updatedSizes });
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

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("sku", product.sku);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory); // 👈 ব্যাকএন্ডে সাব-ক্যাটাগরি পাঠানো হচ্ছে
    formData.append("fabric", product.fabric);
    formData.append("shirtDetails", product.shirtDetails);
    formData.append("dupattaDetails", product.dupattaDetails);
    formData.append("trouserDetails", product.trouserDetails);
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

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm font-sans">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Add New Luxury Premium Dress</h2>
        <p className="text-xs text-gray-500 mt-1">FC ব্র্যান্ডের রেড কালার থিমে নতুন পাকিস্তানি কালেকশন যুক্ত করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Product Title</label>
            <input 
              type="text" 
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="e.g., 3 Piece Pure Embroidered Silk Suit" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm text-gray-700 bg-gray-50/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Product SKU / Code</label>
            <input 
              type="text" 
              name="sku"
              value={product.sku}
              onChange={handleChange}
              placeholder="e.g., S114744" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm text-gray-700 bg-gray-50/30"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Price (BDT)</label>
            <input 
              type="number" 
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="e.g., 8500" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition text-sm text-gray-700 bg-gray-50/30"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Category</label>
            <select 
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none bg-white transition text-sm text-gray-700"
              required
            >
              <option value="">Choose Category</option>
              <option value="Organza Items">Organza Items</option>
              <option value="Chiffon Items">Chiffon Items</option>
              <option value="Gawn Collections">Gawn Collections</option>
              <option value="Chiffon 2pis">Chiffon 2pis</option>
              <option value="Mona Embroidery">Mona Embroidery</option>
              <option value="Semi Bridal Boutique">Semi Bridal Boutique</option>
              <option value="Cotton Collections">Cotton Collections</option>
              <option value="Kids Collections">Kids Collections</option>
              <option value="Accessories">Accessories</option> {/* 👈 যুক্ত করা হয়েছে */}
            </select>
          </div>
        </div>

        {/* 🌟 ডায়নামিক Accessories Sub-Category Dropdown */}
        {product.category === "Accessories" && (
          <div className="p-4 bg-red-50/40 border border-red-100 rounded-xl transition-all duration-300">
            <label className="block text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
              Select Accessories Type / Collection
            </label>
            <select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-red-200 rounded-xl focus:ring-1 focus:ring-red-600 outline-none bg-white text-sm text-gray-700 font-medium"
              required
            >
              <option value="">Choose Sub-Category</option>
              <option value="Shoes">Shoes</option>
              <option value="Singles">Singles</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Bags">Bags</option>
              <option value="Others">Others</option>
            </select>
          </div>
        )}

        {/* Filter Colors */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
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
                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-all ${
                    isSelected 
                      ? "border-red-600 bg-red-50 text-red-700 font-bold" 
                      : "border-gray-200 bg-white text-gray-600 hover:border-red-200"
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${color.class}`} />
                  <span>{color.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Dress Specification</h3>
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 mb-1">Fabric Details</label>
            <input 
              type="text" 
              name="fabric"
              value={product.fabric}
              onChange={handleChange}
              placeholder="e.g., Pure Silk shirt with Organza Dupatta"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs bg-white focus:outline-none focus:border-red-600"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Shirt Details</label>
              <textarea name="shirtDetails" value={product.shirtDetails} onChange={handleChange} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-600 resize-none" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Dupatta Details</label>
              <textarea name="dupattaDetails" value={product.dupattaDetails} onChange={handleChange} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-600 resize-none" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 mb-1">Trouser Details</label>
              <textarea name="trouserDetails" value={product.trouserDetails} onChange={handleChange} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-red-600 resize-none" />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Available Sizes</label>
          <div className="flex flex-wrap gap-2">
            {["XS / 34", "S / 36", "M / 38", "L / 40", "XL / 42", "XXL / 44"].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
                  product.sizes.includes(size)
                    ? "bg-red-50 text-red-600 border-red-600 font-bold"
                    : "bg-white text-gray-600 border-gray-200 hover:text-red-600 hover:bg-red-50/20"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Main Cover Image (ইউজার চয়েসের জন্য মূল ছবি)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer bg-gray-50 hover:border-red-500 relative h-32 flex flex-col justify-center items-center">
                <input type="file" onChange={handleMainImageChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <span className="text-xs text-red-600 font-bold">Upload Main Image</span>
                <span className="text-[10px] text-gray-400 mt-1">সিঙ্গেল মেইন ব্যানার ফাইল</span>
              </div>
              {product.mainImage && (
                <div className="relative w-24 aspect-[3/4] rounded-lg overflow-hidden border border-red-200">
                  <img src={product.mainImage} alt="Main" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Sub-Gallery Images (মেইন ইমেজের আন্ডারে ৩টি স্লাইডার ছবি)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Gallery Image {index + 1}</span>
                  <div className="w-full relative h-24 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden">
                    {product.galleryImages[index] ? (
                      <img src={product.galleryImages[index]} alt="Gallery" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-gray-400">No Image</span>
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
          className={`w-full text-white font-bold text-xs py-4 px-4 rounded-xl transition-all duration-300 tracking-widest uppercase shadow-sm ${
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