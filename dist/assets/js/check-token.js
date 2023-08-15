const r = Object.fromEntries(new URLSearchParams(window.location.search)),
  e = r.token,
  o = localStorage.getItem('token'),
  a = (t, n) => t !== n;
(!o || !e) && (window.location.href = './../notautherize.html');
a(e, o) &&
  (localStorage.removeItem('token'),
  (window.location.href = './../notautherize.html'));
