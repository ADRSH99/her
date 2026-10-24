/* ========================================================
   ROMANTIC PIXEL RETRO LOVE SCRIPT
   - 24 Photos Dynamic Polaroid Scrapbook
   - Ambient Floating Pixel Canvas + Click Explosions
   - Built-in Web Audio API 8-Bit Chiptune & Sound Effects
   - Interactive Love Reasons Generator & Virtual Hugs
   ======================================================== */

// 1. DATA: Photos & Sweet Captions
const PHOTO_DATA = [
  { file: 'photo_01.jpg', caption: 'My Favorite Smile ✨', sticker: '🌸' },
  { file: 'photo_02.jpg', caption: 'Pure Sunshine ☀️', sticker: '💖' },
  { file: 'photo_03.jpg', caption: 'The Sweetest Soul 🩵', sticker: '✨' },
  { file: 'photo_04.jpg', caption: 'Cutie Pie Energy 🥰', sticker: '🎀' },
  { file: 'photo_05.jpg', caption: 'Every Moment With You ❤️', sticker: '🧸' },
  { file: 'photo_06.jpg', caption: 'My Heart In Human Form 💫', sticker: '🍭' },
  { file: 'photo_07.jpg', caption: 'Endless Butterflies 🦋', sticker: '🌷' },
  { file: 'photo_08.jpg', caption: 'That Radiant Glow 🌟', sticker: '💎' },
  { file: 'photo_09.jpg', caption: 'Forever My Person 🤍', sticker: '💌' },
  { file: 'photo_10.jpg', caption: 'World High Score: You 🏆', sticker: '👾' },
  { file: 'photo_11.jpg', caption: 'My Comfort Place ☁️', sticker: '🌙' },
  { file: 'photo_12.jpg', caption: 'Sweetest Eyes in the Galaxy 👀', sticker: '✨' },
  { file: 'photo_13.jpg', caption: 'Adorable Always 🥺', sticker: '🍓' },
  { file: 'photo_14.jpg', caption: 'Never Stop Smiling 🌻', sticker: '💕' },
  { file: 'photo_15.jpg', caption: 'A Masterpiece 🎨', sticker: '🪄' },
  { file: 'photo_16.jpg', caption: 'My Dream Come True 🌈', sticker: '🕊️' },
  { file: 'photo_17.jpg', caption: 'Heart Full of Love 💖', sticker: '🍬' },
  { file: 'photo_18.jpg', caption: 'Cuteness Overload 100% ⚡', sticker: '🐣' },
  { file: 'photo_19.jpg', caption: 'You + Me = Forever ♾️', sticker: '💍' },
  { file: 'photo_20.jpg', caption: 'Precious Moments 📸', sticker: '🌟' },
  { file: 'photo_21.jpg', caption: 'My Happy Pill 💊', sticker: '🩷' },
  { file: 'photo_22.jpg', caption: 'Best Adventure Partner 🗺️', sticker: '🚀' },
  { file: 'photo_23.jpg', caption: 'Simply Irresistible 💐', sticker: '🍒' },
  { file: 'photo_24.jpg', caption: 'I Love You To Infinity 🌌', sticker: '👑' }
];

// 2. DATA: Reasons Why I Love You
const LOVE_REASONS = [
  "The way your smile immediately brightens up even my darkest days.",
  "Your soft laugh that sounds like the sweetest melody in the world.",
  "How deeply you care about the little things and everyone around you.",
  "The gentle, warm warmth you bring into my life just by being yourself.",
  "How effortlessly cute you look, even when you aren't trying at all.",
  "Because having you in my life feels like winning the ultimate jackpot.",
  "The way you make ordinary moments feel like magical adventures.",
  "Your kindness, your heart, and your beautiful sparkling soul.",
  "How safe and completely at peace I feel whenever I talk to you.",
  "Because you are my favorite notification and my favorite thought.",
  "The cute little expressions you make when you're excited.",
  "Because I love who I am whenever I am with you.",
  "You're not just my love—you're my best friend and greatest blessing.",
  "Because no matter how big the world is, my heart only chooses you."
];

let currentPhotoIndex = 0;
let displayedPhotos = [...PHOTO_DATA];

// 3. RETRO WEB AUDIO API SYNTHESIZER
let audioCtx = null;
let bgmPlaying = false;
let bgmInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play cute 8-bit sound effects
function play8BitSound(type = 'coin') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'coin') {
      // Mario style coin ping (B5 -> E6)
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'heart') {
      // High sweet chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'powerup') {
      // Arpeggio
      const notes = [330, 392, 659, 523, 587, 784];
      notes.forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'triangle';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.06);
        subGain.gain.setValueAtTime(0.07, now + i * 0.06);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now + i * 0.06);
        subOsc.stop(now + i * 0.06 + 0.12);
      });
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
}

// Gentle Lo-Fi 8-bit Background Lullaby
const MELODY = [
  { freq: 523.25, dur: 0.35 }, // C5
  { freq: 659.25, dur: 0.35 }, // E5
  { freq: 783.99, dur: 0.45 }, // G5
  { freq: 1046.5, dur: 0.5 },  // C6
  { freq: 880.00, dur: 0.35 }, // A5
  { freq: 783.99, dur: 0.35 }, // G5
  { freq: 659.25, dur: 0.6 },  // E5
  { freq: 587.33, dur: 0.35 }, // D5
  { freq: 659.25, dur: 0.35 }, // E5
  { freq: 523.25, dur: 0.7 }   // C5
];

let noteStep = 0;
function playNextMelodyNote() {
  if (!bgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const note = MELODY[noteStep % MELODY.length];
  noteStep++;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle'; // Soft dreamy waveform
  osc.frequency.setValueAtTime(note.freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.dur);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + note.dur);
}

function toggleBGM() {
  const btn = document.getElementById('sound-btn');
  const label = btn.querySelector('.label');

  if (!bgmPlaying) {
    getAudioContext();
    bgmPlaying = true;
    label.textContent = 'BGM: ON 💖';
    play8BitSound('powerup');
    bgmInterval = setInterval(playNextMelodyNote, 480);
  } else {
    bgmPlaying = false;
    label.textContent = 'BGM: OFF';
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

// 4. POLAROID GALLERY GENERATOR
function renderPolaroids() {
  const grid = document.getElementById('polaroid-grid');
  grid.innerHTML = '';

  displayedPhotos.forEach((item, index) => {
    // Random slight tilt between -3.5 and +3.5 degrees
    const randomRot = (Math.random() * 6 - 3).toFixed(1);
    const isBlueTape = index % 2 === 1;

    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.style.transform = `rotate(${randomRot}deg)`;
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <div class="washi-tape ${isBlueTape ? 'blue-tape' : ''}"></div>
      <div class="polaroid-img-wrapper">
        <img src="assets/photos/${item.file}" alt="${item.caption}" loading="lazy">
      </div>
      <div class="polaroid-caption">${item.caption}</div>
      <span class="polaroid-sticker">${item.sticker}</span>
    `;

    card.addEventListener('click', () => {
      play8BitSound('coin');
      openLightbox(index);
    });

    grid.appendChild(card);
  });
}

function shufflePolaroids() {
  play8BitSound('powerup');
  displayedPhotos.sort(() => Math.random() - 0.5);
  renderPolaroids();
}

// 5. LIGHTBOX MODAL FUNCTIONALITY
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxOverlay = document.getElementById('lightbox-overlay');

function openLightbox(index) {
  currentPhotoIndex = index;
  const photo = displayedPhotos[currentPhotoIndex];
  lightboxImg.src = `assets/photos/${photo.file}`;
  lightboxCaption.textContent = photo.caption + ' ' + photo.sticker;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPrevPhoto() {
  play8BitSound('coin');
  currentPhotoIndex = (currentPhotoIndex - 1 + displayedPhotos.length) % displayedPhotos.length;
  openLightbox(currentPhotoIndex);
}

function showNextPhoto() {
  play8BitSound('coin');
  currentPhotoIndex = (currentPhotoIndex + 1) % displayedPhotos.length;
  openLightbox(currentPhotoIndex);
}

// 6. AMBIENT CANVAS: FLOATING PIXEL HEARTS & SPARKLES
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class PixelParticle {
  constructor(x, y, isBurst = false) {
    this.x = x !== undefined ? x : Math.random() * width;
    this.y = y !== undefined ? y : height + Math.random() * 50;
    this.size = Math.floor(Math.random() * 4) + 3; // Pixel size
    this.speedY = isBurst ? (Math.random() - 0.5) * 8 : -(Math.random() * 1.5 + 0.6);
    this.speedX = isBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.8;
    this.life = isBurst ? 60 : 200 + Math.random() * 100;
    this.maxLife = this.life;
    this.color = Math.random() > 0.5 ? '#ff6699' : '#38bdf8';
    this.isHeart = Math.random() > 0.4;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;

    if (this.isHeart) {
      // 8-bit pixel heart representation
      const s = this.size;
      ctx.fillRect(this.x, this.y, s, s);
      ctx.fillRect(this.x - s, this.y - s, s, s);
      ctx.fillRect(this.x + s, this.y - s, s, s);
      ctx.fillRect(this.x - s, this.y, s, s);
      ctx.fillRect(this.x + s, this.y, s, s);
      ctx.fillRect(this.x, this.y + s, s, s);
    } else {
      // Pixel sparkle diamond
      const s = this.size;
      ctx.fillRect(this.x, this.y - s, s, s);
      ctx.fillRect(this.x - s, this.y, s, s);
      ctx.fillRect(this.x, this.y, s, s);
      ctx.fillRect(this.x + s, this.y, s, s);
      ctx.fillRect(this.x, this.y + s, s, s);
    }
    ctx.restore();
  }
}

// Populate ambient floating particles
function initParticles() {
  for (let i = 0; i < 35; i++) {
    particles.push(new PixelParticle(Math.random() * width, Math.random() * height));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  // Add occasional new ambient particle
  if (particles.length < 50 && Math.random() < 0.1) {
    particles.push(new PixelParticle());
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.life <= 0 || p.y < -50) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateParticles);
}

// Spawn burst of hearts at (x, y)
function spawnHeartBurst(x, y, count = 22) {
  play8BitSound('heart');
  for (let i = 0; i < count; i++) {
    particles.push(new PixelParticle(x, y, true));
  }
}

// 7. INTERACTIVE REASONS & HUGS
let lastReasonIdx = -1;
function drawSweetReason() {
  play8BitSound('powerup');
  const textEl = document.getElementById('reason-text');
  const box = document.getElementById('reason-box');

  let rand;
  do {
    rand = Math.floor(Math.random() * LOVE_REASONS.length);
  } while (rand === lastReasonIdx && LOVE_REASONS.length > 1);

  lastReasonIdx = rand;

  // Pop animation
  box.style.transform = 'scale(0.95)';
  setTimeout(() => {
    textEl.textContent = `"${LOVE_REASONS[rand]}"`;
    box.style.transform = 'scale(1.03)';
    setTimeout(() => (box.style.transform = 'scale(1)'), 150);
  }, 100);

  // Burst from button
  const rect = box.getBoundingClientRect();
  spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
}

function sendVirtualHug() {
  play8BitSound('powerup');
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      particles.push(new PixelParticle(Math.random() * width, height - 10, true));
    }, i * 15);
  }

  alert("Sending you 1,000,000 warm virtual hugs and forehead kisses! 🤗💖\nYou are my whole world!");
}

function showerHearts() {
  play8BitSound('coin');
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      particles.push(new PixelParticle(Math.random() * width, Math.random() * height * 0.4, true));
    }, i * 20);
  }
}

// 8. INITIALIZATION & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  renderPolaroids();
  initParticles();
  animateParticles();

  // BGM Button
  document.getElementById('sound-btn').addEventListener('click', toggleBGM);

  // Shuffle Polaroids
  document.getElementById('shuffle-btn').addEventListener('click', shufflePolaroids);

  // Reason Generator
  document.getElementById('new-reason-btn').addEventListener('click', drawSweetReason);

  // Hug & Shower Buttons
  document.getElementById('hug-btn').addEventListener('click', sendVirtualHug);
  document.getElementById('sparkle-btn').addEventListener('click', showerHearts);

  // Lightbox controls
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrevPhoto);
  lightboxNext.addEventListener('click', showNextPhoto);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevPhoto();
    if (e.key === 'ArrowRight') showNextPhoto();
  });

  // Touch Swipe on Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) showNextPhoto();
    if (touchEndX > touchStartX + 40) showPrevPhoto();
  }, { passive: true });

  // Click anywhere to spawn mini hearts
  window.addEventListener('click', (e) => {
    // Don't spawn if clicking interactive buttons or polaroids directly handled
    if (!e.target.closest('button') && !e.target.closest('.polaroid-card') && !e.target.closest('video')) {
      spawnHeartBurst(e.clientX, e.clientY, 8);
    }
  });
});
