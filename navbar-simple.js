/**
 * NAVBAR MÓVIL SIMPLE - GASTRONOME
 * Código simplificado para funcionalidad básica del navbar
 * Requiere Bootstrap 5 JavaScript
 */

// Función para inicializar el navbar cuando Bootstrap esté disponible
function initNavbar() {
  console.log("🔧 Inicializando navbar móvil simple...");

  // Verificar que Bootstrap esté disponible
  if (typeof bootstrap === "undefined") {
    console.warn("⚠️ Bootstrap no está disponible, reintentando...");
    setTimeout(initNavbar, 100);
    return;
  }

  // Buscar elementos del navbar
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (!navbarToggler || !navbarCollapse) {
    console.warn("⚠️ Elementos del navbar no encontrados");
    return;
  }

  console.log("✅ Elementos del navbar encontrados");

  // Asegurar que el toggler tiene los atributos correctos
  navbarToggler.setAttribute("data-bs-toggle", "collapse");
  navbarToggler.setAttribute("data-bs-target", "#mainNavbar");
  navbarToggler.setAttribute("aria-controls", "mainNavbar");
  navbarToggler.setAttribute("aria-expanded", "false");

  // Función para verificar si estamos en móvil
  function isMobile() {
    return window.innerWidth <= 991;
  }

  // Cerrar navbar al hacer click en los enlaces (solo en móvil)
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (isMobile() && navbarCollapse.classList.contains("show")) {
        console.log("🔗 Link clickeado, cerrando navbar...");
        // Usar Bootstrap collapse para cerrar
        const bsCollapse =
          bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Cerrar navbar al hacer click fuera (solo en móvil)
  document.addEventListener("click", function (e) {
    if (!isMobile()) return;

    const navbar = document.querySelector(".navbar");
    if (
      navbar &&
      !navbar.contains(e.target) &&
      navbarCollapse.classList.contains("show")
    ) {
      console.log("🖱️ Click fuera del navbar, cerrando...");
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();
    }
  }); // Sistema de marcado de página activa eliminado - no hay marcado automático

  console.log("✅ Navbar móvil simple inicializado");
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavbar);
} else {
  initNavbar();
}
