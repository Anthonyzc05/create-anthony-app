# create-anthony-app

Genera un proyecto React + Firebase listo para usar, con login, desde la terminal. No hay que descargar nada.

## Cómo usarlo

Necesitas **Node.js 18 o superior** (compruébalo con `node -v`).

**1.** Abre una terminal en la carpeta donde quieras tu proyecto.

**2.** Ejecuta este comando, cambiando `mi-proyecto` por el nombre que quieras (sin espacios y en minúsculas; la herramienta crea la carpeta):

```bash
npx github:Anthonyzc05/create-anthony-app react-firebase mi-proyecto
```

**3.** Responde las preguntas con los datos de tu proyecto de Firebase. Puedes dejarlas vacías y completar el archivo `.env` después.

**4.** Entra a la carpeta e inicia el proyecto:

```bash
cd mi-proyecto
npm install
npm run dev
```

**5.** Abre `http://localhost:5173` en el navegador.

## Antes de probar el login: configura Firebase

1. En la [consola de Firebase](https://console.firebase.google.com), crea un proyecto.
2. Agrega una **app web** (icono `</>`) y copia `apiKey`, `authDomain`, `projectId` y `appId`.
3. En **Authentication > Sign-in method**, activa **Correo/Contraseña** y **Google**.
4. En **Authentication > Configuración > Dominios autorizados**, verifica que esté `localhost`.

Si cambias el `.env`, reinicia `npm run dev`.

## Qué incluye la plantilla `react-firebase`

- React + Vite
- Registro e inicio de sesión con correo y con Google
- Rutas protegidas
- Mensajes de error claros en español
- Aviso en pantalla si falta configurar Firebase
- `.env.example`, `.gitignore` y README propios

## Errores comunes

| Error | Causa |
|---|---|
| `auth/invalid-api-key` | Falta o está mal el `apiKey` en `.env` |
| `auth/operation-not-allowed` | No activaste ese método en Authentication |
| Falla el login con Google | Falta activar Google o el dominio autorizado |

## Licencia

MIT
