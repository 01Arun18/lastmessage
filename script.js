const unlockDate = new Date("2025-12-20T00:00:00");
const now = new Date();

const locked = document.getElementById("locked");
const content = document.getElementById("content");

if (now >= unlockDate) {
  locked.style.display = "none";
  content.style.display = "block";
}

const slides = document.getElementById("slides");
const totalSlides = slides.children.length;
let index = 0;

function updateSlide() {
  slides.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
}

window.nextSlide = function () {
  if (index < totalSlides - 1) {
    index++;
    updateSlide();
  }
};

window.prevSlide = function () {
  if (index > 0) {
    index--;
    updateSlide();
  }
};

const canvas = document.getElementById("memoryCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = Array.from({ length: 70 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.4 + 0.6,
  a: Math.random() * 0.5 + 0.15,
  s: Math.random() * 0.3 + 0.1
}));

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.a})`;
    ctx.fill();

    p.y -= p.s;
    if (p.y < -10) {
      p.y = h + 10;
      p.x = Math.random() * w;
    }
  }

  requestAnimationFrame(animate);
}

animate();

document.body.style.height = "auto";