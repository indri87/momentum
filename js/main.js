// Intro Animation
window.addEventListener('load', () => {
  const introScreen = document.getElementById('introScreen');
  const introLogo = document.getElementById('introLogo');

  setTimeout(() => {
    introLogo.classList.add('typing-done');
  }, 2000);

  setTimeout(() => {
    introScreen.classList.add('fade-out');
  }, 2800);
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.textContent = '☰';
  });
});

// Fade In Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
  observer.observe(section);
});

// Project Cards Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Film-like flicker effect
setInterval(() => {
  if (Math.random() > 0.98) {
    document.body.style.opacity = '0.98';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 50);
  }
}, 2000);

// Carousel Image Scroll
document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.querySelector('.carousel-track');

  if (carouselTrack) {
    // Clone images for infinite scroll effect
    const images = carouselTrack.querySelectorAll('.carousel-image');
    images.forEach(img => {
      const clone = img.cloneNode(true);
      carouselTrack.appendChild(clone);
    });
  }
});

// Console Message
console.log('%c MOMENTUM ', 'background: #c4302b; color: #f5f5f0; font-size: 20px; padding: 10px; font-family: Courier Prime;');
console.log('%c Collettivo Cinematografico Torinese ', 'color: #666; font-size: 12px;');
