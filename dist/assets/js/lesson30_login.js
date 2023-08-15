import './modulepreload-polyfill.js';
/* empty css     */ /* empty css     */ import {
  c as d,
  a as l,
} from './validation.js';
import { t as m } from './togglepassword.js';
import { c as p } from './chance.js';
import './drawer-menu.js';
const f = new p.exports.Chance(),
  u = document.querySelector('.js-form-userid'),
  r = document.querySelector('.js-form-password'),
  y = [u, r],
  c = document.querySelector('.js-eye-icon'),
  i = document.querySelector('[data-name="password-error"]'),
  o = document.querySelector('.js-submit-button'),
  a = document.getElementsByClassName('invalid');
y.forEach((e) => {
  e.classList.add('invalid'),
    e.addEventListener('blur', (t) => {
      if (t.relatedTarget === c) {
        r.value &&
          i.textContent ===
            '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044' &&
          (i.textContent = '');
        return;
      }
      d(o, t.target), l(o, a);
    });
});
c.addEventListener('click', m);
c.addEventListener('blur', (e) => {
  e.relatedTarget !== r && (d(o, r), !(a > 0) && l(o, a));
});
const g = async () => {
    let e;
    try {
      (e = await w()), localStorage.setItem('token', e.token);
    } catch (t) {
      e = t;
    } finally {
      window.location.href = e.token ? './index.html' : './notautherize.html';
    }
  },
  w = () =>
    new Promise((e, t) => {
      const s = { userId: u.value, password: r.value },
        n = JSON.parse(localStorage.getItem('registeredData'));
      (s.userId === n.name || s.userId === n.email) && s.password === n.password
        ? e({ token: f.apple_token(), ok: !0, code: 200 })
        : t({ ok: !1, code: 401 });
    });
o.addEventListener('click', g);
