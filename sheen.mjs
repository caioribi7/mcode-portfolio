// Brilho especular nas palavras de destaque (.sheen): a borda acende onde o mouse está.
// Cada palavra recebe --mx/--my (px, relativos a ela). Parado por 2,5 s ou sem mouse,
// o brilho varre a palavra sozinho, então a animação nunca para (pedido explícito).
const words = [...document.querySelectorAll('.sheen')];

if (words.length) {
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
    }
  });
  words.forEach((word) => observer.observe(word));

  let x = 0, y = 0, last = -1e9;
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    x = event.clientX; y = event.clientY; last = performance.now();
  }, { passive: true });

  const loop = (now) => {
    requestAnimationFrame(loop);
    const idle = now - last > 2500;
    for (const word of visible) {
      const box = word.getBoundingClientRect();
      let mx, my;
      if (idle) {
        // Varredura: atravessa a palavra em ~3,5 s, com uma pausa fora dela.
        const phase = ((now / 1000) * 0.28 + box.top * 0.0007) % 1;
        mx = box.width * (phase * 1.8 - 0.4);
        my = box.height * 0.3;
      } else {
        mx = x - box.left;
        my = y - box.top;
      }
      word.style.setProperty('--mx', `${mx.toFixed(1)}px`);
      word.style.setProperty('--my', `${my.toFixed(1)}px`);
    }
  };
  requestAnimationFrame(loop);
}
