const revealElements = document.querySelectorAll('.reveal');
const introLoader = document.querySelector('.intro-loader');

const endIntroAnimation = () => {
  document.body.classList.remove('is-loading');
  introLoader?.setAttribute('hidden', '');
};

if (introLoader) {
  introLoader.addEventListener('animationend', endIntroAnimation, { once: true });
  window.setTimeout(endIntroAnimation, 3500);
} else {
  document.body.classList.remove('is-loading');
}

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => revealOnScroll.observe(element));

const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  contactForm.reset();
});
