/* ============================
   LETTERS PAGE JS — letters.js
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. THE DATABASE OF 50 LOVE LETTERS (TEXT ONLY) ──
  const loveLetters = [
    "I don't need the crowds and the cheers. Just tell me that you love me because that's all I need to hear.",
    "What a privilege to meet someone who makes the world a better place just by being in it.",
    "Sa kada gastos ko sa'yo, huwag kang mag-alala dahil mas madali mag-ipon. Mas mahirap ang 'di ka mahalin.",
    "Many may rise higher, but none can wear your soul. They may exceed your best, but they can't replicate your being.",
    "You'll always be my why.",
    "I'm very indecisive, but I am certain about you.",
    "You'll always be worthy even in the days you don't feel like it.",
    "I am constantly in awe of your resilience. You are a fighter who continues to move forward no matter how difficult life becomes. I am so proud of you.",
    "Kung sakaling maligaw ka sa dami ng iniisip at pinagdadaanan mo, sana ay gabayan ka ng hangin pabalik sa mga bagay na minsang nagbigay sa'yo ng saya.",
    "I know today might not be easy, but you've survived every difficult day you've faced so far. I believe in you.",
    "Take things one step at a time. You don't have to have everything figured out today.",
    "One of my favorite things about loving you is discovering little reasons to love you more every day.",
    "No matter where I am, being with you feels like home.",
    "You're so intertwined in my soul that I cannot fathom a day without you and maybe that makes me a fool.",
    "Wala nang mas gaganda pa sa tinataglay mong ganda.",
    "You are so full of the best things in the world and you always will be.",
    "If I had a flower for every time I thought of you, I could walk through my garden forever.",
    "All of me loves all of you, love your curves and all your edges, all your perfect imperfections. — John Legend, All of Me",
    "Life is hard but I want to do it with you.",
    "Whatever our souls are made of, his and mine are the same.",
    "You are proof that the best things in life arrive when we least expect them.",
    "No matter how much you grow and change, I'll always be proud of the person you're becoming.",
    "I fell in love with your smile, but I stayed because of your heart.",
    "You are my 7 minutes.",
    "I hope life gives you everything you've been working so hard for.",
    "No achievement of mine will ever feel complete if I can't celebrate it with you.",
    "You deserve every good thing that's coming your way.",
    "I'm your number one glazer and meatrider, always.",
    "When I am six feet underground, my hand will still reach for yours.",
    "Death will try to erase me but freedom never appealed to me the way you did.",
    "Death can take my breath, my warmth, my voice but it cannot take what my body decided was home.",
    "My love for you will always be ineffable.",
    "I'll tattoo your face crying on my butt to let you know I'll always wipe your tears.",
    "Love isn't a place, it's a person who sees every version of you and stays anyway.",
    "Hindi ka mahirap mahalin. Mas mahirap ang hindi ka mahalin.",
    "Take my hand, take my whole life too.",
    "No matter where life takes us, you'll always have a special place in my heart.",
    "You make me believe that love can be peaceful, not just exciting.",
    "Your dreams matter. Your feelings matter. You matter.",
    "I can't take the pain away but I can sit with you in it.",
    "Of all the lives that exist, I am so happy to exist in yours.",
    "And if loving you is hell, then let me keep burning.",
    "You do not have to be your best self with me. I would recognize you even in pieces.",
    "I wanna learn things about you that no one cared enough to know.",
    "I could write a thousand reasons why I love you, and it still wouldn't be enough to explain the depth of what I feel for you.",
    "Knowing you more could never make me love you less.",
    "The art of not being ready and doing it anyway will carry you farther than perfection ever could. Always do it scared.",
    "I'd bear all the pain of this life and crawl over the bones of every version of myself to find you in every universe.",
    "You are every lovely thing I could possibly think of.",
    "I am counting down the days until I can stand at the end of an aisle and watch you walk towards me. I love you, unconditionally."
  ];

  // ── 2. DOM Elements ──
  const drawBtn = document.getElementById('draw-btn');
  const statusText = document.getElementById('roulette-status');
  const envelope = document.querySelector('.envelope');
  const waxSeal = document.getElementById('env-seal');
  
  const envTitle = document.getElementById('env-title');
  const envBody = document.getElementById('env-body');

  let isSpinning = false;

  // ── 3. The Draw/Roulette Logic ──
  drawBtn.addEventListener('click', () => {
    if (isSpinning) return;
    
    // Close envelope and set state
    isSpinning = true;
    drawBtn.disabled = true;
    envelope.classList.remove('is-open');
    statusText.textContent = "Reaching into the vault...";
    
    // Wait for envelope to visually close before starting the spin
    setTimeout(() => {
      startRoulette();
    }, 600); 
  });

  function startRoulette() {
    // Add blur animation class to title
    envTitle.classList.add('spinning-text');
    
    let ticks = 0;
    const maxTicks = 20; 
    const speed = 70; 
    
    const phrases = [
      "Unsealing the vault...", 
      "Finding a memory...", 
      "Listening to the stars...", 
      "Looking back...", 
      "Thinking of you..."
    ];
    
    // Play the rapid flashing animation
    const spinInterval = setInterval(() => {
      envTitle.textContent = phrases[Math.floor(Math.random() * phrases.length)];
      
      ticks++;
      
      // When done spinning
      if (ticks >= maxTicks) {
        clearInterval(spinInterval);
        landOnLetter();
      }
    }, speed);
  }

  function landOnLetter() {
    // Pick the final letter text
    const finalText = loveLetters[Math.floor(Math.random() * loveLetters.length)];
    
    // Remove blur and set static title
    envTitle.classList.remove('spinning-text');
    envTitle.textContent = "A Message For You";

    // Inject text into the paper
    envBody.innerHTML = `<p>${finalText}</p>`;
    statusText.textContent = "A memory has chosen you.";

    // Trigger the Wax Seal Break animation
    waxSeal.style.animation = 'none';
    waxSeal.offsetHeight; // trigger reflow
    waxSeal.style.animation = 'sealBreak 0.5s ease forwards';

    // Open the envelope
    setTimeout(() => {
      envelope.classList.add('is-open');
      isSpinning = false;
      drawBtn.disabled = false;
      drawBtn.innerHTML = "Draw Another Letter ✦";
    }, 400);
  }

  // ── 4. Seal Break Animation CSS Injection ──
  if (!document.getElementById('seal-style')) {
    const style = document.createElement('style');
    style.id = 'seal-style';
    style.textContent = `
      @keyframes sealBreak {
        0%   { transform: scale(1) rotate(0deg); }
        25%  { transform: scale(1.2) rotate(-8deg); }
        50%  { transform: scale(0.9) rotate(5deg); }
        75%  { transform: scale(1.1) rotate(-3deg); }
        100% { transform: scale(0.85) rotate(0deg); opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── 5. Mobile Nav (Standard Integration) ──
  const navHamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  if (navHamburger && mobileNav && mobileNavClose) {
    navHamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
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