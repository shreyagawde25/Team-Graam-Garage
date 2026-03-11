const body = document.body;
const introLoader = document.querySelector('.intro-loader');
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form');
const revealElements = document.querySelectorAll('.reveal');
const heroBg = document.querySelector('.hero-bg');

// Intro loader lifecycle
const finishLoader = () => {
  body.classList.remove('is-loading');
  introLoader?.setAttribute('hidden', '');
};

introLoader?.addEventListener('animationend', finishLoader, { once: true });
window.setTimeout(finishLoader, 3400);

// Sticky header behavior
const toggleHeaderState = () => {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 24);
};

toggleHeaderState();
window.addEventListener('scroll', toggleHeaderState, { passive: true });

// Mobile menu
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// Subtle hero parallax
window.addEventListener(
  'scroll',
  () => {
    if (!heroBg) return;
    const offset = window.scrollY * 0.14;
    heroBg.style.transform = `scale(1.08) translateY(${offset}px)`;
  },
  { passive: true }
);

// Contact form demo handler
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  contactForm.reset();
});
