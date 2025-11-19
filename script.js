// ============================================
// VARIABLES GLOBALES DE CONFIGURACIÓN
// ============================================
const CONFIG = {
    // Enlaces configurables
    whatsappNumber: '591XXXXXXXXX', // Cambia por el número real
    whatsappMessage: '¡Hola! Confirmo mi asistencia al cumpleaños de Joel 🎉',
    googleMapsUrl: 'https://maps.google.com/?q=-16.5,-68.15', // Cambia por las coordenadas reales
    
    // Tiempos (en milisegundos)
    loadingTime: 5000, // 15 segundos
    transitionTime: 800
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================
const loadingScreen = document.getElementById('loadingScreen');
const invitationScreen = document.getElementById('invitationScreen');
const finalScreen = document.getElementById('finalScreen');

const btnVerInvitacion = document.getElementById('btnVerInvitacion');
const btnMapa = document.getElementById('btnMapa');
const btnWhatsapp = document.getElementById('btnWhatsapp');
const btnClose = document.getElementById('btnClose');

const loadingProgress = document.getElementById('loadingProgress');

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Crear partículas
    createParticles();
    
    // Event Listeners
    btnVerInvitacion.addEventListener('click', showInvitation);
    btnMapa.addEventListener('click', openGoogleMaps);
    btnWhatsapp.addEventListener('click', openWhatsApp);
    btnClose.addEventListener('click', showFinalScreen);
    
    // Habilitar botón después de la carga
    setTimeout(() => {
        btnVerInvitacion.style.opacity = '1';
        btnVerInvitacion.style.pointerEvents = 'auto';
    }, CONFIG.loadingTime);
}

// ============================================
// NAVEGACIÓN ENTRE PANTALLAS
// ============================================
function showInvitation() {
    transitionScreen(loadingScreen, invitationScreen);
    playSound('transition');
}

function showFinalScreen() {
    transitionScreen(invitationScreen, finalScreen);
    triggerConfetti();
    playSound('celebration');
}

function transitionScreen(fromScreen, toScreen) {
    // Ocultar pantalla actual
    fromScreen.style.opacity = '0';
    
    setTimeout(() => {
        fromScreen.classList.remove('active');
        fromScreen.style.display = 'none';
        
        // Mostrar nueva pantalla
        toScreen.style.display = 'flex';
        setTimeout(() => {
            toScreen.classList.add('active');
            toScreen.style.opacity = '1';
        }, 50);
    }, CONFIG.transitionTime);
}

// ============================================
// FUNCIONES DE BOTONES
// ============================================
function openGoogleMaps() {
    playSound('click');
    window.open(CONFIG.googleMapsUrl, '_blank');
}

function openWhatsApp() {
    playSound('click');
    const message = encodeURIComponent(CONFIG.whatsappMessage);
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
}

// ============================================
// EFECTOS VISUALES
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Colores aleatorios del arcoíris
        const colors = ['#FF1493', '#00FFFF', '#FF00FF', '#FFD700', '#00FF00', '#FF4500'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 20px ${particle.style.backgroundColor}`;
        
        // Animación
        particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

function triggerConfetti() {
    const colors = ['#FF1493', '#00FFFF', '#FF00FF', '#FFD700', '#00FF00', '#FF4500'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '1000';
            confetti.style.boxShadow = `0 0 10px ${confetti.style.backgroundColor}`;
            
            document.body.appendChild(confetti);
            
            // Animación de caída
            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            
            confetti.animate([
                { 
                    transform: `translateY(0) rotate(0deg)`,
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight + 50}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            // Eliminar después de la animación
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 50);
    }
}

// ============================================
// SONIDOS (Simulados con console)
// ============================================
function playSound(soundType) {
    // Aquí puedes agregar sonidos reales si lo deseas
    console.log(`🔊 Reproduciendo sonido: ${soundType}`);
}

// ============================================
// EFECTOS ADICIONALES
// ============================================

// Efecto de pulso en los bordes HUD
setInterval(() => {
    const corners = document.querySelectorAll('.hud-corner');
    corners.forEach((corner, index) => {
        setTimeout(() => {
            corner.style.transform = 'scale(1.1)';
            setTimeout(() => {
                corner.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}, 3000);

// Cambio de color aleatorio en las líneas HUD
setInterval(() => {
    const lines = document.querySelectorAll('.hud-line');
    const colors = ['#FF1493', '#00FFFF', '#FF00FF', '#FFD700', '#00FF00'];
    
    lines.forEach(line => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        line.style.background = `linear-gradient(90deg, transparent, ${randomColor}, transparent)`;
    });
}, 2000);

// Efecto de hover mejorado para botones
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// ============================================
// PERSONALIZACIÓN ADICIONAL
// ============================================

// Puedes agregar más funciones personalizadas aquí
// Por ejemplo: efectos de mouse, animaciones especiales, etc.

console.log('🎉 Invitación de cumpleaños cargada correctamente!');
console.log('📝 Recuerda configurar los enlaces en CONFIG:');
console.log('   - whatsappNumber');
console.log('   - googleMapsUrl');