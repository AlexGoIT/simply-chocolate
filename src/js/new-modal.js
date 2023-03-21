const modalBtns = document.querySelectorAll('.js-modal-open');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 250;

if (modalBtns.length > 0) {
  for (let index = 0; index < modalBtns.length; index++) {
    const modalBtn = modalBtns[index];
    modalBtn.addEventListener('click', function (e) {
      const modalName = modalBtn.getAttribute('data-modal');
      const curentModal = document.getElementById(modalName);
      modalOpen(curentModal);
    });
  }
}

const modalCloseBtn = document.querySelectorAll('.js-modal-close');
if (modalCloseBtn.length > 0) {
  for (let index = 0; index < modalCloseBtn.length; index++) {
    const el = modalCloseBtn[index];
    el.addEventListener('click', function (e) {
      modalClose(el.closest('.backdrop'));
    });
  }
}

function modalOpen(curentModal) {
  if (curentModal && unlock) {
    const modalActive = document.querySelector('.backdrop.is-open');
    if (modalActive) {
      modalClose(modalActive, false);
    } else {
      bodyLock();
    }
    curentModal.classList.add('is-open');
    curentModal.addEventListener('click', function (e) {
      if (!e.target.closest('.modal')) {
        modalClose(e.target.closest('.backdrop'));
      }
    });
  }
}

function modalClose(modalActive, doUnlock = true) {
  if (unlock) {
    modalActive.classList.remove('is-open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector('.body').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const modalActive = document.querySelector('.backdrop.is-open');
    modalClose(modalActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();

(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
