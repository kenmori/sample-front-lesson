import './modulepreload-polyfill.js';
/* empty css     */ /* empty css     */ import {
  c as l,
  a,
  s as b,
} from './validation.js';
import { t as p } from './togglepassword.js';
import './drawer-menu.js';
const m = document.querySelector('body'),
  u = document.getElementById('js-checkbox-link'),
  E = document.getElementById('js-modal-close-button'),
  I = document.getElementById('js-modal-inner'),
  t = document.querySelector('.js-submit-button'),
  n = document.getElementsByClassName('invalid'),
  v = () => {
    document.getElementById('js-modal-area').classList.add('is-active'),
      m.classList.add('fixed'),
      (document.getElementById('js-modal-contents').scrollTop = 0);
  },
  g = () => {
    document.getElementById('js-modal-area').classList.remove('is-active'),
      m.classList.remove('fixed');
  };
u.addEventListener('click', v);
u.addEventListener('keypress', v);
E.addEventListener('click', g);
document.addEventListener('click', (e) => {
  e.target.classList.contains('js-modal') && g();
});
const L = document.getElementById('js-last-sentence'),
  k = { root: I, threshold: 1 },
  s = document.getElementById('js-checkbox'),
  h = ([e]) => {
    e.isIntersecting &&
      ((s.checked = !0),
      (s.disabled = !1),
      s.classList.remove('invalid'),
      a(t, n));
  },
  j = new IntersectionObserver(h, k);
j.observe(L);
const f = document.querySelector('.js-form-name'),
  y = document.querySelector('.js-form-email'),
  r = document.querySelector('.js-form-password'),
  i = document.querySelector('[data-name="password-error"]'),
  B = [f, y, r],
  c = document.querySelector('.js-eye-icon');
B.forEach((e) => {
  e.classList.add('invalid'),
    e.addEventListener('blur', (o) => {
      if (o.relatedTarget === c) {
        r.value &&
          i.textContent ===
            '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044' &&
          (i.textContent = '');
        return;
      }
      l(t, o.target), a(t, n);
    });
});
c.addEventListener('click', p);
c.addEventListener('blur', (e) => {
  e.relatedTarget !== r && (l(t, r), !(n > 0) && a(t, n));
});
s.addEventListener('input', () => {
  (t.disabled = !s.checked),
    s.checked ? s.classList.remove('invalid') : s.classList.add('invalid'),
    a(t, n);
});
t.addEventListener('click', (e) => {
  e.preventDefault();
  const o = { name: f.value, email: y.value, password: r.value },
    d = JSON.parse(localStorage.getItem('registeredData'));
  if (d && o.email === d.email) {
    (t.disabled = !0), b(e.target);
    return;
  }
  localStorage.setItem('registeredData', JSON.stringify(o)),
    (window.location.href = './register-done.html');
});
