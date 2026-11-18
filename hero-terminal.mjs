// Terminal do topo: alguém digita "mcode start", o terminal responde e abre a cena 3D
// (um site sendo construído: rascunho, design, camadas de código e no ar). A cena é um vídeo
// pré-renderizado com three.js: leve para o navegador, sem WebGL no carregamento.
// Ao terminar o vídeo, o ciclo recomeça; a animação nunca para (pedido explícito).
const root = document.querySelector('#hero-term');

if (root) {
  const log = root.querySelector('.hero-term-log');
  const video = root.querySelector('.hero-term-video');
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const LINES = [
    ['→ carregando identidade visual', 'ok'],
    ['→ montando interface e tipografia', 'ok'],
    ['→ ajustando para celular e desktop', 'ok'],
  ];

  const line = (html) => {
    const row = document.createElement('span');
    row.className = 'hero-term-line';
    row.innerHTML = html;
    log.append(row);
    return row;
  };

  // Espera o vídeo poder tocar, sem travar o ciclo se a rede falhar.
  const ready = () => video.readyState >= 3 ? Promise.resolve(true) : Promise.race([
    new Promise((resolve) => video.addEventListener('canplay', () => resolve(true), { once: true })),
    wait(6000).then(() => false),
  ]);

  async function cycle() {
    log.replaceChildren();
    root.dataset.scene = 'type';
    const prompt = line('<span class="hero-term-prompt">$</span> <span class="hero-term-cmd"></span><span class="hero-term-caret"></span>');
    await wait(700);
    const command = prompt.querySelector('.hero-term-cmd');
    for (const character of 'mcode start') {
      command.textContent += character;
      await wait(70 + Math.random() * 70);
    }
    await wait(380);
    prompt.querySelector('.hero-term-caret').remove();
    for (const [label, status] of LINES) {
      const row = line(`<span>${label}</span> <span class="hero-term-ok">${status}</span>`);
      row.lastChild.hidden = true;
      await wait(420);
      row.lastChild.hidden = false;
    }
    await wait(260);
    line('<span class="hero-term-done">✦ pronto. construindo seu site</span><span class="hero-term-caret"></span>');
    const playable = await ready();
    await wait(650);
    if (playable) {
      video.currentTime = 0;
      root.dataset.scene = 'video';
      try {
        await video.play();
        await new Promise((resolve) => video.addEventListener('ended', resolve, { once: true }));
      } catch { await wait(2000); }
    } else {
      await wait(2500);
    }
    root.dataset.scene = 'type';
    await wait(500);
    cycle();
  }

  video.preload = 'auto';
  video.load();
  cycle();
}
