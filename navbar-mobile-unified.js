/**
 * NAVBAR MÓVIL UNIFICADO - JAVASCRIPT CORREGIDO
 * Funcionalidad específica para navbar móvil en todas las páginas
 * VERSIÓN 2.0 - Dropdown funciona correctamente en móvil
 */

(function() {
    'use strict';
    
    console.log('🔧 Inicializando navbar móvil unificado v2.0...');
    
    // Variables globales
    let navbarToggler = null;
    let navbarCollapse = null;
    let isNavbarOpen = false;
    
    // Función para verificar si estamos en móvil
    function isMobile() {
        return window.innerWidth <= 991;
    }
    
    // Función para configurar Bootstrap 5 attributes
    function ensureBootstrapAttributes() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        if (toggleBtn) {
            toggleBtn.setAttribute('data-bs-toggle', 'collapse');
            toggleBtn.setAttribute('data-bs-target', '#mainNavbar');
            toggleBtn.setAttribute('aria-controls', 'mainNavbar');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Toggle navigation');
            
            // Remover atributos Bootstrap 4
            toggleBtn.removeAttribute('data-toggle');
            toggleBtn.removeAttribute('data-target');
            
            console.log('✅ Bootstrap 5 attributes configurados');
        }
    }
    
    // Función para detectar página activa y marcar nav link
    function activateCurrentPage() {
        const path = window.location.pathname.toLowerCase();
        const pageMap = {
            'index.html': '.HOME_ACTIVE',
            'nosotros.html': '.NOSOTROS_ACTIVE', 
            'servicios.html': '.SERVICIOS_ACTIVE',
            'portafoliominimal.html': '.PORTAFOLIO_ACTIVE',
            'contacto.html': '.CONTACTO_ACTIVE'
        };
        
        // Remover todas las clases active previas
        Object.values(pageMap).forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.classList.remove('active');
        });
        
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
    }
      // Función para abrir la navbar
    function openNavbar() {
        if (navbarCollapse && !isNavbarOpen) {
            // Usar Bootstrap 5 API
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.show();
            } else {
                navbarCollapse.classList.add('show');
            }
            
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'true');
                navbarToggler.classList.remove('collapsed');
            }
            isNavbarOpen = true;
            console.log('📥 Navbar abierta');
        }
    }
    
    // Función para cerrar la navbar
    function closeNavbar() {
        if (navbarCollapse && isNavbarOpen) {
            // Usar Bootstrap 5 API
            if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
                bsCollapse.hide();
            } else {
                navbarCollapse.classList.remove('show');
            }
            
            if (navbarToggler) {
                navbarToggler.setAttribute('aria-expanded', 'false');
                navbarToggler.classList.add('collapsed');
            }
            isNavbarOpen = false;
            console.log('📤 Navbar cerrada');
        }
    }
    
    // Función para toggle de la navbar
    function toggleNavbar() {
        if (isNavbarOpen) {
            closeNavbar();
        } else {
            openNavbar();
        }
    }
    
    // Función para limpiar event listeners previos
    function cleanPreviousListeners() {
        // Remover event listeners clonando elementos
        const oldToggler = document.querySelector('.navbar-toggler');
        if (oldToggler) {
            const newToggler = oldToggler.cloneNode(true);
            oldToggler.parentNode.replaceChild(newToggler, oldToggler);
            navbarToggler = newToggler;
            console.log('🧹 Event listeners previos limpiados');
        }
        
        // Limpiar event listeners de nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
        });
    }
    
    // Función principal para configurar la navbar móvil
    function setupMobileNavbar() {
        // Buscar elementos
        navbarToggler = document.querySelector('.navbar-toggler');
        navbarCollapse = document.querySelector('.navbar-collapse') || document.getElementById('mainNavbar');
        
        if (!navbarToggler || !navbarCollapse) {
            console.warn('⚠️ Elementos de navbar no encontrados');
            return;
        }
        
        console.log('✅ Elementos de navbar encontrados');
        
        // Limpiar listeners previos
        cleanPreviousListeners();
        
        // Reconfigurar referencias después de la limpieza
        navbarToggler = document.querySelector('.navbar-toggler');
        
        // Configurar Bootstrap attributes
        ensureBootstrapAttributes();
        
        // Estado inicial
        isNavbarOpen = navbarCollapse.classList.contains('show');        // EVENT LISTENER PRINCIPAL - Toggle
        if (navbarToggler) {
            navbarToggler.addEventListener('click', function(e) {
                // No prevenir el default para que Bootstrap 5 funcione
                console.log(`🔄 Toggle clickeado. Estado actual: ${isNavbarOpen ? 'abierto' : 'cerrado'}`);
                
                // Actualizar el estado después de un pequeño delay
                setTimeout(() => {
                    isNavbarOpen = navbarCollapse.classList.contains('show');
                    console.log(`🔄 Estado actualizado: ${isNavbarOpen ? 'abierto' : 'cerrado'}`);
                }, 100);
            });
        }
        
        // EVENT LISTENERS para eventos de Bootstrap 5
        if (navbarCollapse) {
            navbarCollapse.addEventListener('shown.bs.collapse', function() {
                isNavbarOpen = true;
                console.log('📥 Navbar abierta (Bootstrap event)');
            });
            
            navbarCollapse.addEventListener('hidden.bs.collapse', function() {
                isNavbarOpen = false;
                console.log('📤 Navbar cerrada (Bootstrap event)');
            });
        }
        
        // EVENT LISTENERS - Cerrar al hacer click en nav links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (isMobile() && isNavbarOpen) {
                    console.log('🔗 Link clickeado, cerrando navbar...');
                    setTimeout(closeNavbar, 100); // Pequeño delay para UX
                }
            });
        });
        
        // EVENT LISTENER - Cerrar al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!isMobile() || !isNavbarOpen) return;
            
            const navbar = document.querySelector('.navbar');
            if (navbar && !navbar.contains(e.target)) {
                console.log('🖱️ Click fuera de navbar, cerrando...');
                closeNavbar();
            }
        });
        
        // EVENT LISTENER - Cerrar al cambiar tamaño de ventana
        window.addEventListener('resize', function() {
            if (!isMobile() && isNavbarOpen) {
                console.log('📱 Cambio a desktop, cerrando navbar...');
                closeNavbar();
            }
        });
        
        console.log('🚀 Navbar móvil configurada correctamente');
    }
    
    // Función de inicialización principal
    function init() {
        console.log('🔄 Iniciando configuración de navbar...');
        
        // Activar página actual
        activateCurrentPage();
        
        // Configurar navbar móvil
        setupMobileNavbar();
        
        console.log('✅ Navbar móvil unificado inicializado');
    }
      // INICIALIZACIÓN - Múltiples puntos de entrada para máxima compatibilidad
    
    // 1. Si el DOM ya está cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM ya está listo
        init();
    }
    
    // 2. Backup en window load
    window.addEventListener('load', function() {
        if (!navbarToggler || !navbarCollapse) {
            console.log('🔧 Ejecutando inicialización de respaldo...');
            setTimeout(init, 100);
        }
    });
    
})();
