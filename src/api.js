// import axios from "axios";

// const API = axios.create({
//   // Render-এ সেট করা VITE_API_URL নিবে, আর লোকাল ডেভেলপমেন্টের সময় fallback হিসেবে localhost নিবে
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// });

// export default API;






 
import axios from "axios";

// Vite-এর Environment Variable বা Fallback Localhost URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;