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

// Native dialog keeps focus inside the image viewer and supports Escape.
const imageViewer = document.querySelector('#project-image-viewer');
const imagePreview = document.querySelector('[data-image-preview]');
if (imageViewer && imagePreview && typeof imageViewer.showModal === 'function') {
  imagePreview.setAttribute('aria-haspopup', 'dialog');
  imagePreview.setAttribute('aria-controls', imageViewer.id);
  imagePreview.addEventListener('click', (event) => {
    event.preventDefault();
    imageViewer.showModal();
  });
  imageViewer.addEventListener('close', () => imagePreview.focus({ preventScroll: true }));
}

// Project links to expandable details
for (const link of document.querySelectorAll('a.project')) {
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
