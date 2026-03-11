const root = document.documentElement;
const body = document.body;
const introLoader = document.querySelector('.intro-loader');
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const heroBg = document.querySelector('.hero-bg');
const statementBg = document.querySelector('.statement-bg');
const revealItems = document.querySelectorAll('.reveal');
const interactiveTargets = document.querySelectorAll('a, button, .interactive');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

// Theme system --------------------------------------------------------------
const THEME_KEY = 'team-graam-theme';

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☾' : '☀';
};

const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

// Intro loader --------------------------------------------------------------
const finishLoader = () => {
  body.classList.remove('is-loading');
  introLoader?.setAttribute('hidden', '');
};

introLoader?.addEventListener('animationend', finishLoader, { once: true });
window.setTimeout(finishLoader, 3200);

// Sticky header -------------------------------------------------------------
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Mobile nav ----------------------------------------------------------------
menuToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal animations ---------------------------------------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

// Subtle parallax -----------------------------------------------------------
window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;
    if (heroBg) heroBg.style.transform = `scale(1.08) translateY(${y * 0.08}px)`;
    if (statementBg) statementBg.style.transform = `scale(1.1) translateY(${y * 0.05}px)`;
  },
  { passive: true }
);

// Luxury cursor -------------------------------------------------------------
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  if (cursorDot) {
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }
});

const animateRing = () => {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  if (cursorRing) {
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  }
  requestAnimationFrame(animateRing);
};

animateRing();

interactiveTargets.forEach((item) => {
  item.addEventListener('mouseenter', () => cursorRing?.classList.add('active'));
  item.addEventListener('mouseleave', () => cursorRing?.classList.remove('active'));
});
