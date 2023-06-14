import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAdmin } from '../redux/adminSlice';

const ProtectedRoute = ({ children }) => {
  const admin = useSelector(selectAdmin);
  let location = useLocation();

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;