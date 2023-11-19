import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [location]);

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
