/* ===============================
   THE WANN SAIGON – LUXURY JS
   Clean • Smooth • High-end
================================ */

// 1. Header đổi style khi scroll
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// 2. Fade-in section khi scroll (rất sang)
const sections = document.querySelectorAll('section');

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


// 3. Smooth scroll cho anchor
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


// 4. Button hover micro-effect (luxury feel)
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'translateY(-2px)';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0)';
  });
});
const langButtons = document.querySelectorAll('[data-lang]');
const transEls = document.querySelectorAll('[data-vi]');

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');

    transEls.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    localStorage.setItem('lang', lang);
  });
});

// Load lại ngôn ngữ đã chọn
const savedLang = localStorage.getItem('lang') || 'vi';
transEls.forEach(el => {
  el.textContent = el.getAttribute(`data-${savedLang}`);
});
// JS bật/tắt menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
