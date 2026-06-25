/* ============================
   GLOBAL JS — main.js
   Film & Forever
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Custom Cursor ── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursor && cursorRing && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Ring follows with slight lag
    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state for interactive elements
    const hoverables = document.querySelectorAll('a, button, [data-hover], .month-card, .quick-card, .blog-card, .grid-polaroid, .tl-polaroid');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        cursorRing.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        cursorRing.classList.remove('hovered');
      });
    });
  }

  /* ── 2. Sticky Nav ── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ── 3. Mobile Nav ── */
  const hamburger   = document.querySelector('.nav-hamburger');
  const mobileNav   = document.querySelector('.mobile-nav-overlay');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }
    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    function closeMenu() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── 4. Scroll Reveal (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal, .tl-item, .tl-content, .tl-media');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ── 5. Active Nav Link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
  });

  /* ── 6. Smooth Page Transitions ── */
  const curtain = document.querySelector('.page-curtain');
  if (curtain) {
    // Animate out on load
    curtain.style.transformOrigin = 'top';
    curtain.style.transform = 'scaleY(1)';
    curtain.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        curtain.style.transform = 'scaleY(0)';
      });
    });

    // Animate in on exit
    document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto"])').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('//')) return;
        e.preventDefault();
        curtain.style.transformOrigin = 'bottom';
        curtain.style.transform = 'scaleY(1)';
        setTimeout(() => { window.location.href = href; }, 600);
      });
    });
  }

  /* ── 7. Timeline Spine Fill ── */
  const spineFill = document.querySelector('.timeline-spine-fill');
  if (spineFill) {
    const spine = document.querySelector('.timeline-spine');
    const updateSpine = () => {
      const rect   = spine.getBoundingClientRect();
      const total  = spine.offsetHeight;
      const visible = Math.min(Math.max(window.innerHeight - rect.top, 0), total);
      spineFill.style.height = (visible / total * 100) + '%';
    };
    window.addEventListener('scroll', updateSpine, { passive: true });
    updateSpine();
  }

  /* ── 8. Love Counter ── */
function updateLoveCounter() {
  const counterYears = document.getElementById('counter-years');
  const counterMonths = document.getElementById('counter-months');
  const counterDays = document.getElementById('counter-days');
  const counterHours = document.getElementById('counter-hours');
  const counterMinutes = document.getElementById('counter-minutes');
  const counterSeconds = document.getElementById('counter-seconds');

  if (!counterYears || !counterMonths || !counterDays || !counterHours || !counterMinutes || !counterSeconds) {
    return;
  }

  // Set your exact start date and time here (Year-Month-DayTHour:Minute:Second)
  const startDate = new Date('2023-06-26T00:00:00');
  const now = new Date();
  
  // Total time difference in milliseconds
  const diff = now - startDate;

  // 1. Calculate ticking time (Hours, Minutes, Seconds)
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // 2. Calculate Total Days
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  // 3. Calculate Years Strong
  let years = now.getFullYear() - startDate.getFullYear();
  if (now.getMonth() < startDate.getMonth() || 
     (now.getMonth() === startDate.getMonth() && now.getDate() < startDate.getDate())) {
      years--;
  }

  // 4. Calculate Monthsaries
  let months = (now.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += now.getMonth();
  if (now.getDate() < startDate.getDate()) {
      months--;
  }

  // Update the HTML text and pad single digits with a zero (e.g., "09" instead of "9")
  counterYears.innerText = years;
  counterMonths.innerText = months;
  counterDays.innerText = totalDays.toLocaleString(); // Adds commas
  counterHours.innerText = hours.toString().padStart(2, '0');
  counterMinutes.innerText = minutes.toString().padStart(2, '0');
  counterSeconds.innerText = seconds.toString().padStart(2, '0');
}

// Run the function immediately so it doesn't show "—" for a second
updateLoveCounter();

// Set the counter to update every 1 second
if (document.getElementById('counter-years')) {
  setInterval(updateLoveCounter, 1000);
}

  function animateCount(el, target) {
    let current = 0;
    const duration = 1800;
    const start    = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.round(ease * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Trigger counter when visible
  const counterSection = document.querySelector('.love-counter');
  if (counterSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        updateLoveCounter();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(counterSection);
  }

});
