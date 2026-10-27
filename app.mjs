import { buildBrief } from './brief.mjs';

// Install the network guard before initializing any optional interaction.
const form = document.querySelector('#brief-form');
form.addEventListener('submit', (event) => event.preventDefault());

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav');
const setMenu = (open) => {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
};
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
const mobile = window.matchMedia('(max-width: 700px)');
mobile.addEventListener('change', () => setMenu(false));

for (const link of document.querySelectorAll('.project')) {
  link.addEventListener('click', () => {
    const detail = document.querySelector(link.getAttribute('href'));
    detail.open = true;
  });
}

const briefResult = document.querySelector('#brief-result');
const briefText = document.querySelector('#brief-text');
const status = document.querySelector('#copy-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  briefText.value = buildBrief(data);
  briefResult.hidden = false;
  status.textContent = 'Briefing preparado. Nenhuma mensagem foi enviada.';
  briefText.focus();
});

document.querySelector('#copy-brief').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(briefText.value);
    status.textContent = 'Briefing copiado. Guarde o texto para enviar à MCode.';
  } catch {
    briefText.focus();
    briefText.select();
    status.textContent = 'Não foi possível copiar automaticamente. O texto está selecionado: use Ctrl+C ou a opção Copiar do seu dispositivo.';
  }
});

// Fail closed: HTML starts disabled and remains so if initialization fails.
document.querySelector('#brief-fields').disabled = false;
document.querySelector('#brief-availability').hidden = true;
