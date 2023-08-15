const c = document.querySelector('body'),
  r = document.getElementById('js-hamburger-button'),
  s = document.querySelector('[data-name="drawer-menu"]'),
  n = [document.getElementById('js-form'), document.getElementById('js-title')],
  o = (e) => e.getAttribute('aria-expanded') === 'true',
  d = (e, t) => {
    e.forEach((i) => {
      i.inert = t;
    });
  },
  u = (e, t) => {
    c.classList.add('is-drawer-active'),
      t.classList.add('is-open'),
      t.setAttribute('aria-hidden', !1),
      e.setAttribute('aria-expanded', !0),
      d(n, !0);
  },
  a = (e, t) => {
    c.classList.remove('is-drawer-active'),
      t.classList.remove('is-open'),
      t.setAttribute('aria-hidden', !0),
      e.setAttribute('aria-expanded', !1),
      d(n, !1);
  };
r.addEventListener('click', (e) => {
  o(e.target) ? a(e.target, s) : u(e.target, s);
});
document.addEventListener('click', (e) => {
  e.target.classList.contains('is-drawer-active') && a(r, s);
});
document.addEventListener('keydown', (e) => {
  e.key === 'Escape' && a(r, s);
});
const l = (e, t) => {
    switch (t) {
      case 'right':
        e.classList.add('right');
        break;
      case 'left':
      default:
        e.classList.add('left');
        break;
    }
  },
  f = (e) => `${e / 1e3}s`,
  b = (e = 400) => {
    if (typeof e != 'number')
      throw new Error(`speed expect number type. but got ${typeof e}`);
    return f(e);
  },
  g = (e, t) => {
    e.style.transitionDuration = b(t);
  },
  m = { direct: 'left', speed: 400 },
  y = (e, t = {}) => {
    l(e, t == null ? void 0 : t.direct), g(e, t == null ? void 0 : t.speed);
  };
y(s, m);
