import './modulepreload-polyfill.js';
/* empty css      */ /* empty css      */ import './main2.js';
import { f as v, d as x } from './index.js';
const i = document.getElementById('js-pict-list'),
  w = document.getElementById('js-pagination'),
  B = document.getElementById('js-button-previous'),
  L = document.getElementById('js-button-next'),
  m = (t, e) => {
    const n = document.createElement(t);
    return (n.className = e), n;
  },
  N = () => {
    const t = document.createElement('img'),
      e = m('div', 'loading');
    (t.src = '/assets/img/loading-circle.gif'),
      (t.id = 'js-loading'),
      i.appendChild(e).appendChild(t);
  },
  D = () => {
    document.getElementById('js-loading').remove();
  },
  T = async (t) => {
    const e = await fetch(t);
    if (!e.ok) {
      const n = `${e.status}:${e.statusText}`;
      i.appendChild(f(n)), console.error(n);
      return;
    }
    return await e.json();
  },
  F = async () =>
    new Promise((t) => {
      setTimeout(
        () => t(T('https://mocki.io/v1/82e4e264-5a2d-4ebd-9814-7e63e47fb80b')),
        3e3
      );
    }),
  $ = async () => {
    N();
    try {
      const t = await F();
      if (!t) return;
      const e = t.data;
      return (
        e.length === 0 &&
          ((i.textContent =
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'),
          console.log(
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'
          )),
        e
      );
    } catch (t) {
      console.error(t), i.appendChild(f(t));
    } finally {
      D();
    }
  },
  f = (t) => {
    const e = m('p', 'tab__error');
    return (e.textContent = t), e;
  },
  A = (t) => {
    const e = document.createDocumentFragment();
    for (let n = 0; n < t.length; n++) {
      const s = m('li', 'slideshow__pict-item js-slideshow-item'),
        a = document.createElement('img');
      (s.dataset.index = `${n}`),
        (a.src = t[n].img),
        (a.alt = t[n].alt),
        t[n].display && s.classList.add('is-active'),
        e.appendChild(s).appendChild(a);
    }
    i.appendChild(e);
  },
  k = (t) => {
    const e = document.getElementById('js-pagination-list'),
      n = document.createDocumentFragment();
    for (let s = 0; s < t.length; s++) {
      const a = m('li', 'pagination__item js-pagination-item'),
        o = m('li', 'pagination__btn js-pagination-btn');
      (a.dataset.index = `${s}`),
        (o.dataset.index = `${s}`),
        t[s].display && a.classList.add('is-active'),
        n.appendChild(a).appendChild(o);
    }
    w.insertAdjacentElement('afterbegin', e).appendChild(n);
  },
  M = (t) => {
    const e = document.getElementById('js-counter-all');
    (e.textContent = t.length), u(p()), g(t.length);
  },
  g = (t) => {
    const e = p(),
      n = 0,
      s = t - 1;
    (B.disabled = e === n), (L.disabled = e === s);
  },
  p = () => {
    const t = i.querySelector('.is-active');
    return Number(t.dataset.index);
  },
  u = (t) => {
    const e = document.getElementById('js-counter-current');
    e.textContent = ++t;
  },
  b = (t) => {
    const e = i.querySelector('.is-active'),
      n = [...document.getElementsByClassName('js-slideshow-item')];
    e.classList.remove('is-active'), n[t].classList.add('is-active');
  },
  h = (t) => {
    const e = document.getElementById('js-pagination-list'),
      n = [...document.getElementsByClassName('js-pagination-item')];
    e.querySelector('.is-active').classList.remove('is-active'),
      n[t].classList.add('is-active');
  },
  S = (t) => {
    document.querySelectorAll('.js-button-arrow').forEach((n) => {
      n.addEventListener('click', (s) => {
        let a = p();
        s.currentTarget.id === 'js-button-next' ? ++a : --a,
          b(a),
          h(a),
          u(a),
          g(t),
          E(t);
      });
    });
  },
  P = (t) => {
    document
      .getElementById('js-pagination-list')
      .addEventListener('click', (n) => {
        if (n.currentTarget === n.target) return;
        const s = Number(n.target.dataset.index);
        b(s), h(s), u(s), g(t), E(t);
      });
  },
  y = { count: 0 },
  I = (t) => {
    y.count = setInterval(() => {
      let e = p();
      e++, e === t && (e = 0), b(e), h(e), u(e), g(t);
    }, 3e3);
  },
  E = (t) => {
    clearInterval(y.count), I(t);
  },
  q = async () => {
    const t = await $();
    t && (A(t), k(t), M(t), S(t.length), P(t.length), I(t.length));
  };
q();
const r = document.getElementById('js-tabNav'),
  c = (t, e) => {
    const n = document.createElement(t);
    return (n.className = e), n;
  },
  W = async (t) => {
    const e = await fetch(t);
    if (!e.ok) {
      const n = `${e.status}:${e.statusText}`;
      r.appendChild(_(n)), console.error(n);
      return;
    }
    return await e.json();
  },
  O = async () => {
    try {
      const t = await W(
        'https://mocki.io/v1/43b10f2b-3404-49d0-865c-168aa49778fd'
      );
      if (!t) return;
      const e = t.data;
      return (
        e.length === 0 &&
          ((r.textContent =
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'),
          console.log(
            '\u307E\u3060\u30C7\u30FC\u30BF\u304C\u3042\u308A\u307E\u305B\u3093'
          )),
        e
      );
    } catch (t) {
      console.error(t), r.appendChild(_(t));
    }
  },
  _ = (t) => {
    const e = c('p', 'tab__error');
    return (e.textContent = t), e;
  },
  z = (t) => {
    const e = v(new Date(), 'yyyy,MM,dd'),
      n = v(new Date(t), 'yyyy,MM,dd');
    return x(new Date(e), new Date(n)) <= 3;
  },
  G = (t) => {
    const e = document.createDocumentFragment();
    for (let n = 0; n < t.length; n++) {
      const s = c('li', 'tab__nav-item'),
        a = c('button', 'tab__nav-button js-tabNavButton');
      (s.id = `js-tabNavItem${n + 1}`),
        (a.dataset.index = `${n}`),
        (a.textContent = t[n].category),
        t[n].display && a.classList.add('is-active'),
        e.appendChild(s).appendChild(a);
    }
    r.appendChild(e);
    for (let n = 0; n < t.length; n++)
      document
        .getElementsByClassName('js-tabNavButton')
        [n].addEventListener('click', H);
  },
  H = (t) => {
    const e = document.getElementsByClassName('js-tabContents'),
      n = r.querySelector('.is-active'),
      s = t.target.dataset.index;
    n.classList.remove('is-active'),
      e[n.dataset.index].classList.remove('is-active'),
      t.target.classList.add('is-active'),
      e[s].classList.add('is-active');
  },
  J = () => {
    const t = c('div', 'tab');
    (t.id = 'js-tab'), t.appendChild(r.parentNode.replaceChild(t, r));
  },
  K = (t) => {
    const e = document.createDocumentFragment(),
      n = t.map((o) => o.title),
      s = t.map((o) => o.comments),
      a = t.map((o) => o.date);
    for (let o = 0; o < n.length; o++) {
      const d = c('li', 'tab__contents-item'),
        l = c('a', 'tab__contents-link'),
        C = s[o].length;
      if (
        ((l.href = '#'),
        (l.textContent = n[o]),
        e.appendChild(d).appendChild(l),
        C > 0)
      ) {
        const j = Q(s[o]);
        d.appendChild(j);
      }
      z(a[o]) && d.insertAdjacentElement('beforeend', R());
    }
    return e;
  },
  Q = (t) => {
    const e = document.createDocumentFragment(),
      n = c('div', 'tab__contents-icon'),
      s = document.createElement('img'),
      a = c('div', 'tab__contents-info');
    return (
      (s.src = '/assets/img/icon-comment.svg'),
      (a.textContent = `${t.length}\u4EF6`),
      n.appendChild(s),
      e.appendChild(n).insertAdjacentElement('afterend', a),
      e
    );
  },
  R = () => {
    const t = c('div', 'tab__contents-new'),
      e = document.createElement('img');
    return (e.src = '/assets/img/icon-new.svg'), t.appendChild(e), t;
  },
  U = (t) => {
    const e = t.map((s) => s.articles),
      n = document.getElementById('js-tab');
    for (let s = 0; s < e.length; s++) {
      const a = c('div', 'tab__contents js-tabContents'),
        o = c('div', 'tab__contents-inner'),
        d = c('ul', 'tab__contents-list');
      t[s].display && a.classList.add('is-active');
      const l = K(e[s]),
        C = V(t[s]);
      n.appendChild(a).appendChild(o).appendChild(d).appendChild(l),
        o.appendChild(C);
    }
  },
  V = (t) => {
    const e = document.createDocumentFragment(),
      n = c('div', 'tab__img-wrapper'),
      s = c('img', 'tab__img');
    return (s.src = `${t.img}`), e.appendChild(n).appendChild(s), e;
  },
  X = async () => {
    const t = await O();
    t && (G(t), U(t));
  };
J();
X();
