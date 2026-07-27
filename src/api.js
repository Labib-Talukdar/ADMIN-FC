
// import axios from "axios";

// // Vite-এর Environment Variable বা Fallback Localhost URL
// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://fc-server-side-1.onrender.com",
  
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default API;














// // next step 
import axios from "axios";

// ব্রাউজার যদি লোকালহোস্টে চলে, তবে লোকাল ইউআরএল নেবে, আর লাইভে থাকলে Render-এর ইউআরএল নেবে
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const BASE_URL = import.meta.env.VITE_API_URL || (isLocalhost ? "http://localhost:5000" : "https://fc-server-side-1.onrender.com");

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // Render-এর স্লো রেসপন্সের জন্য ৬০ সেকেন্ড টাইমআউট
});

export default API;