const s = (t) => {
  const e = t.target.nextElementSibling;
  e.type === 'password'
    ? ((e.type = 'text'),
      t.target.setAttribute(
        'aria-label',
        '\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u975E\u8868\u793A\u306B\u3057\u307E\u3059'
      ))
    : ((e.type = 'password'),
      t.target.setAttribute(
        'aria-label',
        '\u30D1\u30B9\u30EF\u30FC\u30C9\u3092\u8868\u793A\u3057\u307E\u3059'
      )),
    t.target.classList.toggle('is-open');
};
export { s as t };
