// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Modal de Login
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const showSignupLink = document.getElementById('showSignup');

// Abrir modal de login
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Abrir modal de registro
signupBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Cambiar a modo registro
    document.querySelector('.modal-header h2').textContent = '¡Únete a Kochi!';
    document.querySelector('.modal-header p').textContent = 'Crea tu cuenta y encuentra tu cita perfecta';
    document.querySelector('.modal-footer').innerHTML = '¿Ya tienes cuenta? <a href="#" id="showLogin">Inicia sesión aquí</a>';
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Cambiar entre login y registro
document.addEventListener('click', (e) => {
    if (e.target.id === 'showSignup') {
        e.preventDefault();
        document.querySelector('.modal-header h2').textContent = '¡Únete a Kochi!';
        document.querySelector('.modal-header p').textContent = 'Crea tu cuenta y encuentra tu cita perfecta';
        document.querySelector('.modal-footer').innerHTML = '¿Ya tienes cuenta? <a href="#" id="showLogin">Inicia sesión aquí</a>';
    }
    if (e.target.id === 'showLogin') {
        e.preventDefault();
        document.querySelector('.modal-header h2').textContent = '¡Bienvenido a Kochi!';
        document.querySelector('.modal-header p').textContent = 'Conecta con personas especiales';
        document.querySelector('.modal-footer').innerHTML = '¿No tienes cuenta? <a href="#" id="showSignup">Regístrate aquí</a>';
    }
});

// Login con Google
document.querySelector('.btn-google').addEventListener('click', () => {
    showNotification('Iniciando sesión con Google...', 'info');
    // Aquí iría la integración real con Google OAuth
    setTimeout(() => {
        showNotification('¡Bienvenido a Kochi!', 'success');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Login con Facebook
document.querySelector('.btn-facebook').addEventListener('click', () => {
    showNotification('Iniciando sesión con Facebook...', 'info');
    // Aquí iría la integración real con Facebook OAuth
    setTimeout(() => {
        showNotification('¡Bienvenido a Kochi!', 'success');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Formulario de login
const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    if (!email || !password) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    showNotification('Iniciando sesión...', 'info');
    setTimeout(() => {
        showNotification('¡Bienvenido a Kochi!', 'success');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginForm.reset();
    }, 2000);
});

// Cambiar estilo de navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 248, 240, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(139, 115, 85, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 248, 240, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Subida de fotos
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const galleryGrid = document.getElementById('galleryGrid');

// Drag and drop para subir fotos
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#F4C2C2';
    uploadArea.style.background = 'rgba(244, 194, 194, 0.1)';
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#B8D4E3';
    uploadArea.style.background = 'white';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#B8D4E3';
    uploadArea.style.background = 'white';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

// Click para seleccionar archivos
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                addImageToGallery(e.target.result, file.name);
            };
            reader.readAsDataURL(file);
        }
    });
}

function addImageToGallery(src, name) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <img src="${src}" alt="${name}">
        <div class="gallery-item-info">
            <h4>${name}</h4>
            <p>Compartido por ti</p>
        </div>
    `;
    
    galleryGrid.appendChild(galleryItem);
    showNotification('¡Foto subida exitosamente!', 'success');
    
    // Actualizar contador de fotos
    updatePhotoCount();
}

function updatePhotoCount() {
    const photoCount = document.querySelectorAll('.gallery-item').length;
    const photoStat = document.querySelector('.stat h4');
    if (photoStat) {
        photoStat.textContent = photoCount;
    }
}

// Animación de contadores
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observador de intersección para animar elementos cuando son visibles
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animar contadores en la sección de perfil
            if (entry.target.classList.contains('profile-stats')) {
                const counters = entry.target.querySelectorAll('.stat h4');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent) || 0;
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.idea-card, .feature-card, .profile-card, .profile-stats');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    const colors = {
        success: '#F4C2C2',
        error: '#E8A5A5',
        info: '#B8D4E3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: #8B7355;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        border: 2px solid ${colors[type]};
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Efectos de hover para botones
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
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

// Efecto parallax suave para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animación de escritura para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar animación de escritura cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Funcionalidad para guardar ideas favoritas
document.querySelectorAll('.idea-card').forEach(card => {
    const saveBtn = document.createElement('button');
    saveBtn.innerHTML = '<i class="fas fa-heart"></i>';
    saveBtn.className = 'save-idea-btn';
    saveBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #F4C2C2;
    `;
    
    card.style.position = 'relative';
    card.appendChild(saveBtn);
    
    saveBtn.addEventListener('click', () => {
        saveBtn.style.color = '#E8A5A5';
        saveBtn.style.transform = 'scale(1.2)';
        showNotification('Idea guardada en favoritos', 'success');
        
        // Actualizar contador de ideas guardadas
        const ideaStat = document.querySelectorAll('.stat h4')[1];
        if (ideaStat) {
            const currentCount = parseInt(ideaStat.textContent) || 0;
            animateCounter(ideaStat, currentCount + 1);
        }
        
        setTimeout(() => {
            saveBtn.style.transform = 'scale(1)';
        }, 200);
    });
});

// Funcionalidad para editar perfil
document.querySelector('.profile-card .btn-primary').addEventListener('click', () => {
    showNotification('Funcionalidad de edición de perfil próximamente', 'info');
});

// Lazy loading para imágenes (si se agregan en el futuro)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
lazyLoadImages();

// Preloader (opcional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamiento según dispositivo
if (isMobile()) {
    // Deshabilitar efectos parallax en móvil para mejor rendimiento
    window.removeEventListener('scroll', () => {});
}

// Función para copiar al portapapeles (útil para información de contacto)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('No se pudo copiar', 'error');
    });
}

// Agregar funcionalidad de copiar a elementos de contacto
document.querySelectorAll('.contact-item p').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        copyToClipboard(item.textContent);
    });
});

// Simular datos de conexiones
setTimeout(() => {
    const connectionStat = document.querySelectorAll('.stat h4')[2];
    if (connectionStat) {
        animateCounter(connectionStat, Math.floor(Math.random() * 50) + 10);
    }
}, 3000);

console.log('¡Kochi cargado exitosamente! 🦦💕');
