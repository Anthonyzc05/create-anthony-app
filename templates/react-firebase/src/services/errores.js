// Traduce los códigos de error de Firebase Auth a mensajes entendibles
const mensajes = {
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/user-not-found": "No existe una cuenta con ese correo.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/email-already-in-use": "Ese correo ya está registrado.",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
  "auth/invalid-email": "El correo no es válido.",
  "auth/operation-not-allowed":
    "Ese método de acceso no está activado. Actívalo en Firebase > Authentication > Sign-in method.",
  "auth/unauthorized-domain":
    "Dominio no autorizado. Agrega localhost en Firebase > Authentication > Settings.",
  "auth/popup-closed-by-user": "Cerraste la ventana de Google antes de terminar.",
  "auth/too-many-requests": "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
};

export function mensajeError(codigo) {
  return mensajes[codigo] ?? `Ocurrió un error (${codigo ?? "desconocido"}).`;
}
