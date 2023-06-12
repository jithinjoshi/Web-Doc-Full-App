import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectUser } from '../Redux/User/userSlice';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  console.log(user,"::::")
  let location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;