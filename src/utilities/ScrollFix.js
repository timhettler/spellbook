/**
 * ScrollFix v0.1
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

const scrollFix = (elem) => {
  return (event) => {
    const startTopScroll = elem.scrollTop;

    if (startTopScroll <= 0) {
      elem.scrollTop = 1;
    }

    if (startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
      elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }
  };
};

export const addScrollFix = (elem) => {
  if (!elem) return;
  elem.addEventListener('touchstart', scrollFix(elem), false);
};

export const removeScrollFix = (elem) => {
  if (!elem) return;
  elem.removeEventListener('touchstart', scrollFix(elem), false);
};
