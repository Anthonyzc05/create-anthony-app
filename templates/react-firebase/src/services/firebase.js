import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// true solo si todas las variables tienen valor
export const firebaseConfigurado = Object.values(firebaseConfig).every(Boolean);

// Si faltan datos no inicializamos Firebase (evita el error críptico auth/invalid-api-key)
export const auth = firebaseConfigurado ? getAuth(initializeApp(firebaseConfig)) : null;
export const googleProvider = new GoogleAuthProvider();
