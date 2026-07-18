
// import axios from 'axios';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
 
 
// const Login = () => {
//      const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

  

//     const onSubmit = async (data) => {
//     try {
//         const response = await axios.post('http://localhost:5000/api/auth/admin-login', data,{
//             withCredentials: true
//         });

//         if(response.data.success){
//             navigate('/admin/dashboard');
//         }
//     }catch (error) {
//         console.error("Login Failed:",
//              error.response?.data?.message || error.message);
//         alert(
//             error.response?.data?.message || "something went wrong") ;
//     }
//    };
  

   
  
 

 

//   return (
//     <div className="flex h-screen w-full items-center justify-center bg-[#022525] font-sans antialiased">
//       <div className="flex w-full max-w-4xl px-6 md:px-12">
        
//           {/* left logo and brand name */}
//         <div className="flex w-1/2 flex-col items-center justify-center pr-8 border-r border-gray-600/40">
//           <div className="flex items-center gap-4">
            
//             <div className="relative flex h-16 w-16 items-center justify-center rounded-tr-3xl rounded-bl-3xl bg-gradient-to-tr from-cyan-400 via-teal-500 to-orange-400 p-1 shadow-lg">
//               <div className="flex h-full w-full items-center justify-center rounded-tr-2xl rounded-bl-2xl bg-[#022525]">
                   
//               </div>
//             </div>
            
//             <h1 className="text-3xl font-light tracking-wide text-white">
//                Fashion Classy
//             </h1>
//           </div>
//         </div>

//         {/* login form */}
//         <div className="flex w-1/2 flex-col justify-center pl-12 text-center">
//           <h2 className="text-4xl font-light tracking-wider text-white mb-2">
//             Welcome
//           </h2>
//           <p className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-medium">
//             Please login to Admin Dashboard.
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-sm space-y-4">
            
//             {/*  Email input filed */}
//             <div>
//               <input
//                 type="email"
//                 placeholder="EMAIL ADDRESS"
//                 {...register('email', { 
//                   required: 'Email is required', 
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: 'Invalid email address'
//                   }
//                 })}
//                 className={`w-full rounded bg-white px-4 py-2.5 text-sm font-semibold tracking-wider text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-orange-500 ${
//                   errors.email ? 'ring-2 ring-red-500' : ''
//                 }`}
//               />
//               {/*  email error message */}
//               {errors.email && (
//                 <p className="text-left text-xs text-red-400 mt-1 pl-1">{errors.email.message}</p>
//               )}
//             </div>

//             {/*  password input filed*/}
//             <div>
//               <input
//                 type="password"
//                 placeholder="PASSWORD"
//                 {...register('password', { 
//                   required: 'Password is required',
//                   minLength: {
//                     value: 6,
//                     message: 'Password must be at least 6 characters'
//                   }
//                 })}
//                 className={`w-full rounded bg-white px-4 py-2.5 text-sm font-semibold tracking-wider text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-orange-500 ${
//                   errors.password ? 'ring-2 ring-red-500' : ''
//                 }`}
//               />
//               {/*  password error message */}
//               {errors.password && (
//                 <p className="text-left text-xs text-red-400 mt-1 pl-1">{errors.password.message}</p>
//               )}
//             </div>

//             {/*  login button */}
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 className="w-full rounded bg-[#ea580c] py-2.5 text-xs font-bold uppercase tracking-widest text-white transition duration-200 hover:bg-orange-600 active:scale-[0.98] shadow-md"
//               >
//                 Login
//               </button>
//             </div>
//           </form>

//           {/*  forgat password*/}
//           <div className="mt-6">
//             <a
//               href="#forgot-password"
//               className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition duration-150"
//             >
//               Forgotten Your Password?
//             </a>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;





















 

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
      // const response = await axios.post('http://localhost:5000/api/auth/admin-login',
       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin-login`, data, {
  withCredentials: true
});

      if (response.data.success) {
        // 🎯 ব্রাউজারের localStorage-এ ডাটা সেভ করা হচ্ছে
        // ব্যাকএন্ড থেকে আসা টোকেনটি সেভ করুন (যদি ব্যাকএন্ড response.data.token পাঠায়)
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        } else {
          // যদি টোকেন না পাঠিয়ে শুধু কুকি (HttpOnly Cookie) ব্যবহার করেন, তবে একটি ফ্ল্যাগ রাখতে পারেন
          localStorage.setItem("token", "true"); 
        }

        // ইউজার অবজেক্ট এবং এডমিন রোল সেট করা হচ্ছে
        // ব্যাকএন্ড থেকে ইউজার ডাটা আসলে response.data.user দিতে পারেন, অন্যথায় ম্যানুয়ালি:
        localStorage.setItem("user", JSON.stringify({ role: "admin" }));

        // সফলভাবে সেভ হওয়ার পর ড্যাশবোর্ডে রিডাইরেক্ট
        navigate('/admin/dashboard/dashboard'); // আপনার রাউটার অনুযায়ী মূল ড্যাশবোর্ড পেজের পাথ
      }
    } catch (error) {
      console.error("Login Failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#022525] font-sans antialiased">
      <div className="flex w-full max-w-4xl px-6 md:px-12">
        
        {/* left logo and brand name */}
        <div className="flex w-1/2 flex-col items-center justify-center pr-8 border-r border-gray-600/40">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-tr-3xl rounded-bl-3xl bg-gradient-to-tr from-cyan-400 via-teal-500 to-orange-400 p-1 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-tr-2xl rounded-bl-2xl bg-[#022525]"></div>
            </div>
            <h1 className="text-3xl font-light tracking-wide text-white">
               Fashion Classy
            </h1>
          </div>
        </div>

        {/* login form */}
        <div className="flex w-1/2 flex-col justify-center pl-12 text-center">
          <h2 className="text-4xl font-light tracking-wider text-white mb-2">
            Welcome
          </h2>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-8 font-medium">
            Please login to Admin Dashboard.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto w-full max-w-sm space-y-4">
            
            {/* Email input filed */}
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

            {/* password input filed*/}
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

            {/* login button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded bg-[#ea580c] py-2.5 text-xs font-bold uppercase tracking-widest text-white transition duration-200 hover:bg-orange-600 active:scale-[0.98] shadow-md"
              >
                Login
              </button>
            </div>
          </form>

          {/* forgat password*/}
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