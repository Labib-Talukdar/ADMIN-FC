import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Bot from "../pages/bot/Bot";
import Login from "../pages/Auth/Login";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Categories from "../pages/Dashboard/Categories";
import AddProduct from "../pages/Dashboard/AddProduct";
import EditProduct from "../pages/Dashboard/EditProduct";
 

const router = createBrowserRouter([
        {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {path:'fashion-classy/dashboard',element:<Bot></Bot>}
        ]
    },
    {
        path:'/admin/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {path:"sidebar", element: <Sidebar></Sidebar>},
            {path:"navbar", element: <Navbar></Navbar>},
            {path:'dashboard', element:<Dashboard></Dashboard>},
            {path:"dashboard/categories", element: <Categories></Categories>},
            {path:"add-product", element: <AddProduct></AddProduct>},
         { path: 'edit-product', element: <EditProduct></EditProduct> },
            { path: 'edit-product/:id', element: <EditProduct></EditProduct> }
            
             
        ]
        
    },

    {
        path:'/super-secret-login-gateway',
        element: <AuthLayout></AuthLayout>,
        children: [
            {path:'admin-login', element: <Login></Login>}
        ]
        
    }
])

export default router




























// import { createBrowserRouter, Navigate } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
//  import Bot from "../pages/Bot/Bot"; //  
// import Login from "../pages/Auth/Login";
// import AuthLayout from "../layouts/AuthLayout";
// import Dashboard from "../pages/Dashboard/Dashboard";
// import MainLayout from "../layouts/MainLayout";
// import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/navbar/Navbar";
// import Categories from "../pages/Dashboard/Categories";
// import AddProduct from "../pages/Dashboard/AddProduct";
// import EditProduct from "../pages/Dashboard/EditProduct";
// import DeleteProduct from "../pages/Dashboard/DeleteProduct";
// import { Outlet } from "react-router-dom"; // 👈 Outlet ইম্পোর্ট করতে হবে

// // 🔒 ১. প্রটেক্টেড রাউট গেটওয়ে কম্পোনেন্ট
// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // যদি টোকেন না থাকে অথবা ইউজারের রোল 'admin' না হয়
//   if (!token || user?.role !== "admin") {
//     // সরাসরি সিক্রেট লগইন গেটওয়েতে রিডাইরেক্ট করে দেবে
//     return <Navigate to="/super-secret-login-gateway/admin-login" replace />;
//   }

//   // সব ঠিক থাকলে ড্যাশবোর্ডের ভেতরের পেজগুলো (Children) দেখতে দেবে
//   return <Outlet />;
// };

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout></MainLayout>,
//     children: [
//       { path: 'fashion-classy/dashboard', element: <Bot></Bot> }
//     ]
//   },
  
//   // 🔒 ২. আপনার অ্যাডমিন ড্যাশবোর্ড রাউট গ্রুপ (এখন সম্পূর্ণ সুরক্ষিত)
//   {
//     path: '/admin/dashboard',
//     element: <ProtectedRoute />, // 👈 প্রধান এলিমেন্ট হিসেবে ProtectedRoute বসিয়ে দিলাম
//     children: [
//       {
//         // ড্যাশবোর্ডের মূল লেআউটটি এখানে থাকবে
//         element: <DashboardLayout></DashboardLayout>, 
//         children: [
//           { path: "sidebar", element: <Sidebar></Sidebar> },
//           { path: "navbar", element: <Navbar></Navbar> },
//           { path: 'dashboard', element: <Dashboard></Dashboard> },
//           { path: "dashboard/categories", element: <Categories></Categories> },
//           { path: "add-product", element: <AddProduct></AddProduct> },
//           { path: 'edit-product', element: <EditProduct></EditProduct> },
//           { path: 'edit-product/:id', element: <EditProduct></EditProduct> }
//         ]
//       }
//     ]
//   },

//   {
//     path: '/super-secret-login-gateway',
//     element: <AuthLayout></AuthLayout>,
//     children: [
//       { path: 'admin-login', element: <Login></Login> }
//     ]
//   }
// ]);

// export default router;