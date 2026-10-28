const canvas = document.querySelector('#halftone-background');
const ctx = canvas?.getContext('2d');

if (ctx) {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, frame = 0, previous = 0;
  let x = -1000, y = -1000, targetX = x, targetY = y;
  let intensity = 0, targetIntensity = 0, pulse = 0;
  let lastInput = 0;

  function paint() {
    ctx.clearRect(0, 0, width, height);
    const spacing = Math.max(width < 600 ? 24 : 22, Math.ceil(Math.sqrt(width * height / 4500)));
    const radius = width < 600 ? 140 : 210;
    for (let cy = spacing / 2; cy < height; cy += spacing) {
      for (let cx = spacing / 2; cx < width; cx += spacing) {
        const dx = cx - x, dy = cy - y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / radius);
        const field = influence * influence * intensity;
        const ripple = Math.sin(distance / 18 - pulse * 8) * field;
        const offset = field * 14 + ripple * 5;
        const px = cx + dx / (distance || 1) * offset;
        const py = cy + dy / (distance || 1) * offset;
        ctx.fillStyle = `rgba(163,255,18,${0.18 + field * 0.24})`;
        ctx.beginPath();
        ctx.arc(px, py, 0.85 + field * 2.3 + Math.abs(ripple) * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function draw(time) {
    frame = 0;
    if (document.hidden) return;
    const delta = previous ? Math.min(time - previous, 64) : 16;
    previous = time;
    if (time - lastInput > 100) targetIntensity = 0;
    const follow = 1 - Math.exp(-delta / 90);
    x += (targetX - x) * follow;
    y += (targetY - y) * follow;
    intensity += (targetIntensity - intensity) * follow;
    pulse = Math.max(0, pulse - delta / 700);
    paint();
    if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.2 || intensity > 0.005 || pulse > 0) {
      frame = requestAnimationFrame(draw);
    } else { previous = 0; }
  }

  function wake() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    intensity = targetIntensity = pulse = 0;
    x = targetX = -1000;
    y = targetY = -1000;
    paint();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    paint();
  }

  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches) return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (reducedMotion.matches) {
      x = targetX;
      y = targetY;
      intensity = 1;
      paint();
      return;
    }
    if (!intensity) { x = targetX; y = targetY; }
    targetIntensity = 1;
    lastInput = performance.now();
    wake();
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches) return;
    pulse = 1;
    lastInput = performance.now();
    wake();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', reset);
  document.addEventListener('visibilitychange', reset);
  window.addEventListener('blur', reset);
  window.addEventListener('resize', resize);
  finePointer.addEventListener('change', reset);
  reducedMotion.addEventListener('change', reset);
  resize();
}
