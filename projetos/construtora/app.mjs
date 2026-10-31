// ==========================================================================
// VÉRTICE ENGENHARIA & OBRA — Interatividade Progressiva Local (app.mjs)
// Direção A: Composição Arquitetônica Aberta · Sem envio externo de dados
// ==========================================================================

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('js-ready');

  // Menu móvel acessível
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('#primary-nav');

  const setMenuState = (open) => {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    primaryNav.classList.toggle('is-open', open);
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        setMenuState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    // Fecha o menu caso o viewport ultrapasse o breakpoint móvel (768px)
    const mediaMobile = window.matchMedia('(max-width: 768px)');
    mediaMobile.addEventListener('change', () => {
      if (!mediaMobile.matches) {
        setMenuState(false);
      }
    });
  }
}
