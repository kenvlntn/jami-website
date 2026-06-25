/* ============================
   LETTERS PAGE JS — blogs.js
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Calculate Days & Months Together ── */
  // NOTE: Set this to your exact official relationship start date!
  const startDate = new Date('2023-06-26T00:00:00'); 
  const now = new Date();
  
  // Calculate total days
  const totalDays = Math.max(0, Math.floor((now - startDate) / (1000 * 60 * 60 * 24)));

  // Inject into the Stats Bar
  const daysStat = document.getElementById('stat-days');
  if (daysStat) {
    daysStat.textContent = totalDays.toLocaleString();
  }

  /* ── 2. Scroll Progress Bar (Top of Screen) ── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
    background: linear-gradient(to right, var(--rose, #c4877a), var(--gold, #c9954a));
    width: 0%; transition: width 0.1s ease; pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });

  /* ── 3. Smooth Scroll Reveal (Intersection Observer) ── */
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stops observing once revealed to keep it visible
      }
    });
  }, { 
    threshold: 0.15, 
    rootMargin: '0px 0px -50px 0px' 
  });

  // Add a slight stagger effect to the grid cards so they don't all pop in at once
  document.querySelectorAll('.months-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.month-card, .blog-card-soon');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${(index % 4) * 0.1}s`; 
    });
  });

  revealElements.forEach(el => observer.observe(el));

  /* ── 4. Dynamic Letter Modal Logic ── */
  // Select ALL cards that have the 'active' class and a 'data-img' attribute
  const letterCards = document.querySelectorAll('.blog-card-soon.active[data-img]');
  const letterModal = document.getElementById('letter-modal');
  const closeModalBtn = document.getElementById('modal-close');
  const modalBg = document.querySelector('.letter-modal-bg');
  const modalImage = document.getElementById('modal-image');

  if (letterModal && closeModalBtn && modalImage) {
    
    // Loop through every clickable card
    letterCards.forEach(card => {
      card.addEventListener('click', () => {
        // Find out which image this specific card wants to show
        const imgSrc = card.getAttribute('data-img');
        
        // Put that image into the modal
        modalImage.src = imgSrc;
        
        // Open the modal
        letterModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
      });
    });

    // Close Modal Function
    const closeModal = () => {
      letterModal.classList.remove('active');
      document.body.style.overflow = ''; // Restores scrolling
      
      // Clear the image source after it fades out so it doesn't flash the old image next time
      setTimeout(() => { modalImage.src = ""; }, 500);
    };

    // Close on X Button
    closeModalBtn.addEventListener('click', closeModal);

    // Close when clicking the dark blurred background
    if (modalBg) {
      modalBg.addEventListener('click', closeModal);
    }

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && letterModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});