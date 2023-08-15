import './modulepreload-polyfill.js';
const n = document.getElementById('js-lists'),
  m = document.createElement('li'),
  e = document.createElement('a'),
  t = document.createElement('img');
e.textContent = '\u3053\u308C\u3067\u3059';
e.href = '1.html';
t.src = '/assets/img/bookmark.png';
t.alt = '\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF';
n.appendChild(m).appendChild(e).insertAdjacentElement('afterbegin', t);
