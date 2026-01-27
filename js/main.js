/* =========================================================
   THE WANN SAIGON – LUXURY JAVASCRIPT
   Purpose: UI polish • Smooth interaction • Bilingual
   Rule: Clean – Stable – Easy to maintain
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     1. HEADER SCROLL EFFECT
     - Đổi nền header khi scroll xuống
     - Tạo cảm giác sang & rõ header hơn
  ===================================================== */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }


  /* =====================================================
     2. SECTION FADE-IN ON SCROLL
     - Hiệu ứng xuất hiện nhẹ khi scroll
     - Luxury: chậm – mượt – không phô
  ===================================================== */
  const sections = document.querySelectorAll('section');

  if (sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => {
      section.classList.add('fade');
      observer.observe(section);
    });
  }


  /* =====================================================
     3. SMOOTH SCROLL (ANCHOR LINK)
     - Chỉ áp dụng cho link dạng #id
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
     4. BUTTON MICRO HOVER EFFECT
     - Nhấc nút lên nhẹ khi hover
     - Chỉ để cảm giác cao cấp, không animation gắt
  ===================================================== */
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
    });
  });


  /* =====================================================
     5. LANGUAGE SWITCH (VI / EN)
     - Dựa trên data-vi & data-en
     - Lưu ngôn ngữ vào localStorage
     - Mặc định: Tiếng Việt
  ===================================================== */
  const langButtons = document.querySelectorAll('[data-lang]');
  const transEls = document.querySelectorAll('[data-vi][data-en]');

  function setLanguage(lang) {
    transEls.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
    localStorage.setItem('lang', lang);
  }

  // Click đổi ngôn ngữ
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Load lại ngôn ngữ đã chọn
  const savedLang = localStorage.getItem('lang') || 'vi';
  setLanguage(savedLang);


  /* =====================================================
     6. MOBILE MENU TOGGLE
     - Bật / tắt menu khi bấm icon ☰
     - Chỉ hoạt động khi đủ element
  ===================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

});
