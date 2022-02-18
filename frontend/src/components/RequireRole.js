import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const RequireRole = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  return (
    <>
      {user.role === role ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireRole;
