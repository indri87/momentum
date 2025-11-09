// Prevent browser scroll restoration and force scroll to top
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top immediately on page load
window.scrollTo(0, 0);

// Also force scroll to top before page unload to prevent position memory
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.15;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Color Bars Intro Animation
window.addEventListener('load', () => {
  const introScreen = document.getElementById('introScreen');

  // Lock scroll during intro
  document.body.style.overflow = 'hidden';
  window.scrollTo(0, 0);

  setTimeout(() => {
    introScreen.classList.add('fade-out');
  }, 2500);

  // Start timecode and frame counter after intro, unlock scroll
  setTimeout(() => {
    document.body.style.overflow = '';
    window.scrollTo(0, 0); // Force scroll to top one more time
    startTimecode();
    startFrameCounter();
  }, 2500);
});

// Real-time Timecode
function startTimecode() {
  const timecodeEl = document.getElementById('timecode');
  if (!timecodeEl) return;

  let frames = 0;
  const fps = 24; // Cinema standard

  setInterval(() => {
    frames++;
    const totalSeconds = Math.floor(frames / fps);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const frameNumber = frames % fps;

    const timecode = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frameNumber).padStart(2, '0')}`;
    timecodeEl.textContent = timecode;
  }, 1000 / fps);
}

// Frame Counter
function startFrameCounter() {
  const frameCounterEl = document.getElementById('frameCounter');
  if (!frameCounterEl) return;

  let frame = 1;
  setInterval(() => {
    frame++;
    frameCounterEl.textContent = `FRAME ${String(frame).padStart(3, '0')}`;
  }, 100); // Update every 100ms
}

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

// Parallax Effect on Hero Images
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
    heroCarousel.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Reveal Animations
const revealElements = document.querySelectorAll('.fade-in-section, .project-card, .team-member');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.cta-button');
magneticButtons.forEach(btn => {
  btn.classList.add('magnetic');

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

// Smooth Image Loading
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
});

// Console Message
console.log('%c MOMENTUM ', 'background: #c4302b; color: #f5f5f0; font-size: 20px; padding: 10px; font-family: Courier Prime;');
console.log('%c Collettivo Cinematografico Torinese ', 'color: #666; font-size: 12px;');
