/* =========================================================
   THE WANN SAIGON – LUXURY JAVASCRIPT (V2)
   Purpose: UI polish • Smooth interaction • Bilingual
   Rule: Clean – Stable – Easy to maintain
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     GLOBAL FLAGS
  ===================================================== */
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const isTouchDevice = 'ontouchstart' in window;

  /* =====================================================
     1. HEADER + STICKY CTA
  ===================================================== */
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('.hero');
  const stickyCTA = document.querySelector('.sticky-cta');

  function handleScroll() {
    const y = window.scrollY;

    if (header) {
      header.classList.toggle('scrolled', y > 60);
    }

    if (heroSection && stickyCTA) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      stickyCTA.classList.toggle('show', heroBottom < 0);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* =====================================================
     2. REVEAL ON SCROLL
  ===================================================== */
  function initReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (reduceMotion) {
      targets.forEach(el => el.classList.add('show'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    targets.forEach(el => {
      el.classList.add('fade');
      observer.observe(el);
    });
  }

  /* =====================================================
     3. HERO INTRO
  ===================================================== */
  function initHeroIntro() {
    if (reduceMotion) return;
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    setTimeout(() => heroTitle.classList.add('show'), 300);
  }

  /* =====================================================
     4. LANGUAGE SWITCH
  ===================================================== */
  function initLanguage() {
    const langButtons = document.querySelectorAll('[data-lang]');
    const transEls = document.querySelectorAll('[data-vi][data-en]');
    if (!langButtons.length || !transEls.length) return;

    function setLanguage(lang) {
      transEls.forEach(el => {
        el.innerHTML = el.dataset[lang] || el.dataset.vi;
      });
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem('lang', lang);
    }

    langButtons.forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    setLanguage(localStorage.getItem('lang') || 'vi');
  }

  /* =====================================================
     5. MOBILE MENU
  ===================================================== */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }

  /* =====================================================
     6. HORIZONTAL DRAG (DESKTOP ONLY)
  ===================================================== */
  function initHorizontalDrag() {
    if (isTouchDevice) return; // ⛔ mobile KHÔNG dùng drag JS

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
        const walk = (x - startX) * 1.6;
        gallery.scrollLeft = scrollLeft - walk;
      });
    });
  }

  /* =====================================================
     7. VIDEO GESTURE FIX (MOBILE)
     - kéo ngang trong video
     - kéo dọc vẫn scroll page
  ===================================================== */
  function initVideoGesture() {
    if (!isTouchDevice) return;

    document
      .querySelectorAll('.video-track, .night-motion .motion-track')
      .forEach(track => {
        let startX = 0;
        let startY = 0;

        track.addEventListener('touchstart', e => {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        }, { passive: true });

        track.addEventListener('touchmove', e => {
          const dx = e.touches[0].clientX - startX;
          const dy = e.touches[0].clientY - startY;

          // CHỈ chặn khi kéo ngang rõ ràng
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
            e.preventDefault();
          }
        }, { passive: false });
      });
  }

  /* =====================================================
     8. VIDEO SOUND – LIBRARY
  ===================================================== */
  function initVideoSound() {
    document.querySelectorAll('.video-item-wrap').forEach(wrap => {
      const video = wrap.querySelector('.video-item');
      const hint  = wrap.querySelector('.video-sound-hint');
      if (!video) return;

      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      wrap.addEventListener('click', () => {
        document.querySelectorAll('.video-item').forEach(v => {
          if (v !== video) v.muted = true;
        });

        video.muted = false;
        video.volume = 1;
        video.play();

        if (hint) hint.style.display = 'none';
      });
    });
  }

  /* =====================================================
     9. VIDEO SOUND – HOME (night-motion)
  ===================================================== */
  function initHomeVideoSound() {
    document.querySelectorAll('.night-motion video').forEach(video => {
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');

      video.addEventListener('click', () => {
        document.querySelectorAll('.night-motion video').forEach(v => {
          if (v !== video) v.muted = true;
        });

        video.muted = false;
        video.volume = 1;
        video.play();
      });
    });
  }

  /* =====================================================
     INIT
  ===================================================== */
  initReveal();
  initHeroIntro();
  initLanguage();
  initMobileMenu();
  initHorizontalDrag();
  initVideoGesture();
  initVideoSound();
  initHomeVideoSound();
  handleScroll();

});
