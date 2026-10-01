# {{nombre}}

Proyecto generado con **create-anthony-app** (React + Vite + Firebase Auth).

## Antes de ejecutar: configura Firebase

1. Entra a la [Firebase Console](https://console.firebase.google.com) y crea un proyecto.
2. Agrega una **app web** (icono `</>`) y copia la configuración.
3. Ve a **Authentication > Sign-in method** y activa **Correo/Contraseña** y **Google**.
4. En **Authentication > Settings > Dominios autorizados**, verifica que esté `localhost`.
5. Completa el archivo `.env` (si no lo hizo el generador, copia `.env.example`).

## Ejecutar

```bash
npm install
npm run dev
```

La app abre en `http://localhost:5173`.

## Estructura

```
src/
├── components/   # ProtectedRoute
├── context/      # AuthContext (usuario logueado)
├── pages/        # Login, Registro, Home
├── services/     # firebase.js y mensajes de error
└── App.jsx       # Rutas
```

## Errores comunes

| Error | Causa |
|---|---|
| `auth/invalid-api-key` | Falta o está mal el `apiKey` en `.env` |
| `auth/operation-not-allowed` | No activaste ese método en Authentication |
| Falla el login con Google | Falta activar Google o el dominio autorizado |

Recuerda reiniciar `npm run dev` después de cambiar el `.env`.
