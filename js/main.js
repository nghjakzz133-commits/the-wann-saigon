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

  /* =====================================================
     1. HEADER + STICKY CTA (SCROLL STATE)
  ===================================================== */
  const header = document.querySelector('.site-header');
  const heroSection = document.querySelector('.hero');
  const stickyCTA = document.querySelector('.sticky-cta');

  function handleScroll() {
    const y = window.scrollY;

    // Header background
    if (header) {
      header.classList.toggle('scrolled', y > 60);
    }

    // Sticky CTA after hero
    if (heroSection && stickyCTA) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      stickyCTA.classList.toggle('show', heroBottom < 0);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });


  /* =====================================================
     2. REVEAL ON SCROLL (INTERSECTION OBSERVER)
     Usage: data-reveal
  ===================================================== */
  function initReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (reduceMotion) {
      targets.forEach(el => el.classList.add('show'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach(el => {
      el.classList.add('fade');
      observer.observe(el);
    });
  }


  /* =====================================================
     3. HERO TITLE INTRO (SUBTLE)
  ===================================================== */
  function initHeroIntro() {
    if (reduceMotion) return;
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    setTimeout(() => {
      heroTitle.classList.add('show');
    }, 300);
  }


  /* =====================================================
     4. LANGUAGE SWITCH (VI / EN)
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
      btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
      });
    });

    setLanguage(localStorage.getItem('lang') || 'vi');
  }


  /* =====================================================
     5. MOBILE MENU TOGGLE
  ===================================================== */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    // Auto-close when click link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }


  /* =====================================================
     6. HORIZONTAL DRAG SCROLL (DESKTOP)
  ===================================================== */
  function initHorizontalDrag() {
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
     INIT
  ===================================================== */
  initReveal();
  initHeroIntro();
  initLanguage();
  initMobileMenu();
  initHorizontalDrag();
  handleScroll(); // initial state

});
document.querySelectorAll('.video-item').forEach(video => {
  video.addEventListener('click', () => {
    video.muted = false;
    video.volume = 1;
    video.controls = true;
    video.play();
  });
});
document.querySelectorAll('.video-item-wrap').forEach(wrap => {
  const video = wrap.querySelector('.video-item');
  const hint  = wrap.querySelector('.video-sound-hint');

  wrap.addEventListener('click', () => {
    // tắt tiếng các video khác
    document.querySelectorAll('.video-item').forEach(v => {
      if (v !== video) {
        v.muted = true;
        v.controls = false;
      }
    });

    // bật tiếng video được chọn
    video.muted = false;
    video.volume = 1;
    video.controls = true;
    video.play();

    // ẩn hint
    hint.style.display = 'none';
  });
});
