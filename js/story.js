/* ============================
   STORY PAGE JS — story.js
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Timeline item reveal ── */
  const tlItems = document.querySelectorAll('.tl-item, .tl-year-marker'); // Added year markers so they reveal too!
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -80px 0px' });
  tlItems.forEach(item => observer.observe(item));

  /* ── 2. Polaroid 3D tilt on the timeline ── */
  document.querySelectorAll('.tl-polaroid').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(500px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease';
      const isOdd = card.closest('.tl-item') &&
        Array.from(document.querySelectorAll('.tl-item')).indexOf(card.closest('.tl-item')) % 2 === 0;
      card.style.transform = isOdd ? 'rotate(2.5deg)' : 'rotate(-2.5deg)';
    });
  });

  /* ── 3. Floating petals background for hero ── */
  const hero = document.querySelector('.story-hero');
  if (hero) {
    const petals = ['🌸','✿','❀','⚘','🌺','✦','♡'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('span');
      p.className = 'story-petal';
      p.textContent = petals[Math.floor(Math.random() * petals.length)];
      p.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        font-size: ${Math.random() * 14 + 10}px;
        opacity: ${Math.random() * 0.12 + 0.04};
        animation: petalFloat ${Math.random() * 6 + 6}s ease-in-out ${Math.random() * 4}s infinite alternate;
        pointer-events: none;
        z-index: 1;
      `;
      hero.appendChild(p);
    }
    if (!document.getElementById('petal-style')) {
      const style = document.createElement('style');
      style.id = 'petal-style';
      style.textContent = `
        @keyframes petalFloat {
          0%   { transform: translateY(0)   rotate(0deg); }
          100% { transform: translateY(-28px) rotate(25deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ── 4. "Years / months / days" display in hero ── */
  const startDate = new Date('2023-06-26'); // Updated to your Start of Relationship date!
  const now = new Date();
  const ms  = now - startDate;
  const totalDays   = Math.floor(ms / 86400000);
  const totalMonths = Math.floor(totalDays / 30.44);

  const heroSub = document.querySelector('.story-hero p');
  if (heroSub) {
    heroSub.innerHTML = `A love story told in moments — <strong>${totalMonths} months</strong> and counting forever`;
  }

  /* ── 5. Scroll progress bars (Horizontal Top & Vertical Spine) ── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; z-index: 600;
    background: linear-gradient(to right, var(--rose, #c4877a), var(--gold, #c9954a));
    width: 0%; transition: width 0.1s ease; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  const spineFill = document.querySelector('.timeline-spine-fill');
  const timelineSection = document.querySelector('.timeline-section');

  window.addEventListener('scroll', () => {
    // Top Horizontal Bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';

    // Center Vertical Spine Fill
    if (timelineSection && spineFill) {
      const rect = timelineSection.getBoundingClientRect();
      const fillHeight = (window.innerHeight / 2) - rect.top; // Calculates to the exact 50vh point
      const maxFill = rect.height;
      const percentage = Math.max(0, Math.min(100, (fillHeight / maxFill) * 100));
      spineFill.style.height = `${percentage}%`;
    }
  }, { passive: true });

  /* ── 6. Background Polaroid Infinite Scroll Loop ── */
  const scrollColumns = document.querySelectorAll('.p-col-inner');
  scrollColumns.forEach(col => {
    col.innerHTML += col.innerHTML; 
  });

  /* ── 7. Magical Starburst Flare Tracker ── */
  const highlightCards = document.querySelectorAll('.tl-item-highlight .tl-content');

  highlightCards.forEach(card => {
    const flare = document.createElement('div');
    flare.className = 'starburst-flare';
    flare.innerHTML = `
      <div class="flare-inner"></div>
      <div class="flare-core"></div>
    `;
    card.appendChild(flare);

    let isHovering = false;
    let perimeterProgress = 0; 
    let speed = 2; 
    
    let currentX = 0, currentY = 0;
    let targetX = 0, targetY = 0;

    const animateFlare = () => {
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const perimeter = (width + height) * 2;

      if (!isHovering) {
        perimeterProgress += speed;
        perimeterProgress = perimeterProgress % perimeter;

        if (perimeterProgress < width) { 
          targetX = perimeterProgress; targetY = 0;
        } else if (perimeterProgress < width + height) { 
          targetX = width; targetY = perimeterProgress - width;
        } else if (perimeterProgress < width * 2 + height) { 
          targetX = width - (perimeterProgress - (width + height)); targetY = height;
        } else { 
          targetX = 0; targetY = height - (perimeterProgress - (width * 2 + height));
        }
      }

      currentX += (targetX - currentX) * 0.08; 
      currentY += (targetY - currentY) * 0.08;

      flare.style.left = `${currentX}px`;
      flare.style.top = `${currentY}px`;
      flare.style.transform = `translate(-50%, -50%) rotate(${(currentX + currentY) * 0.5}deg)`;

      requestAnimationFrame(animateFlare);
    };

    animateFlare();

    card.addEventListener('mousemove', (e) => {
      isHovering = true;
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      if (targetY < 10) perimeterProgress = targetX;
      else if (targetX > width - 10) perimeterProgress = width + targetY;
      else if (targetY > height - 10) perimeterProgress = width + height + (width - targetX);
      else perimeterProgress = width * 2 + height + (height - targetY);
    });
  });
  /* ── 8. Hover-to-Play Video Logic (With Sound) ── */
  const polaroidVideos = document.querySelectorAll('.tl-polaroid-photo video');

  polaroidVideos.forEach(video => {
    // Make sure it is paused on load
    video.pause();

    // Grab the whole polaroid container
    const polaroidContainer = video.closest('.tl-polaroid');

    if (polaroidContainer) {
      // Play when the mouse enters the polaroid
      polaroidContainer.addEventListener('mouseenter', () => {
        video.play().catch(error => {
          // Silent catch for strict browser audio policies (see note below)
          console.warn("Browser blocked audio. User must click the page first.", error);
        });
      });

      // Pause when the mouse leaves the polaroid
      polaroidContainer.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
});
