document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll functionality
  const navbarCenter = document.getElementById("navbar-center");
  const hero = document.querySelector(".hero");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileDropdown = document.getElementById("mobile-dropdown");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a");

  // Theme toggle elements
  const navbarThemeToggle = document.getElementById("navbar-theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const heroThemeToggle = document.getElementById("hero-theme-toggle");
  
  // Theme toggle icons
  const navbarMoonIcon = document.getElementById("navbar-moon-icon");
  const navbarSunIcon = document.getElementById("navbar-sun-icon");
  const mobileMoonIcon = document.getElementById("mobile-moon-icon");
  const mobileSunIcon = document.getElementById("mobile-sun-icon");
  const heroMoonIcon = document.getElementById("hero-moon-icon");
  const heroSunIcon = document.getElementById("hero-sun-icon");

  if (!navbarCenter || !hero || !mobileMenuBtn || !mobileDropdown || !mobileMenuOverlay) return;

  let menuOpen = false;

  function handleScroll() {
      if (window.pageYOffset > 16) {
          navbarCenter.classList.add('sticky');
      } else {
          navbarCenter.classList.remove('sticky');
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      if (window.pageYOffset > heroBottom) {
          navbarCenter.classList.add('scrolled');
      } else {
          navbarCenter.classList.remove('scrolled');
      }
      
      // Add active class to nav items based on scroll position
      setActiveNavItem();
  }
  
  // Function to set active class to navigation items based on scroll position
  function setActiveNavItem() {
      const scrollPosition = window.scrollY + 100; // Offset to trigger slightly before reaching section
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id");
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              // Remove active class from all nav links
              navLinks.forEach(link => {
                  link.classList.remove("active");
              });
              
              // Add active class to corresponding nav links
              const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
              activeLinks.forEach(link => {
                  link.classList.add("active");
              });
          }
      });
  }

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

  // Theme toggle functionality
  function toggleTheme() {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute('data-theme');
      
      if (currentTheme === 'dark') {
          htmlElement.setAttribute('data-theme', 'light');
          // Update all moon/sun icons
          setIconsForLightMode();
          localStorage.setItem('theme', 'light');
      } else {
          htmlElement.setAttribute('data-theme', 'dark');
          // Update all moon/sun icons
          setIconsForDarkMode();
          localStorage.setItem('theme', 'dark');
      }
  }

  function setIconsForDarkMode() {
      // Navbar icons
      navbarMoonIcon.style.display = 'none';
      navbarSunIcon.style.display = 'block';
      // Mobile icons
      mobileMoonIcon.style.display = 'none';
      mobileSunIcon.style.display = 'block';
      // Hero icons
      heroMoonIcon.style.display = 'none';
      heroSunIcon.style.display = 'block';
  }

  function setIconsForLightMode() {
// Continue from the setIconsForLightMode function:
navbarMoonIcon.style.display = 'block';
navbarSunIcon.style.display = 'none';
// Mobile icons
mobileMoonIcon.style.display = 'block';
mobileSunIcon.style.display = 'none';
// Hero icons
heroMoonIcon.style.display = 'block';
heroSunIcon.style.display = 'none';
}

// Initialize theme from localStorage
function initTheme() {
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
  setIconsForLightMode();
} else {
  setIconsForDarkMode();
}
}
}

// Event listeners
window.addEventListener('scroll', handleScroll);
mobileMenuBtn.addEventListener('click', toggleMenu);
mobileMenuOverlay.addEventListener('click', toggleMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
link.addEventListener('click', () => {
if (menuOpen) toggleMenu();
});
});

// Theme toggle event listeners
navbarThemeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);
heroThemeToggle.addEventListener('click', toggleTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();

const targetId = this.getAttribute('href');
const targetElement = document.querySelector(targetId);

if (targetElement) {
  window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
  });
}
});
});

// Initialize theme on page load
initTheme();

// Set initial active class on navigation
setActiveNavItem();
});