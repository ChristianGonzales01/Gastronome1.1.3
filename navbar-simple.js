/**
 * NAVBAR MÓVIL SIMPLE - GASTRONOME
 * Código simplificado para funcionalidad básica del navbar
 * Requiere Bootstrap 5 JavaScript
 */

// Función para inicializar el navbar cuando Bootstrap esté disponible
function initNavbar() {
    console.log('🔧 Inicializando navbar móvil simple...');
    
    // Verificar que Bootstrap esté disponible
    if (typeof bootstrap === 'undefined') {
        console.warn('⚠️ Bootstrap no está disponible, reintentando...');
        setTimeout(initNavbar, 100);
        return;
    }
    
    // Buscar elementos del navbar
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) {
        console.warn('⚠️ Elementos del navbar no encontrados');
        return;
    }
    
    console.log('✅ Elementos del navbar encontrados');
    
    // Asegurar que el toggler tiene los atributos correctos
    navbarToggler.setAttribute('data-bs-toggle', 'collapse');
    navbarToggler.setAttribute('data-bs-target', '#mainNavbar');
    navbarToggler.setAttribute('aria-controls', 'mainNavbar');
    navbarToggler.setAttribute('aria-expanded', 'false');
    
    // Función para verificar si estamos en móvil
    function isMobile() {
        return window.innerWidth <= 991;
    }
    
    // Cerrar navbar al hacer click en los enlaces (solo en móvil)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isMobile() && navbarCollapse.classList.contains('show')) {
                console.log('🔗 Link clickeado, cerrando navbar...');
                // Usar Bootstrap collapse para cerrar
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Cerrar navbar al hacer click fuera (solo en móvil)
    document.addEventListener('click', function(e) {
        if (!isMobile()) return;
        
        const navbar = document.querySelector('.navbar');
        if (navbar && !navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            console.log('🖱️ Click fuera del navbar, cerrando...');
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
            bsCollapse.hide();
        }
    });
    
    // Marcar página activa
    const path = window.location.pathname.toLowerCase();
    const pageMap = {
        'index.html': '.HOME_ACTIVE',
        'nosotros.html': '.NOSOTROS_ACTIVE', 
        'servicios.html': '.SERVICIOS_ACTIVE',
        'portafoliominimal.html': '.PORTAFOLIO_ACTIVE',
        'contacto.html': '.CONTACTO_ACTIVE'
    };
    
    // Activar la página actual
    for (const [page, selector] of Object.entries(pageMap)) {
        if (path.includes(page) || (page === 'index.html' && (path === '/' || path === ''))) {
            const activeLink = document.querySelector(selector);
            if (activeLink) {
                activeLink.classList.add('active');
                console.log(`✨ Página activa marcada: ${page}`);
            }
            break;
        }
    }
    
    console.log('✅ Navbar móvil simple inicializado');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
