import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { mensajeError } from "../services/errores.js";

export default function Login() {
  const { entrar, entrarConGoogle } = useAuth();
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
    ejecutar(() => entrar(email, password));
  };

  return (
    <main className="card">
      <h1>Iniciar sesión</h1>
      <form onSubmit={enviar}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      <button className="google" onClick={() => ejecutar(entrarConGoogle)}>
        Continuar con Google
      </button>
      {error && <p className="error">{error}</p>}
      <p>
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </main>
  );
}
