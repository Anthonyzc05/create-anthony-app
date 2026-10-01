import { Routes, Route, Navigate } from "react-router-dom";
import { firebaseConfigurado } from "./services/firebase";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  // Aviso claro en pantalla si faltan las variables del .env
  if (!firebaseConfigurado) {
    return (
      <main className="card">
        <h1>⚠️ Falta configurar Firebase</h1>
        <p>
          Completa las variables <code>VITE_FIREBASE_*</code> en el archivo <code>.env</code> y
          reinicia con <code>npm run dev</code>.
        </p>
      </main>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
