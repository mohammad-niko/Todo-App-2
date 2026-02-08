import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedauthRoute() {
  const isAuthenticated = useSelector((store) => store.User.token);
  return isAuthenticated ? <Navigate to="/"  /> : <Outlet />;
}

export default ProtectedauthRoute;
