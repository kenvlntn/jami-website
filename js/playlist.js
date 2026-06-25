/* ============================
   PLAYLIST PAGE JS — playlist.js
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Hero Vinyl Interaction ── */
  const vinylWrapper = document.querySelector('.vinyl-wrapper');
  const vinyl = document.getElementById('hero-vinyl');

  if (vinylWrapper && vinyl) {
    // Pause spinning on hover
    vinylWrapper.addEventListener('mouseenter', () => {
      vinyl.classList.add('paused');
    });
    // Resume spinning when mouse leaves
    vinylWrapper.addEventListener('mouseleave', () => {
      vinyl.classList.remove('paused');
    });
  }

  /* ── 2. Memory Modal Logic ── */
  const songCards = document.querySelectorAll('.song-card');
  const modalOverlay = document.getElementById('memory-modal-overlay');
  const modalBg = document.getElementById('memory-modal-bg');
  const modalClose = document.getElementById('modal-close');

  // Modal Content Elements
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalArtist = document.getElementById('modal-artist');
  const modalMemory = document.getElementById('modal-memory');
  const modalYear = document.getElementById('modal-year');

  // Open Modal when a card is clicked
  songCards.forEach(card => {
    card.addEventListener('click', () => {
      // Get data from the clicked card
      const title = card.getAttribute('data-title');
      const artist = card.getAttribute('data-artist');
      const memory = card.getAttribute('data-memory');
      const year = card.getAttribute('data-year');
      const imgSrc = card.getAttribute('data-img');

      // Populate the modal
      modalTitle.textContent = title;
      modalArtist.textContent = artist;
      modalMemory.textContent = `"${memory}"`;
      modalYear.textContent = `✦ ${year}`;
      
      if(imgSrc && imgSrc !== "") {
          modalImg.src = imgSrc;
      } else {
          // Fallback if image is missing
          modalImg.src = 'https://via.placeholder.com/100x100/2c1810/d4a85a?text=Play';
      }

      // Show the modal
      modalOverlay.classList.add('open');
      
      // Stop the page from scrolling while modal is open
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal Function
  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restore page scrolling
  };

  // Close when clicking the X button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close when clicking the dark background behind the modal
  if (modalBg) {
    modalBg.addEventListener('click', closeModal);
  }

  /* ── 3. Mobile Navigation Logic ── */
  // (Reusing the logic from your other pages to keep the menu working)
  const navHamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  if (navHamburger && mobileNav && mobileNavClose) {
    navHamburger.addEventListener('click', () => {
      mobileNav.classList.add('open'); // Ensure your CSS handles .mobile-nav-overlay.open
      mobileNav.style.opacity = '1';
      mobileNav.style.pointerEvents = 'all';
    });

    mobileNavClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileNav.style.opacity = '0';
      mobileNav.style.pointerEvents = 'none';
    });
  }

});