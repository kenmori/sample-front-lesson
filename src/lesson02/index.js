'use strict';

const ul = document.getElementById('js-lists');
const li = document.createElement('li');
const anchor = document.createElement('a');
const img = document.createElement('img');

anchor.textContent = 'これです';
anchor.href = '1.html';
img.src = '/assets/img/bookmark.png';
img.alt = 'ブックマーク';

ul.appendChild(li).appendChild(anchor).insertAdjacentElement('afterbegin', img);
