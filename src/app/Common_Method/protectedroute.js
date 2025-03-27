"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem("token"); // or localStorage if needed
      if (!token) {
        router.replace("/login"); // Redirect to login if no token
      } else {
        setIsAuthenticated(true);
      }
    }, []);

    if (!isAuthenticated) return null; // Prevents flicker

    return <WrappedComponent {...props} />;
  };
};

export default ProtectedRoute;
