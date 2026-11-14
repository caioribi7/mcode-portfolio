// Cursor em pixels com pontilhado ordenado (Bayer 4x4) e mistura "difference".
// Um anel animado e um núcleo central, ambos presos ao ponteiro sem atraso:
// a posição muda no próprio pointermove; só a forma é animada por quadro.
// Por pedido explícito do usuário, a animação roda mesmo com movimento reduzido.
const cursor = document.querySelector('.custom-cursor');
const ring = cursor?.querySelector('.cursor-ring');
const core = cursor?.querySelector('.cursor-core');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const RING_SIZE = 40, RING_CELL = 3;
const CORE_SIZE = 10, CORE_CELL = 2;
const INK = '#F1F5EF';

function prepare(canvas, size) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = size * ratio;
  canvas.height = size * ratio;
  ctx.scale(ratio, ratio);
  ctx.fillStyle = INK;
  return ctx;
}

// Pinta cada célula da grade quando a intensidade passa do limiar de Bayer
function dither(ctx, size, cell, intensity) {
  ctx.clearRect(0, 0, size, size);
  const half = size / 2;
  for (let row = 0, y = 0; y < size; y += cell, row++) {
    for (let col = 0, x = 0; x < size; x += cell, col++) {
      const dx = x + cell / 2 - half, dy = y + cell / 2 - half;
      const value = intensity(Math.hypot(dx, dy), Math.atan2(dy, dx));
      if (value <= BAYER[row % 4][col % 4] / 16) continue;
      ctx.globalAlpha = Math.min(1, value);
      ctx.fillRect(x, y, cell - 1, cell - 1);
    }
  }
  ctx.globalAlpha = 1;
}

const ringCtx = ring && prepare(ring, RING_SIZE);
const coreCtx = core && prepare(core, CORE_SIZE);

if (ringCtx && coreCtx) {
  let visible = false, frame = 0, previous = 0, time = 0;
  let hover = 0, hoverTarget = 0, press = 0, pressTarget = 0;

  function paint() {
    // anel: raio cresce sobre links e encolhe ao clicar; a borda ondula com o tempo
    const radius = 15 * (1 + 0.4 * hover) * (1 - 0.15 * press);
    const width = 0.34 - 0.16 * hover;
    dither(ringCtx, RING_SIZE, RING_CELL, (distance, angle) => {
      const r = distance / radius;
      if (r > 1.05) return 0;
      const wobble = 0.09 * Math.sin(3 * angle - 2.2 * time) + 0.05 * Math.sin(1.4 * time);
      return 1 - Math.abs(r - (0.78 + wobble)) / width;
    });
    // núcleo: disco que pulsa de dentro para fora e encolhe sobre links
    const coreRadius = 4 * (1 - 0.45 * hover);
    dither(coreCtx, CORE_SIZE, CORE_CELL, distance => {
      const r = distance / coreRadius;
      if (r > 1) return 0;
      return 1.05 - 0.55 * r + 0.16 * Math.sin(3.1 * time - 4 * r);
    });
  }

  function draw(now) {
    frame = 0;
    if (!visible) return;
    const delta = previous ? Math.min(now - previous, 64) : 16;
    previous = now;
    time += delta * 0.0027; // ~0.045 por quadro a 60fps
    const ease = 1 - Math.exp(-delta / 120);
    hover += (hoverTarget - hover) * ease;
    press += (pressTarget - press) * (1 - Math.exp(-delta / 60));
    paint();
    frame = requestAnimationFrame(draw);
  }

  function refresh() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  function hide() {
    visible = false;
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    document.documentElement.classList.remove('cursor-ready');
  }

  document.addEventListener('pointermove', event => {
    if (!finePointer.matches || event.pointerType !== 'mouse') { hide(); return; }
    if (event.target.closest('input, textarea, [contenteditable="true"]')) { hide(); return; }
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    hoverTarget = event.target.closest('a, button, summary, [role="button"]') ? 1 : 0;
    if (!visible) { hover = hoverTarget; visible = true; }
    document.documentElement.classList.add('cursor-ready');
    refresh();
  }, { passive: true });

  document.addEventListener('pointerdown', () => { pressTarget = 1; if (visible) refresh(); });
  document.addEventListener('pointerup', () => { pressTarget = 0; if (visible) refresh(); });
  document.documentElement.addEventListener('pointerleave', hide);
  document.addEventListener('keydown', event => { if (event.key === 'Tab') hide(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  window.addEventListener('blur', hide);
  finePointer.addEventListener('change', hide);
}
