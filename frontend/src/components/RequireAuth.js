import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const user = useAuth();
  const location = useLocation();

  useEffect(() => {}, [user]);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireAuth;
