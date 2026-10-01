import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, cargando } = useAuth();

  if (cargando) return <p className="centrado">Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
