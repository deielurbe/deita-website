// ===================================
// Deita Website JavaScript
// ===================================

(function() {
  'use strict';

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // 2. Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Fade-in on scroll animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
  });

  // 4. Track CTA clicks (for analytics)
  function trackCTAClick(buttonText, section) {
    // Google Analytics 4 (gtag)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cta_click', {
        'event_category': 'CTA',
        'event_label': buttonText,
        'section': section
      });
    }

    // Plausible Analytics
    if (typeof plausible !== 'undefined') {
      plausible('CTA Click', {
        props: {
          button: buttonText,
          section: section
        }
      });
    }
  }

  // Attach tracking to primary buttons
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('section')?.className || 'header';
      trackCTAClick(btn.textContent.trim(), section);
    });
  });

  // 5. Scroll depth tracking
  const scrollDepthMarkers = { 25: false, 50: false, 75: false, 90: false };

  function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    Object.keys(scrollDepthMarkers).forEach(depth => {
      if (progress > parseInt(depth) && !scrollDepthMarkers[depth]) {
        scrollDepthMarkers[depth] = true;
        trackScrollDepth(depth + '%');
      }
    });
  }

  function trackScrollDepth(depth) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'scroll_depth', {
        'event_category': 'Engagement',
        'event_label': depth
      });
    }
    if (typeof plausible !== 'undefined') {
      plausible('Scroll Depth', { props: { depth: depth } });
    }
  }

  // Throttle scroll events
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });

  // 6. Header background on scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // 7. Form validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // 8. Lazy load images fallback
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // 9. FAQ Accordion Toggle
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // 10. Console branding
  console.log('%cDeita', 'font-size: 24px; font-weight: bold; color: #3e573c;');
  console.log('%cData services for restaurants', 'font-size: 14px; color: #718096;');

})();
