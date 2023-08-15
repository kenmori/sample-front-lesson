import './modulepreload-polyfill.js';
/* empty css     */ /* empty css     */ const e = Object.fromEntries(
    new URLSearchParams(window.location.search)
  ),
  o = e.token,
  r = localStorage.getItem('passwordReissueToken');
o !== r && (window.location.href = './../notautherize.html');
localStorage.removeItem('passwordReissueToken');
