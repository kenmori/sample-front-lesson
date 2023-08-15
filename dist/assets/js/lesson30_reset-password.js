import './modulepreload-polyfill.js';
/* empty css     */ /* empty css     */ import { c as l } from './validation.js';
import { t as p } from './togglepassword.js';
import './main.js';
const r = document.querySelector('.js-form-password'),
  n = document.querySelector('.js-form-confirm-password'),
  d = document.querySelector('.js-form-current-password'),
  a = [r, n, d],
  w = document.querySelector('[data-name="confirm-password-error"]'),
  u = document.querySelectorAll('.js-eye-icon'),
  o = document.querySelector('.js-submit-button'),
  c = (t) => t.parentElement.querySelector('.js-error'),
  i = (t) => t.parentElement.querySelector('input'),
  m = (t, e) => t.value === e.value,
  S = (t) => d.value === t.password,
  g = () => a.some((t) => t.classList.contains('invalid')),
  f = () => (o.disabled = !m(r, n));
a.forEach((t) => {
  t.classList.add('invalid'),
    t.addEventListener('blur', (e) => {
      if (e.relatedTarget === t.parentElement.querySelector('.js-eye-icon')) {
        t.value &&
          c(t).textContent ===
            '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044' &&
          (c(t).textContent = '');
        return;
      }
      l(o, t),
        r.value &&
          n.value &&
          (w.textContent = m(r, n)
            ? ''
            : '\u4E0A\u8A18\u306EPassword\u3068\u7570\u306A\u308A\u307E\u3059\u3002\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'),
        !a.some((s) => s.classList.contains('invalid')) && f();
    });
});
u.forEach((t) => {
  t.addEventListener('click', p);
});
u.forEach((t) => {
  t.addEventListener('blur', (e) => {
    e.relatedTarget !== i(t) && (l(o, i(t)), !g() && f());
  });
});
const h = (t) => {
  (t.password = r.value),
    localStorage.setItem('registeredData', JSON.stringify(t));
};
o.addEventListener('click', () => {
  const t = localStorage.getItem('token'),
    e = JSON.parse(localStorage.getItem('registeredData'));
  if (!t) {
    window.location.href = './notautherize.html';
    return;
  }
  if (!e) {
    localStorage.removeItem('token'),
      (window.location.href = './notautherize.html');
    return;
  }
  if (!S(e)) {
    (document.querySelector(
      '[data-name="current-password-error"]'
    ).textContent =
      '\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093'),
      (o.disabled = !0);
    return;
  }
  h(e);
  const s = `?token=${t}`;
  window.location.href = `./reset-password-done.html${s}`;
});
