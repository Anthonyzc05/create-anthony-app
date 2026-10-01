import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!auth) {
      setCargando(false);
      return;
    }
    // Se ejecuta al cargar y cada vez que el usuario entra o sale
    const cancelar = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setCargando(false);
    });
    return cancelar;
  }, []);

  const registrar = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const entrar = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const entrarConGoogle = () => signInWithPopup(auth, googleProvider);
  const salir = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, cargando, registrar, entrar, entrarConGoogle, salir }}>
      {children}
    </AuthContext.Provider>
  );
}
