// ============================================================
// SCROLL.JS — Scroll-driven effects & project interactions
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initProjectRowHover();
  initFilterTabs();
  initCounters();
  initParallax();
});

// ============================================================
// PROJECT ROW HOVER IMAGE FOLLOW
// ============================================================

function initProjectRowHover() {
  const rows = document.querySelectorAll('.project-row[data-img]');
  if (!rows.length) return;

  // Create floating image follower
  const follower = document.createElement('div');
  follower.className = 'hover-image-follow';
  const followerImg = document.createElement('img');
  follower.appendChild(followerImg);
  document.body.appendChild(follower);

  let currentImg = null;
  let raf;

  let mouseX = 0, mouseY = 0;
  let followX = 0, followY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateFollower() {
    followX += (mouseX - followX) * 0.1;
    followY += (mouseY - followY) * 0.1;
    follower.style.left = followX + 'px';
    follower.style.top  = followY + 'px';
    raf = requestAnimationFrame(animateFollower);
  }

  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const imgSrc = row.dataset.img;
      if (imgSrc !== currentImg) {
        followerImg.src = imgSrc;
        currentImg = imgSrc;
      }
      follower.classList.add('active');
      if (!raf) animateFollower();
    });

    row.addEventListener('mouseleave', () => {
      follower.classList.remove('active');
    });
  });
}

// ============================================================
// FILTER TABS (projects page)
// ============================================================

function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const rows = document.querySelectorAll('.project-row');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      rows.forEach(row => {
        const category = row.dataset.category || '';

        if (filter === 'all' || category.includes(filter)) {
          row.style.display = '';
          // Re-trigger reveal animation
          row.style.opacity = '0';
          row.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              row.style.opacity = '1';
              row.style.transform = 'translateY(0)';
            });
          });
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// ============================================================
// ANIMATED COUNTERS
// ============================================================

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

// ============================================================
// SUBTLE PARALLAX
// ============================================================

function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.1;
          const rect = el.getBoundingClientRect();
          const offset = (rect.top + scrollY) - window.innerHeight / 2;
          el.style.transform = `translateY(${offset * speed}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}
