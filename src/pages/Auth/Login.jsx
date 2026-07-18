import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("কোথায় রিকোয়েস্ট যাচ্ছে: ", import.meta.env.VITE_API_URL);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin-login`, data, {
        withCredentials: true
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token || "true");
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));
        navigate('/admin/dashboard/dashboard'); 
      }
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#022525] font-sans antialiased py-10 md:py-0">
      {/* 
        Responsive Container: 
        মোবাইলে flex-col (ওপর-নিচে) এবং ট্যাবলেটের পর থেকে flex-row (পাশাপাশি) হবে।
      */}
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 px-6 md:flex-row md:gap-0 md:px-12">
        
        {/* Left/Top Logo Box */}
        {/* মোবাইলে পুরো চওড়া (w-full), ডেক্সটপে অর্ধেক (md:w-1/2) */}
        <div className="flex w-full flex-col items-center justify-center pb-6 border-b border-gray-600/40 md:w-1/2 md:border-b-0 md:border-r md:pb-0 md:pr-8">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-tr-3xl rounded-bl-3xl bg-gradient-to-tr from-cyan-400 via-teal-500 to-orange-400 p-1 shadow-lg md:h-16 md:w-16">
              <div className="flex h-full w-full items-center justify-center rounded-tr-2xl rounded-bl-2xl bg-[#022525]"></div>
            </div>
            <h1 className="text-2xl font-light tracking-wide text-white md:text-3xl">
               Fashion Classy
            </h1>
          </div>
        </div>

        {/* Right/Bottom Login Form */}
        {/* মোবাইলে প্যাডিং অ্যাডজাস্ট করা হয়েছে (pl-0 থেকে md:pl-12) */}
        <div className="flex w-full flex-col justify-center pl-0 text-center md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-light tracking-wider text-white mb-2 md:text-4xl">
            Welcome
          </h2>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-medium md:text-xs md:mb-8">
            Please login to Admin Dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-sm space-y-4">
            
            {/* Email input field */}
            <div>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                {...register('email', { 
                  required: 'Email is required', 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`w-full rounded bg-white px-4 py-2.5 text-sm font-semibold tracking-wider text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-orange-500 ${
                  errors.email ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-left text-xs text-red-400 mt-1 pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password input field */}
            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className={`w-full rounded bg-white px-4 py-2.5 text-sm font-semibold tracking-wider text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-orange-500 ${
                  errors.password ? 'ring-2 ring-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="text-left text-xs text-red-400 mt-1 pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded bg-[#ea580c] py-2.5 text-xs font-bold uppercase tracking-widest text-white transition duration-200 hover:bg-orange-600 active:scale-[0.98] shadow-md"
              >
                Login
              </button>
            </div>
          </form>

          {/* Forgot password */}
          <div className="mt-6">
            <a
              href="#forgot-password"
              className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition duration-150"
            >
              Forgotten Your Password?
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;