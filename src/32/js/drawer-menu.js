import { toggleInertAttribute } from './modules/toggle-inert';

const body = document.querySelector('body');
const hamburgerButton = document.getElementById('js-hamburger-button');
const drawerMenu = document.querySelector('[data-name="drawer-menu"]');
const form = document.getElementById('js-form');
const title = document.getElementById('js-title');
const isOpen = (button) => button.getAttribute('aria-expanded') === 'true';

const openMenu = (button, menu) => {
  body.classList.add('is-drawer-active');
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', false);
  button.setAttribute('aria-expanded', true);
  toggleInertAttribute([drawerMenu], false);
  toggleInertAttribute([form, title], true);
};

const closeMenu = (button, menu) => {
  body.classList.remove('is-drawer-active');
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', true);
  button.setAttribute('aria-expanded', false);
  toggleInertAttribute([drawerMenu], true);
  toggleInertAttribute([form, title], false);
};

hamburgerButton.addEventListener('click', (e) => {
  if (isOpen(e.target)) {
    closeMenu(e.target, drawerMenu);
  } else {
    openMenu(e.target, drawerMenu);
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('is-drawer-active')) {
    closeMenu(hamburgerButton, drawerMenu);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu(hamburgerButton, drawerMenu);
});

const setDirect = (menu, direct) => {
  switch (direct) {
    case 'right':
      menu.classList.add('right');
      break;
    case 'left':
    default:
      menu.classList.add('left');
      break;
  }
};

const convertMillisecondsToSeconds = (speed) => `${speed / 1000}s`;
const formatSeconds = (speed = 400) => {
  if (typeof speed !== 'number') {
    throw new Error(`speed expect number type. but got ${typeof speed}`);
  }
  return convertMillisecondsToSeconds(speed);
};

const setSpeed = (menu, speed) => {
  menu.style.transitionDuration = formatSeconds(speed);
};

const option = {
  direct: 'left', //left or right
  speed: 400, // number(ミリ秒)
};

const initMenu = (menu, option = {}) => {
  setDirect(menu, option?.direct);
  setSpeed(menu, option?.speed);
};

initMenu(drawerMenu, option);
