/**
 * OtterDrift — Homepage Interactions
 * Scroll-triggered animations, navigation state, and smooth UX
 */

(function () {
  'use strict';

  // ——————————————————————————————
  // Navigation scroll behavior
  // ——————————————————————————————
  const nav = document.getElementById('mainNav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ——————————————————————————————
  // Smooth scroll for anchor links
  // ——————————————————————————————
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ——————————————————————————————
  // Scroll-triggered animations
  // ——————————————————————————————
  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    animatedElements.forEach(function (el) {
      el.classList.add('animate-on-scroll--visible');
    });
  }

  // ——————————————————————————————
  // Mobile navigation toggle
  // ——————————————————————————————
  var mobileToggle = document.getElementById('mobileToggle');
  var navLinks = document.querySelector('.nav__links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      var isOpen = navLinks.style.display === 'flex';
      if (isOpen) {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'fixed';
        navLinks.style.top = 'var(--nav-height)';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.bottom = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.alignItems = 'center';
        navLinks.style.justifyContent = 'center';
        navLinks.style.gap = '2rem';
        navLinks.style.background = 'rgba(247, 249, 252, 0.98)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.zIndex = '999';
      }
    });
  }

  // ——————————————————————————————
  // Parallax-lite on hero scroll
  // ——————————————————————————————
  var heroContent = document.querySelector('.hero__content');
  var heroScrollHint = document.querySelector('.hero__scroll-hint');

  function handleHeroParallax() {
    if (!heroContent) return;
    var scrolled = window.scrollY;
    var rate = scrolled * 0.3;
    var opacity = Math.max(0, 1 - scrolled / 500);

    heroContent.style.transform = 'translateY(' + rate + 'px)';
    heroContent.style.opacity = opacity;

    if (heroScrollHint) {
      heroScrollHint.style.opacity = Math.max(0, 1 - scrolled / 200);
    }
  }

  window.addEventListener('scroll', handleHeroParallax, { passive: true });

})();
