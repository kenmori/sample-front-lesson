const n = document.querySelector('body'),
  s = document.getElementById('js-hamburger-button'),
  r = document.querySelector('[data-name="drawer-menu"]'),
  d = [document.getElementById('js-form'), document.getElementById('js-title')],
  c = (e) => e.getAttribute('aria-expanded') === 'true',
  i = (e, t) => {
    e.forEach((o) => {
      o.inert = t;
    });
  },
  u = (e, t) => {
    n.classList.add('is-drawer-active'),
      t.classList.add('is-open'),
      t.setAttribute('aria-hidden', !1),
      e.setAttribute('aria-expanded', !0),
      i(d, !0);
  },
  a = (e, t) => {
    n.classList.remove('is-drawer-active'),
      t.classList.remove('is-open'),
      t.setAttribute('aria-hidden', !0),
      e.setAttribute('aria-expanded', !1),
      i(d, !1);
  };
s.addEventListener('click', (e) => {
  c(e.target) ? a(e.target, r) : u(e.target, r);
});
document.addEventListener('click', (e) => {
  e.target.classList.contains('is-drawer-active') && a(s, r);
});
document.addEventListener('keydown', (e) => {
  e.key === 'Escape' && a(s, r);
});
