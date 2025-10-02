// Animated space background with stars and a flying bird

const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// --- Starfield ---
const STAR_COUNT = 120;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.7,
    speed: Math.random() * 0.2 + 0.05,
    twinkle: Math.random() * Math.PI * 2
  });
}

// --- Flying Bird Sprite ---
const birdImg = new Image();
birdImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
<svg width="60" height="28" viewBox="0 0 60 28" xmlns="http://www.w3.org/2000/svg">
  <g>
    <ellipse cx="38" cy="14" rx="14" ry="7" fill="#f7eccc"/>
    <path d="M12 14 Q18 2, 38 14 Q18 26, 12 14" fill="#c8d8e4"/>
    <ellipse cx="45" cy="14" rx="4" ry="2" fill="#222"/>
    <ellipse cx="47" cy="13" rx="1.2" ry="1.5" fill="#fff"/>
    <polygon points="52,14 60,11 52,17" fill="#ffd700"/>
  </g>
</svg>
`);

let bird = {
  x: -60,
  y: canvas.height * 0.18,
  speed: 2.1,
  direction: 1,
  frame: 0,
  t: 0
};

// --- Animation Loop ---
function drawStars() {
  for (let s of stars) {
    // Twinkle
    s.twinkle += 0.04;
    let twinkle = Math.abs(Math.sin(s.twinkle)) * 0.5 + 0.5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * twinkle, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 240, 255, ${0.7 * twinkle})`;
    ctx.fill();
    // Move slowly
    s.x += s.speed * 0.2;
    if (s.x > canvas.width) s.x = 0;
  }
}

function drawBird() {
  bird.t += 1;
  // Gentle up/down sine wave
  bird.y = canvas.height * 0.18 + Math.sin(bird.t * 0.02) * 12;
  bird.x += bird.speed * bird.direction;
  if (bird.x > canvas.width + 60) {
    bird.x = -60;
    bird.y = canvas.height * (Math.random() * 0.3 + 0.1);
  }
  ctx.drawImage(birdImg, bird.x, bird.y, 60, 28);
}

// --- Space Nebula ---
function drawNebula() {
  let grad = ctx.createRadialGradient(
    canvas.width * 0.7, canvas.height * 0.3, canvas.height * 0.08,
    canvas.width * 0.7, canvas.height * 0.3, canvas.height * 0.5
  );
  grad.addColorStop(0, "#2a4072aa");
  grad.addColorStop(1, "#0d1c2c00");
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.7, canvas.height * 0.3, canvas.height * 0.38, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.globalAlpha = 1;
}

// --- Main Animation ---
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNebula();
  drawStars();
  drawBird();
  requestAnimationFrame(animate);
}
animate();
