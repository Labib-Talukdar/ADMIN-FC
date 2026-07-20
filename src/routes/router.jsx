// import { createBrowserRouter } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
// import Bot from "../pages/bot/Bot";
// import Login from "../pages/Auth/Login";
// import AuthLayout from "../layouts/AuthLayout";
// import Dashboard from "../pages/Dashboard/Dashboard";
// import MainLayout from "../layouts/MainLayout";
// import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "../components/navbar/Navbar";
// import Categories from "../pages/Dashboard/Categories";
// import AddProduct from "../pages/Dashboard/AddProduct";
// import EditProduct from "../pages/Dashboard/EditProduct";
 

// const router = createBrowserRouter([
//         {
//         path:'/',
//         element: <MainLayout></MainLayout>,
//         children:[
//             {path:'fashion-classy/dashboard',element:<Bot></Bot>}
//         ]
//     },
//     {
//         path:'/admin/dashboard',
//         element: <DashboardLayout></DashboardLayout>,
//         children: [
//             {path:"sidebar", element: <Sidebar></Sidebar>},
//             {path:"navbar", element: <Navbar></Navbar>},
//             {path:'dashboard', element:<Dashboard></Dashboard>},
//             {path:"dashboard/categories", element: <Categories></Categories>},
//             {path:"add-product", element: <AddProduct></AddProduct>},
//          { path: 'edit-product', element: <EditProduct></EditProduct> },
//             { path: 'edit-product/:id', element: <EditProduct></EditProduct> }
            
             
//         ]
        
//     },

//     {
//         path:'/super-secret-login-gateway',
//         element: <AuthLayout></AuthLayout>,
//         children: [
//             {path:'admin-login', element: <Login></Login>}
//         ]
        
//     }
// ])

// export default router




























// import { createBrowserRouter, Navigate } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout";
//  import Bot from "../pages/bot/Bot"; //  
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

 
// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
 
//   if (!token || user?.role !== "admin") {
 
//     return <Navigate to="/super-secret-login-gateway/admin-login" replace />;
//   }

  
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
  
 
//   {
//     path: '/admin/dashboard',
//     element: <ProtectedRoute />, 
//     children: [
//       {
       
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





































import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Categories from "../pages/Dashboard/Categories";
import AddProduct from "../pages/Dashboard/AddProduct";
import EditProduct from "../pages/Dashboard/EditProduct";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Orders from "../pages/orders/Orders";

// 🔒 Protected Route
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  // ✅ Home = Login Page
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },

  // 🔒 Protected Admin Dashboard
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "edit-product",
            element: <EditProduct />,
          },
          {
            path: "edit-product/:id",
            element: <EditProduct />,
          },
          {
            path: "orders", 
            element: <Orders />,
          },
          {
            path: "sidebar",
            element: <Sidebar />,
          },
          {
            path: "navbar",
            element: <Navbar />,
          },

        ],
      },
    ],
  },

 

  // ❌ সব ভুল URL এখানে আসবে
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;