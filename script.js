// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        
        // Random colors
        const colors = ['#00ffff', '#8a2be2', '#ff00ff', '#39ff14'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Smooth scrolling for navigation links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header background on scroll
function headerOnScroll() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
}

// Add interactive hover effects to cards
function addCardHoverEffects() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// CTA Button click effect
function addCTAButtonEffect() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

// Mobile menu toggle (for future enhancement)
function setupMobileMenu() {
    // Add hamburger menu functionality for mobile
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button for mobile
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.display = 'none';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = 'var(--neon-cyan)';
    hamburger.style.fontSize = '1.5rem';
    hamburger.style.cursor = 'pointer';
    
    // Add hamburger to nav
    document.querySelector('nav').appendChild(hamburger);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
    });
    
    // Show/hide hamburger based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navLinks.classList.remove('mobile-active');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Parallax effect for hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Loading animation
function showLoadingComplete() {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const loadingCSS = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = loadingCSS;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    createParticles();
    smoothScroll();
    animateOnScroll();
    addCardHoverEffects();
    addCTAButtonEffect();
    
    // Enhanced features
    setupMobileMenu();
    addParallaxEffect();
    showLoadingComplete();
    
    // Log initialization
    console.log('MeraTalk Call Center Solution - Landing page initialized');
});

// Event listeners for scroll effects
window.addEventListener('scroll', function() {
    animateOnScroll();
    headerOnScroll();
});

// Performance optimization - throttle scroll events
let ticking = false;

function updateOnScroll() {
    animateOnScroll();
    headerOnScroll();
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close any open mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('mobile-active');
    }
});

// Intersection Observer for better performance with scroll animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    });
}
