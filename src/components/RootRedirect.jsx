import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RootRedirect() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const target = isAuthenticated ? "/bets" : "/home";

  if (location.pathname === target) {
    return null;
  }

  return <Navigate to={target} replace />;
}
