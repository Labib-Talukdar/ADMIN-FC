import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // লোকালে চেক করার জন্য ব্যাকএন্ডের পোর্ট
});

export default API;