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

// Project cover videos: play only while visible and without reduced motion; otherwise keep the poster
const loopVideos = document.querySelectorAll('video[data-autoplay-loop]');
if (loopVideos.length && 'IntersectionObserver' in window) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Set();
  const sync = (video) => {
    if (visible.has(video) && !reducedMotion.matches) video.play().catch(() => {});
    else video.pause();
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
      sync(target);
    });
  }, { threshold: 0.25 });
  loopVideos.forEach((video) => observer.observe(video));
  reducedMotion.addEventListener('change', () => loopVideos.forEach(sync));
}
