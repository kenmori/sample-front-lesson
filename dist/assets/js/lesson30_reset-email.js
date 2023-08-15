import './modulepreload-polyfill.js';
/* empty css     */ /* empty css     */ import { c } from './validation.js';
import { t as p } from './togglepassword.js';
import './main.js';
const r = document.querySelector('.js-form-email'),
  a = document.querySelector('.js-form-confirm-email'),
  o = document.querySelector('.js-form-password'),
  l = [r, a, o],
  S = document.querySelector('[data-name="confirm-email-error"]'),
  s = document.querySelector('[data-name="current-password-error"]'),
  i = document.querySelector('.js-eye-icon'),
  n = document.querySelector('.js-submit-button'),
  m = (e, t) => e.value === t.value,
  g = (e) => o.value === e.password,
  d = () => l.some((e) => e.classList.contains('invalid')),
  u = () => (n.disabled = !m(r, a));
l.forEach((e) => {
  e.classList.add('invalid'),
    e.addEventListener('blur', (t) => {
      if (t.relatedTarget === i) {
        o.value &&
          s.textContent ===
            '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044' &&
          (s.textContent = '');
        return;
      }
      c(n, e),
        r.value &&
          a.value &&
          (S.textContent = m(r, a)
            ? ''
            : '\u4E0A\u8A18\u306EE-mail\u30A2\u30C9\u30EC\u30B9\u3068\u7570\u306A\u308A\u307E\u3059\u3002\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'),
        !d() && u();
    });
});
i.addEventListener('click', p);
i.addEventListener('blur', (e) => {
  e.relatedTarget !== o && (c(n, o), !d() && u());
});
const v = (e) => {
  (e.email = r.value),
    localStorage.setItem('registeredData', JSON.stringify(e));
};
n.addEventListener('click', () => {
  const e = localStorage.getItem('token'),
    t = JSON.parse(localStorage.getItem('registeredData'));
  if (!e) {
    window.location.href = './notautherize.html';
    return;
  }
  if (!t) {
    localStorage.removeItem('token'),
      (window.location.href = './notautherize.html');
    return;
  }
  if (!g(t)) {
    (document.querySelector(
      '[data-name="current-password-error"]'
    ).textContent =
      '\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093'),
      (n.disabled = !0);
    return;
  }
  v(t);
  const f = `?token=${e}`;
  window.location.href = `./reset-email-done.html${f}`;
});
