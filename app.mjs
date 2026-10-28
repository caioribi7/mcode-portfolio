import { buildBrief } from './brief.mjs';

// Install the network guard before initializing any optional interaction.
const form = document.querySelector('#brief-form');
if (form) {
  form.addEventListener('submit', (event) => event.preventDefault());
}

// Mobile navigation toggle
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav');
const setMenu = (open) => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
};
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  const mobile = window.matchMedia('(max-width: 768px)');
  mobile.addEventListener('change', () => setMenu(false));
}

// Project links to expandable details
for (const link of document.querySelectorAll('.project')) {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const detail = document.querySelector(targetId);
      if (detail && 'open' in detail) {
        event.preventDefault();
        detail.open = true;
        history.pushState(null, '', targetId);
        detail.querySelector('summary')?.focus({ preventScroll: true });
        detail.scrollIntoView();
      }
    }
  });
}

// Briefing builder & clipboard handling
const briefResult = document.querySelector('#brief-result');
const briefText = document.querySelector('#brief-text');
const status = document.querySelector('#copy-status');
const copyBtn = document.querySelector('#copy-brief');

if (form && briefText && briefResult && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    briefText.value = buildBrief(data);
    briefResult.hidden = false;
    status.textContent = 'Briefing preparado. Nenhuma mensagem foi enviada à MCode.';
    briefText.focus();
  });
}

if (copyBtn && briefText && status) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(briefText.value);
      status.textContent = 'Briefing copiado. Cole o texto no seu e-mail e envie para mcode.contato@gmail.com.';
    } catch {
      briefText.focus();
      briefText.select();
      status.textContent = 'Não foi possível copiar automaticamente. O texto está selecionado: use Ctrl+C ou a opção Copiar do seu dispositivo.';
    }
  });
}

// Fail closed: HTML starts disabled and remains so if initialization fails.
document.querySelector('#brief-fields').disabled = false;
document.querySelector('#brief-availability').hidden = true;
