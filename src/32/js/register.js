import {
  checkFormValidityInBlur,
  confirmIfCanSubmit,
} from './modules/validation';
import { toggleInertAttribute } from './modules/toggle-inert';
import { togglePasswordDisplay } from './modules/togglepassword';

const bodyElement = document.querySelector('body');
const checkboxLink = document.getElementById('js-checkbox-link');
const modal = document.getElementById('js-modal-area');
const modalCloseButton = document.getElementById('js-modal-close-button');
const modalInner = document.getElementById('js-modal-inner');
const submitButton = document.querySelector('.js-submit-button');
const invalidItems = document.getElementsByClassName('invalid');
const form = document.getElementById('js-form');
const header = document.getElementById('js-header');

const openModal = () => {
  document.getElementById('js-modal-area').classList.add('is-active');
  bodyElement.classList.add('fixed');
  document.getElementById('js-modal-contents').scrollTop = 0;
  toggleInertAttribute([form, header], true);
  toggleInertAttribute([modal], false);
};

const closeModal = () => {
  document.getElementById('js-modal-area').classList.remove('is-active');
  bodyElement.classList.remove('fixed');
  toggleInertAttribute([form, header], false);
  toggleInertAttribute([modal], true);
  submitButton.focus();
};

checkboxLink.addEventListener('click', openModal);
checkboxLink.addEventListener('keypress', openModal);
modalCloseButton.addEventListener('click', closeModal);

//モーダル以外の部分を押すとモーダルが閉じる
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-modal')) closeModal();
});

//スクロールが一番下に行ったらチェックボックスをcheckedにする
const observerTarget = document.getElementById('js-last-sentence');
const observerOptions = {
  root: modalInner,
  threshold: 1.0,
};
const checkbox = document.getElementById('js-checkbox');

const setCheckedAttributeToCheckbox = ([entry]) => {
  if (entry.isIntersecting) {
    checkbox.checked = true;
    checkbox.disabled = false;
    checkbox.classList.remove('invalid');
    confirmIfCanSubmit(submitButton, invalidItems);
    modalCloseButton.focus();
  }
};

const observer = new IntersectionObserver(
  setCheckedAttributeToCheckbox,
  observerOptions
);
observer.observe(observerTarget);

const nameOfInput = document.querySelector('.js-form-name');
const emailOfInput = document.querySelector('.js-form-email');
const passwordOfInput = document.querySelector('.js-form-password');
const errorOfPassword = document.querySelector('[data-name="password-error"]');
const formElements = [nameOfInput, emailOfInput, passwordOfInput];
const eyeIcon = document.querySelector('.js-eye-icon');
const buttonErrorArea = document.getElementById('js-error-area');

formElements.forEach((element) => {
  element.classList.add('invalid');

  element.addEventListener('blur', (e) => {
    buttonErrorArea.textContent = '';

    if (e.relatedTarget === eyeIcon) {
      if (
        passwordOfInput.value &&
        errorOfPassword.textContent === '入力してください'
      )
        errorOfPassword.textContent = '';
      return;
    }

    checkFormValidityInBlur(submitButton, e.target);
    confirmIfCanSubmit(submitButton, invalidItems);
  });
});

eyeIcon.addEventListener('click', togglePasswordDisplay);
eyeIcon.addEventListener('blur', (e) => {
  if (e.relatedTarget === passwordOfInput) return;
  checkFormValidityInBlur(submitButton, passwordOfInput);

  if (invalidItems > 0) return;
  confirmIfCanSubmit(submitButton, invalidItems);
});

checkbox.addEventListener('input', () => {
  submitButton.disabled = !checkbox.checked;
  checkbox.checked
    ? checkbox.classList.remove('invalid')
    : checkbox.classList.add('invalid');
  confirmIfCanSubmit(submitButton, invalidItems);
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const inputsData = {
    name: nameOfInput.value,
    email: emailOfInput.value,
    password: passwordOfInput.value,
  };
  const registeredData = JSON.parse(localStorage.getItem('registeredData'));

  if (registeredData && inputsData.email === registeredData.email) {
    submitButton.disabled = true;
    buttonErrorArea.textContent = '既に登録済みのメールアドレスです';
    return;
  }

  localStorage.setItem('registeredData', JSON.stringify(inputsData));
  window.location.href = './register-done.html';
});
