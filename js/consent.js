// ===================================
// Cookie consent + Google Analytics (GA4)
// ===================================

(function () {
  const MEASUREMENT_ID = 'G-2CHCQMMDPB';
  const CONSENT_KEY = 'deita_analytics_consent';

  function getConsentStatus() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsentStatus(status) {
    try {
      localStorage.setItem(CONSENT_KEY, status);
    } catch (e) {
      // Ignore storage errors (e.g. private mode)
    }
  }

  function loadAnalytics() {
    if (window.gtagLoaded) {
      return;
    }
    window.gtagLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    script.onload = function () {
      window.gtag('js', new Date());
      window.gtag('config', MEASUREMENT_ID, {
        anonymize_ip: true
      });
    };
    document.head.appendChild(script);
  }

  function showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('visible');
    }
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('visible');
    }
  }

  function initConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const consent = getConsentStatus();

    if (consent === 'granted') {
      loadAnalytics();
      hideBanner();
      return;
    }

    if (consent === 'denied') {
      hideBanner();
      return;
    }

    // No choice yet — show banner and wire buttons
    showBanner();

    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setConsentStatus('granted');
        loadAnalytics();
        hideBanner();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        setConsentStatus('denied');
        hideBanner();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsent);
  } else {
    initConsent();
  }
})();
