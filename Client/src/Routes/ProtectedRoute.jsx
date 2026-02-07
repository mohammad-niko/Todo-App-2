import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
  const isAuthenticated = useSelector((store) => store.User.token);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" replace />
  );
}

export default ProtectedRoute;
