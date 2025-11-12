// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Modal de Documentos
const openDocumentsBtn = document.getElementById('openDocuments');
const documentsModal = document.getElementById('documentsModal');
const documentsClose = document.querySelector('.documents-close');

const openModal = (e) => {
    e.preventDefault();
    if (documentsModal) {
        documentsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

const closeModal = () => {
    if (documentsModal) {
        documentsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

if (openDocumentsBtn) {
    openDocumentsBtn.addEventListener('click', openModal);
}

if (documentsClose) {
    documentsClose.addEventListener('click', closeModal);
}

// Cerrar modal al hacer clic fuera
if (documentsModal) {
    window.addEventListener('click', (e) => {
        if (e.target === documentsModal) {
            closeModal();
        }
    });
}

// Prevenir clic en documentos deshabilitados
document.querySelectorAll('.document-card.disabled').forEach(card => {
    card.addEventListener('click', (e) => e.preventDefault());
});

// Cambiar estilo de navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 240, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(139, 115, 85, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 248, 240, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de entrada para las tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.idea-card');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

console.log('¡Kochi cargado exitosamente! 🦦💕');
