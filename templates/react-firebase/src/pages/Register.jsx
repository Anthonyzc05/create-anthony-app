import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { mensajeError } from "../services/errores.js";

export default function Register() {
  const { registrar, entrarConGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ejecutar = async (accion) => {
    setError("");
    try {
      await accion();
      navigate("/");
    } catch (e) {
      setError(mensajeError(e.code));
    }
  };

  const enviar = (e) => {
    e.preventDefault();
    ejecutar(() => registrar(email, password));
  };

  return (
    <main className="card">
      <h1>Crear cuenta</h1>
      <form onSubmit={enviar}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña (mínimo 6 caracteres)" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrarme</button>
      </form>
      <button className="google" onClick={() => ejecutar(entrarConGoogle)}>
        Registrarme con Google
      </button>
      {error && <p className="error">{error}</p>}
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  );
}
