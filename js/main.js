/* =========================================================
   THE WANN SAIGON – LUXURY JAVASCRIPT
   Purpose: UI polish • Smooth interaction • Bilingual
   Rule: Clean – Stable – Easy to maintain
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     1. HEADER SCROLL EFFECT
  ===================================================== */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* =====================================================
     2. FADE-IN OBSERVER (SECTION + ITEMS)
     - Dùng CHUNG 1 observer
     - Áp dụng cho:
       + section.fade
       + .fade-item (ảnh / caption)
  ===================================================== */
  const fadeTargets = document.querySelectorAll('section, .fade-item');

  if (fadeTargets.length) {
    const fadeObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            fadeObserver.unobserve(entry.target); // chạy 1 lần cho sang
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeTargets.forEach(el => {
      el.classList.add('fade');
      fadeObserver.observe(el);
    });
  }

  /* =====================================================
     3. SMOOTH SCROLL (ANCHOR)
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* =====================================================
     4. BUTTON MICRO HOVER
  ===================================================== */
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
    });
  });

  /* =====================================================
     5. LANGUAGE SWITCH (VI / EN)
  ===================================================== */
  const langButtons = document.querySelectorAll('[data-lang]');
  const transEls = document.querySelectorAll('[data-vi][data-en]');

  function setLanguage(lang) {
    transEls.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem('lang', lang);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });

  setLanguage(localStorage.getItem('lang') || 'vi');

  /* =====================================================
     6. MOBILE MENU TOGGLE
  ===================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

});
/* ==============================
   HORIZONTAL DRAG SCROLL
================================ */
document.querySelectorAll('.horizontal-scroll').forEach(gallery => {
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', e => {
    isDown = true;
    gallery.classList.add('dragging');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('dragging');
  });

  gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('dragging');
  });

  gallery.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.6; // độ đà
    gallery.scrollLeft = scrollLeft - walk;
  });
});
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setTimeout(() => heroTitle.classList.add('show'), 300);
}
// Sticky CTA – show after hero
const stickyCTA = document.querySelector('.sticky-cta');
const heroSection = document.querySelector('.hero');

if (stickyCTA && heroSection) {
  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyCTA.style.opacity = '1';
      stickyCTA.style.pointerEvents = 'auto';
    } else {
      stickyCTA.style.opacity = '0';
      stickyCTA.style.pointerEvents = 'none';
    }
  });
}
