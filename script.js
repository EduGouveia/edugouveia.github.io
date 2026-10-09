const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  });
});

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();

const themeButtons = document.querySelectorAll('[data-theme]');
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

function applyTheme(theme) {
  document.body.classList.remove('light-theme', 'crt-theme', 'circus-theme');
  if (theme === 'light') document.body.classList.add('light-theme');
  if (theme === 'crt') document.body.classList.add('crt-theme');
  if (theme === 'circus') document.body.classList.add('circus-theme');
  themeButtons.forEach((button) => {
    const active = button.dataset.theme === theme;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  localStorage.setItem('portfolio-theme', theme);
}

themeButtons.forEach((button) => {
  button.addEventListener('click', () => applyTheme(button.dataset.theme));
});

applyTheme(savedTheme);

const circusHero = document.querySelector('.hero');
const updateCircusParallax = () => {
  if (!circusHero || !document.body.classList.contains('circus-theme')) return;
  const offset = Math.max(0, window.scrollY - circusHero.offsetTop);
  circusHero.style.setProperty('--circus-parallax', `${offset}px`);
};
window.addEventListener('scroll', updateCircusParallax, { passive: true });
updateCircusParallax();

const tentRoof = document.querySelector('.tent-roof');
const spinTentRoof = () => {
  tentRoof?.classList.remove('animar-giro');
  if (tentRoof) void tentRoof.offsetWidth;
  tentRoof?.classList.add('animar-giro');
};

tentRoof?.addEventListener('click', spinTentRoof);
tentRoof?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    spinTentRoof();
  }
});
