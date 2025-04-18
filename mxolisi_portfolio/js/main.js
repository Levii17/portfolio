document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const hero = document.getElementById('hero');
    const navbarCenter = document.getElementById('navbar-center');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    // if (!navbarCenter || !hero || !mobileMenuBtn || !mobileDropdown || !mobileMenuOverlay) return;
    
    let menuOpen = false;
    
    function handleScroll() {
        if (window.pageYOffset > 16) {
            navbarCenter.classList.add('sticky');
        } else {
            navbarCenter.classList.remove('sticky');
        }
    
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const additionalBtn = document.querySelector('.additional-link-btn');
        
        if (window.pageYOffset > heroBottom) {
            navbarCenter.classList.add('scrolled');
            if (window.innerWidth > 768) {
                additionalBtn.style.display = 'inline-block';
            }
        } else {
            navbarCenter.classList.remove('scrolled');
            additionalBtn.style.display = 'none';
        }
    }
    
    // Add resize listener for the additional button
    window.addEventListener('resize', function() {
        const additionalBtn = document.querySelector('.additional-link-btn');
        if (window.innerWidth <= 768) {
            additionalBtn.style.display = 'none';
        }
    });
    
    function toggleMenu() {
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            mobileDropdown.classList.add('active');
            mobileMenuOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            mobileMenuBtn.innerHTML = '✕';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileDropdown.classList.remove('active');
            mobileMenuOverlay.style.display = 'none';
            document.body.style.overflow = '';
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    // Throttled scroll event
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 50);
    }, false);
    
    mobileMenuBtn.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuOpen) {
            toggleMenu();
        }
    });
    
    // Initialize navbar
    handleScroll();
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Particles.js configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#1E88E5"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#1E88E5",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});