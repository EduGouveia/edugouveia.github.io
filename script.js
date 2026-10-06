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
  document.body.classList.remove('light-theme', 'crt-theme');
  if (theme === 'light') document.body.classList.add('light-theme');
  if (theme === 'crt') document.body.classList.add('crt-theme');
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
