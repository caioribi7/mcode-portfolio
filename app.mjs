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

// Project cover videos: play while visible (regardless of reduced motion, by choice); pause off-screen
const loopVideos = document.querySelectorAll('video[data-autoplay-loop]');
if (loopVideos.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) target.play().catch(() => {});
      else target.pause();
    });
  }, { threshold: 0.25 });
  loopVideos.forEach((video) => observer.observe(video));
}
