import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));


    if (!token || user?.role !== "admin") {
        return <Navigate to="/login" replace></Navigate>
    }

    return <Outlet></Outlet>
};

export default ProtectedRoute;