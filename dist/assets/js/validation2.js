const i = {
    name: { upperLimitOfText: 15 },
    password: { pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/ },
  },
  t = {
    name: {
      isValid: (e) => e.value.length < i.name.upperLimitOfText,
      errorMessage:
        '\u30E6\u30FC\u30B6\u30FC\u540D\u306F15\u6587\u5B57\u4EE5\u5185\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044',
    },
    email: {
      isValid: (e) => e.validity.valid,
      errorMessage:
        '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306E\u5F62\u5F0F\u306B\u306A\u3063\u3066\u3044\u307E\u305B\u3093',
    },
    confirmEmail: { isValid: () => !0 },
    password: {
      isValid: (e) => i.password.pattern.test(e.value),
      errorMessage:
        '8\u6587\u5B57\u4EE5\u4E0A\u306E\u5927\u5C0F\u306E\u82F1\u6570\u5B57\u3092\u4EA4\u305C\u305F\u3082\u306E\u306B\u3057\u3066\u304F\u3060\u3055\u3044',
    },
    confirmPassword: { isValid: () => !0 },
    userId: { isValid: () => !0 },
    submitButton: {
      errorMessage:
        '\u65E2\u306B\u767B\u9332\u6E08\u307F\u306E\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3067\u3059',
    },
  },
  n = (e) => e.classList.add('invalid'),
  a = (e) => e.classList.remove('invalid'),
  o = (e) => (e.nextElementSibling.textContent = t[e.name].errorMessage),
  r = (e) => (e.nextElementSibling.textContent = ''),
  l = (e) => e.value.trim() === '',
  d = (e) => t[e.name].isValid(e),
  m = (e, s) => (e.disabled = s.length > 0),
  u = (e, s) => {
    if (((e.disabled = !0), r(e), l(s))) {
      n(s),
        (s.nextElementSibling.textContent =
          '\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044');
      return;
    }
    if (!d(s)) {
      o(s), n(s);
      return;
    }
    r(s), a(s);
  };
export { m as a, u as c, o as s };
