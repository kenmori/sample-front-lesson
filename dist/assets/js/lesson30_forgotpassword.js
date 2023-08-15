import './modulepreload-polyfill.js';
/* empty css     */ /* empty css     */ import {
  c as a,
  a as s,
} from './validation.js';
import { c as i } from './chance.js';
const c = new i.exports.Chance(),
  n = document.querySelector('.js-form-email'),
  t = document.querySelector('.js-submit-button'),
  l = document.getElementsByClassName('invalid');
n.addEventListener('blur', (e) => {
  e.target.classList.add('invalid'), a(t, e.target), s(t, l);
});
const m = async () => {
    let e;
    try {
      (e = await d()), localStorage.setItem('passwordReissueToken', e.token);
    } catch (r) {
      (e = r),
        (t.nextElementSibling.textContent =
          '\u4E00\u81F4\u3059\u308B\u30A2\u30AB\u30A6\u30F3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F'),
        (t.disabled = !0);
      return;
    }
    const o = `?token=${e.token}`;
    window.location.href = `./register/password.html${o}`;
  },
  d = () =>
    new Promise((e, o) => {
      const r = JSON.parse(localStorage.getItem('registeredData'));
      n.value === r.email
        ? e({ token: c.apple_token(), ok: !0, code: 200 })
        : o({ ok: !1, code: 401 });
    });
t.addEventListener('click', m);
