import './modulepreload-polyfill.js';
/* empty css      */ /* empty css      */ import { c } from './validation2.js';
import { t as m } from './togglepassword2.js';
import { c as f } from './chance.js';
const p = new f.exports.Chance(),
  w = Object.fromEntries(new URLSearchParams(window.location.search)),
  g = w.token,
  h = localStorage.getItem('passwordReissueToken');
g !== h && (window.location.href = './../notautherize.html');
const r = document.querySelector('.js-form-password'),
  o = document.querySelector('.js-form-confirm-password'),
  i = [r, o],
  E = o.nextElementSibling,
  s = document.querySelector('.js-submit-button'),
  l = document.querySelectorAll('.js-eye-icon'),
  n = (e) => e.parentElement.querySelector('.js-error'),
  a = (e) => e.parentElement.querySelector('input'),
  S = () => r.value === o.value,
  d = () => i.some((e) => e.classList.contains('invalid')),
  u = (e, t) => (s.disabled = e.value !== t.value);
i.forEach((e) => {
  e.classList.add('invalid'),
    e.addEventListener('blur', (t) => {
      if (t.relatedTarget === e.parentElement.querySelector('.js-eye-icon')) {
        e.value &&
          n(e).textContent ===
            '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044' &&
          (n(e).textContent = '');
        return;
      }
      c(s, e),
        !d() &&
          ((E.textContent = S()
            ? ''
            : '\u4E0A\u8A18\u306Epassword\u3068\u7570\u306A\u308A\u307E\u3059\u3002\u3082\u3046\u4E00\u5EA6\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002'),
          u(r, o));
    });
});
l.forEach((e) => {
  e.addEventListener('click', m);
});
l.forEach((e) => {
  e.addEventListener('blur', (t) => {
    t.relatedTarget !== a(e) && (c(s, a(e)), !d() && u());
  });
});
const v = () => {
  const e = r.value,
    t = JSON.parse(localStorage.getItem('registeredData'));
  (t.password = e), localStorage.setItem('registeredData', JSON.stringify(t));
};
s.addEventListener('click', () => {
  v();
  const e = p.apple_token(),
    t = `?token=${e}`;
  localStorage.setItem('passwordReissueToken', e),
    (window.location.href = `./password-done.html${t}`);
});
