import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user, salir } = useAuth();

  return (
    <main className="card">
      <h1>¡Bienvenido! 🎉</h1>
      <p>
        Sesión iniciada como <strong>{user.email}</strong>
      </p>
      <p>Esta página está protegida: solo la ven usuarios autenticados.</p>
      <button onClick={salir}>Cerrar sesión</button>
    </main>
  );
}
