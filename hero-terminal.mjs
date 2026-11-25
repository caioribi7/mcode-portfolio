// Terminal do topo, em loop curto (~6,5 s): digita o deploy, as três notas sobem
// de 0 até o valor e aparece a linha "no ar". O HTML já traz o estado final, então
// sem JavaScript o terminal mostra o resultado. A animação nunca para (pedido explícito).
const root = document.querySelector('#hero-term');

if (root) {
  const typed = root.querySelector('.ht-typed');
  const command = typed.textContent;
  const scores = [...root.querySelectorAll('.ht-score')].map((el) => ({
    el,
    value: Number(el.dataset.value),
    ring: el.querySelector('.ht-ring'),
    label: el.querySelector('b'),
  }));
  const CIRCUMFERENCE = 2 * Math.PI * 27;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);

  const setScore = (score, value) => {
    score.label.textContent = String(Math.round(value));
    score.ring.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - value / 100));
  };

  const countUp = (duration) => new Promise((resolve) => {
    const start = performance.now();
    const frame = (now) => {
      const k = Math.min(1, (now - start) / duration);
      scores.forEach((score, i) => setScore(score, score.value * easeOut(Math.max(0, Math.min(1, k * 1.25 - i * 0.12)))));
      if (k < 1) requestAnimationFrame(frame);
      else { scores.forEach((score) => setScore(score, score.value)); resolve(); }
    };
    requestAnimationFrame(frame);
  });

  async function cycle() {
    root.dataset.step = 'type';
    typed.textContent = '';
    scores.forEach((score) => setScore(score, 0));
    await wait(350);
    for (const character of command) {
      typed.textContent += character;
      await wait(32 + Math.random() * 30);
    }
    await wait(250);
    root.dataset.step = 'scores';
    await countUp(1300);
    root.dataset.step = 'live';
    await wait(2600);
    root.dataset.step = 'out';
    await wait(450);
    cycle();
  }

  scores.forEach((score) => { score.ring.style.strokeDasharray = String(CIRCUMFERENCE); });
  cycle();
}
