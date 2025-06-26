// TEST: Por qué servicios.html se marca en todas las páginas

// Simular diferentes paths
const testPaths = [
  "/c:/Users/potac/OneDrive/Escritorio/PaginaGastronomeGit/gastronome/index.html",
  "/c:/Users/potac/OneDrive/Escritorio/PaginaGastronomeGit/gastronome/nosotros.html",
  "/c:/Users/potac/OneDrive/Escritorio/PaginaGastronomeGit/gastronome/servicios.html",
];

const pages = [
  "index.html",
  "nosotros.html",
  "servicios.html",
  "portafoliominimal.html",
  "contacto.html",
];

console.log("=== ANÁLISIS DE path.includes() ===");
testPaths.forEach((path) => {
  const pathLower = path.toLowerCase();
  console.log(`\nPath: ${pathLower}`);

  pages.forEach((page) => {
    const includes = pathLower.includes(page);
    if (includes) {
      console.log(`  ✓ COINCIDE con: ${page}`);
    }
  });
});

// El problema puede ser que "servicios" está contenido en algún otro texto
console.log("\n=== BUSCANDO SUBCADENAS PROBLEMÁTICAS ===");
const testText = "nosotros.html";
console.log(
  `"nosotros.html".includes("servicios.html"): ${testText.includes(
    "servicios.html"
  )}`
);
console.log(
  `"nosotros.html".includes("servicios"): ${testText.includes("servicios")}`
);
console.log(`"nosotros.html".includes("ios"): ${testText.includes("ios")}`);
