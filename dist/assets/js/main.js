const s = document.getElementById('js-user-menu-button'),
  c = document.getElementById('js-logout-button'),
  l = document.getElementById('js-close-icon'),
  m = document.getElementById('js-user-menu'),
  t = () => m.classList.toggle('is-active');
s.addEventListener('click', () => {
  t(), u();
});
l.addEventListener('click', t);
const u = () => {
  const n = document.getElementById('js-username'),
    o = document.getElementById('js-email'),
    e = JSON.parse(localStorage.getItem('registeredData'));
  (n.textContent = e.name), (o.textContent = e.email);
};
c.addEventListener('click', () => {
  localStorage.removeItem('token'), (window.location.href = './index.html');
});
