/* ============================
   INDEX PAGE JS — index.js
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Floating Hearts on Click ── */
  const canvas = document.getElementById('hearts-canvas');
  if (canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const hearts = [];

    window.addEventListener('resize', () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Heart {
      constructor(x, y) {
        this.x     = x;
        this.y     = y;
        this.size  = Math.random() * 18 + 10;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = -(Math.random() * 3 + 2);
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed  = (Math.random() - 0.5) * 0.08;
        this.symbols = ['♡', '♥', '❤', '✿', '✦', '🌸'];
        this.symbol  = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        const hue  = Math.random() * 30 + 340; // pinks/reds
        const sat  = Math.random() * 30 + 60;
        const light= Math.random() * 20 + 55;
        this.color = `hsl(${hue}, ${sat}%, ${light}%)`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.04; // gentle gravity
        this.alpha -= this.decay;
        this.rotation += this.rotSpeed;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px serif`;
        ctx.fillStyle = this.color;
        ctx.textAlign  = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    function spawnHearts(x, y, count = 6) {
      for (let i = 0; i < count; i++) {
        hearts.push(new Heart(x, y));
      }
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = hearts.length - 1; i >= 0; i--) {
        hearts[i].update();
        hearts[i].draw();
        if (hearts[i].alpha <= 0) hearts.splice(i, 1);
      }
      requestAnimationFrame(loop);
    }
    loop();

    // Spawn on click/tap
    document.addEventListener('click', e => {
      if (e.target.closest('a, button')) return;
      spawnHearts(e.clientX, e.clientY, 8);
    });
    document.addEventListener('touchstart', e => {
      const t = e.touches[0];
      spawnHearts(t.clientX, t.clientY, 6);
    }, { passive: true });

    // Idle burst every 5s in hero
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.7;
      spawnHearts(x, y, 3);
    }, 5000);
  }

  /* ── 2. Parallax tilt on grid polaroids (mouse) ── */
  if (window.innerWidth > 768) {
    const heroLayer = document.querySelector('.hero-layer');
    if (heroLayer) {
      document.addEventListener('mousemove', e => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx; // -1 to 1
        const dy = (e.clientY - cy) / cy;

        // Subtle parallax on the hero title
        const title = heroLayer.querySelector('.hero-title');
        if (title) {
          title.style.transform = `translate(${dx * 8}px, ${dy * 5}px)`;
        }
        // Counter moves slightly opposite
        const counter = heroLayer.querySelector('.love-counter');
        if (counter) {
          counter.style.transform = `translate(${-dx * 4}px, ${-dy * 3}px)`;
        }
      });
    }
  }

  /* ── 3. Quick-links card tilt (3D) ── */
  document.querySelectorAll('.quick-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-5px) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.35s ease';
    });
  });

  /* ── 4. Glitter sparkle on nav logo ── */
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      const rect = logo.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const canvas = document.getElementById('hearts-canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        for (let i = 0; i < 12; i++) {
          const sparkle = {
            x: cx + (Math.random()-0.5)*40,
            y: cy + (Math.random()-0.5)*20,
          };
          // tiny sparkles drawn immediately
          ctx.save();
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = '#e8c87a';
          ctx.font = `${Math.random()*8+6}px serif`;
          ctx.fillText('✦', sparkle.x, sparkle.y);
          ctx.restore();
        }
        setTimeout(() => ctx.clearRect(rect.left-20, rect.top-20, rect.width+40, rect.height+40), 400);
      }
    });
  }

  /* ── 5. Entrance animation stagger for hero ── */
  const heroEls = document.querySelectorAll('.hero-layer .hero-badge, .hero-layer .hero-title, .hero-layer .hero-sub, .hero-layer .hero-buttons, .hero-layer .love-counter');
  heroEls.forEach((el, i) => {
    el.style.opacity  = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.9s ease ${i * 0.14}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.14}s`;
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 140);
  });

});