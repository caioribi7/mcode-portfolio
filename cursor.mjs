const cursor = document.querySelector('.custom-cursor');
const label = cursor?.querySelector('.cursor-label');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (cursor && label) {
  let targetX = 0, targetY = 0, x = 0, y = 0, previous = 0, frame = 0;
  let visible = false;

  function hide() {
    visible = false;
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    document.documentElement.classList.remove('cursor-ready');
  }

  function draw(time) {
    frame = 0;
    if (!visible) return;
    const delta = previous ? Math.min(time - previous, 64) : 16;
    previous = time;
    const dx = targetX - x, dy = targetY - y;
    const follow = 1 - Math.exp(-delta / 42);
    x += dx * follow;
    y += dy * follow;
    const stretch = Math.min(Math.hypot(dx, dy) / 200, 0.22);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    cursor.style.setProperty('--cursor-angle', `${angle}deg`);
    cursor.style.setProperty('--cursor-stretch', 1 + stretch);
    if (Math.abs(dx) + Math.abs(dy) > 0.1) frame = requestAnimationFrame(draw);
    else previous = 0;
  }

  document.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') {
      hide();
      return;
    }
    const field = event.target.closest('input, textarea, [contenteditable="true"]');
    if (field) { hide(); return; }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) { x = targetX; y = targetY; }
    visible = true;
    const project = event.target.closest('.project');
    const interactive = event.target.closest('a, button, summary');
    cursor.dataset.mode = project ? 'project' : interactive ? 'link' : 'default';
    label.textContent = project ? 'Explorar' : '';
    if (!frame) frame = requestAnimationFrame(draw);
    document.documentElement.classList.add('cursor-ready');
  }, { passive: true });

  document.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
  document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
  document.documentElement.addEventListener('pointerleave', hide);
  document.addEventListener('keydown', (event) => { if (event.key === 'Tab') hide(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
  window.addEventListener('blur', hide);
  window.addEventListener('scroll', hide, { passive: true });
  finePointer.addEventListener('change', hide);
  reducedMotion.addEventListener('change', hide);
}
