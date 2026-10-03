#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { stdin as input, stdout as output } from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CARPETA_PLANTILLAS = path.join(__dirname, "templates");

// Plantillas disponibles. Para agregar otra: crea la carpeta en /templates y añádela aquí.
const PLANTILLAS = {
  "react-firebase": {
    descripcion: "React + Vite + Firebase Auth (email y Google) con rutas protegidas",
    usaFirebase: true,
  },
};

function mostrarAyuda() {
  console.log("\nUso: npx create-anthony-app <plantilla> <nombre-del-proyecto>\n");
  console.log("Plantillas disponibles:");
  for (const [nombre, info] of Object.entries(PLANTILLAS)) {
    console.log(`  ${nombre.padEnd(16)} ${info.descripcion}`);
  }
  console.log("\nEjemplo: npx create-anthony-app react-firebase mi-proyecto\n");
}

async function existe(ruta) {
  try {
    await fs.access(ruta);
    return true;
  } catch {
    return false;
  }
}

// Reemplaza {{nombre}} en los archivos que lo necesitan
async function personalizar(destino, nombre) {
  for (const archivo of ["package.json", "README.md", "index.html"]) {
    const ruta = path.join(destino, archivo);
    if (!(await existe(ruta))) continue;
    const texto = await fs.readFile(ruta, "utf8");
    await fs.writeFile(ruta, texto.replaceAll("{{nombre}}", nombre));
  }
}

async function configurarFirebase(destino) {
  // Leemos línea por línea con un iterador: funciona al escribir, al pegar varias líneas
  // juntas y con Ctrl+D (fin de entrada), a diferencia de rl.question
  const rl = readline.createInterface({ input });
  const lineas = rl[Symbol.asyncIterator]();
  const preguntar = async (texto) => {
    output.write(texto);
    const { value } = await lineas.next();
    return value ?? "";
  };

  console.log("\n🔥 Configuración de Firebase");
  console.log("Búscala en: Firebase Console > Configuración del proyecto > Tus apps > App web");
  console.log("(Puedes dejar un campo vacío y completarlo después en el archivo .env)\n");

  const campos = {
    VITE_FIREBASE_API_KEY: await preguntar("apiKey: "),
    VITE_FIREBASE_AUTH_DOMAIN: await preguntar("authDomain: "),
    VITE_FIREBASE_PROJECT_ID: await preguntar("projectId: "),
    VITE_FIREBASE_APP_ID: await preguntar("appId: "),
  };
  rl.close();

  const contenido =
    Object.entries(campos)
      .map(([clave, valor]) => `${clave}=${valor.trim()}`)
      .join("\n") + "\n";

  await fs.writeFile(path.join(destino, ".env"), contenido);

  const faltantes = Object.entries(campos)
    .filter(([, valor]) => !valor.trim())
    .map(([clave]) => clave);

  console.log("\n✅ Archivo .env creado");
  if (faltantes.length > 0) {
    console.log("⚠️  Quedaron vacíos: " + faltantes.join(", "));
    console.log("   Complétalos en .env antes de ejecutar la app.");
  }
}

async function main() {
  const [plantilla, nombreProyecto] = process.argv.slice(2);

  if (!plantilla || !nombreProyecto || !PLANTILLAS[plantilla]) {
    if (plantilla && !PLANTILLAS[plantilla]) {
      console.error(`\n❌ La plantilla "${plantilla}" no existe.`);
    }
    mostrarAyuda();
    process.exit(1);
  }

  const destino = path.resolve(process.cwd(), nombreProyecto);

  if (await existe(destino)) {
    console.error(`\n❌ La carpeta "${nombreProyecto}" ya existe. Elige otro nombre.\n`);
    process.exit(1);
  }

  console.log(`\n📁 Creando "${nombreProyecto}" con la plantilla ${plantilla}...`);
  await fs.cp(path.join(CARPETA_PLANTILLAS, plantilla), destino, { recursive: true });

  // npm ignora los archivos llamados .gitignore al publicar, por eso la plantilla usa _gitignore
  const gitignoreTemporal = path.join(destino, "_gitignore");
  if (await existe(gitignoreTemporal)) {
    await fs.rename(gitignoreTemporal, path.join(destino, ".gitignore"));
  }

  await personalizar(destino, path.basename(destino));

  if (PLANTILLAS[plantilla].usaFirebase) {
    await configurarFirebase(destino);
  }

  console.log("\n🎉 Proyecto creado. Ahora ejecuta:\n");
  console.log(`  cd ${nombreProyecto}`);
  console.log("  npm install");
  console.log("  npm run dev\n");
  console.log("Recuerda activar Authentication (Correo/Contraseña y Google) en tu consola de Firebase.");
  console.log("\n🎨 El diseño es solo una base: cámbialo a tu gusto.");
  console.log("   Estilos: src/index.css  ·  Pantallas: src/pages/");
  console.log("   Tus datos de Firebase ya están en .env, así que puedes rediseñar sin perder la conexión.\n");
}

main().catch((err) => {
  console.error("\n❌ Ocurrió un error:", err.message);
  process.exit(1);
});
