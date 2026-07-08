import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedAdminRoute() {
  const { loading, isLoggedIn } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/admin-login" replace />;
}