// ============================================================
// MAIN JS — SWISS BRUTALISM PORTFOLIO
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCursor();
  initNav();
  initScrollReveal();
  initMagneticButtons();
  initHeroAnimations();
});

// ============================================================
// LOADER
// ============================================================

function initLoader() {
  const loader = document.querySelector('.loader');
  if (!loader) return;

  document.body.classList.add('loading');

  const countEl = loader.querySelector('.loader-count');
  const lineEl = loader.querySelector('.loader-line');

  if (lineEl) {
    setTimeout(() => { lineEl.style.width = '100%'; }, 100);
  }

  // Count up animation
  let count = 0;
  const target = 100;
  const duration = 1400;
  const step = duration / target;

  const counter = setInterval(() => {
    count += Math.ceil(Math.random() * 8);
    if (count >= target) {
      count = target;
      clearInterval(counter);
    }
    if (countEl) countEl.textContent = count;
  }, step);

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    triggerHeroAnimations();
  }, 1600);
}

// ============================================================
// CURSOR
// ============================================================

function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Ring follows with delay
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover states
  const hoverEls = document.querySelectorAll('a, button, .project-row, .project-card, .filter-tab, .contact-link');

  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    });
  });

  // Click state
  document.addEventListener('mousedown', () => {
    dot.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicking');
  });
}

// ============================================================
// NAVIGATION
// ============================================================

function initNav() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  // ── Hide / show on scroll ──────────────────────────────────
  if (nav) {
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Add scrolled class after first scroll
          if (currentScrollY > 10) {
            nav.classList.add('nav--scrolled');
          } else {
            nav.classList.remove('nav--scrolled');
          }

          // Hide when scrolling DOWN past 100px, show when scrolling UP
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add('nav--hidden');
          } else {
            nav.classList.remove('nav--hidden');
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Mobile burger ──────────────────────────────────────────
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const spans = burger.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = burger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ── Active link highlighting ───────────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPath ||
        (currentPath.includes('projects') && link.getAttribute('href')?.includes('projects')) ||
        (currentPath.includes('contact') && link.getAttribute('href')?.includes('contact'))) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ============================================================
// MAGNETIC BUTTONS
// ============================================================

function initMagneticButtons() {
  const magnetics = document.querySelectorAll('.magnetic');

  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

// ============================================================
// HERO ANIMATIONS
// ============================================================

function triggerHeroAnimations() {
  const heroLines = document.querySelectorAll('.hero-line-inner');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroAccentLine = document.querySelector('.hero-accent-line');
  const heroCtas = document.querySelectorAll('.hero-cta');

  heroLines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), i * 120);
  });

  if (heroAccentLine) {
    setTimeout(() => heroAccentLine.classList.add('visible'), 250);
  }

  if (heroSubtitle) {
    setTimeout(() => heroSubtitle.classList.add('visible'), 450);
  }

  heroCtas.forEach((cta, i) => {
    setTimeout(() => cta.classList.add('visible'), 650 + i * 100);
  });
}

function initHeroAnimations() {
  // If no loader (page already visible), trigger immediately
  if (!document.querySelector('.loader')) {
    setTimeout(triggerHeroAnimations, 200);
  }
}
