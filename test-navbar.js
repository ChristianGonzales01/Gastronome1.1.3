// Script de prueba para verificar la lógica del navbar
function testNavbarLogic(mockPath) {
  console.log(`\n=== Probando: ${mockPath} ===`);

  const path = mockPath.toLowerCase();
  const fileName = path.split("/").pop() || "index.html";

  console.log(`Path: ${path}`);
  console.log(`FileName: ${fileName}`);

  const pageMap = {
    "index.html": ".HOME_ACTIVE",
    "nosotros.html": ".NOSOTROS_ACTIVE",
    "servicios.html": ".SERVICIOS_ACTIVE",
    "portafoliominimal.html": ".PORTAFOLIO_ACTIVE",
    "contacto.html": ".CONTACTO_ACTIVE",
  };

  let pageFound = false;

  for (const [page, selector] of Object.entries(pageMap)) {
    const shouldActivate =
      fileName === page ||
      (page === "index.html" &&
        (path === "/" || path === "" || path.endsWith("/")));

    console.log(`${page}: shouldActivate=${shouldActivate}`);

    if (shouldActivate) {
      console.log(`✅ ACTIVAR: ${page} -> ${selector}`);
      pageFound = true;
      break;
    }
  }

  if (!pageFound) {
    console.log(
      "❌ No se encontró página específica, activar HOME por defecto"
    );
  }
}

// Probar diferentes rutas
testNavbarLogic("/Nosotros.html");
testNavbarLogic("/Servicios.html");
testNavbarLogic("/PortafolioMinimal.html");
testNavbarLogic("/Contacto.html");
testNavbarLogic("/index.html");
testNavbarLogic("/");
