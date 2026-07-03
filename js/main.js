// deita — minimal site JS
(function () {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Fade-in on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
})();
