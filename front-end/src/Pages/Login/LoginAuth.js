import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function LoginAuth({ children }) {
  const user = localStorage.getItem("user");
  const location = useLocation();

  if (user) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}
