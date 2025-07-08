// src/main-component/router/AdminRoute.js

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "admin") {
    toast.error("Access Denied: You are not an admin.");
    return <Navigate to="/user/dashboard" replace />;
  }
  return children;
};

export default AdminRoute;
