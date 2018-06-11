/**
 * ScrollFix v0.1
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

export default function ScrollFix(elem) {
  elem = elem || document.querySelector(elem);

  // If there is no element, then do nothing
  if (!elem) return;

  // Handle the start of interactions
  elem.addEventListener(
    'touchstart',
    function(event) {
      let startTopScroll = elem.scrollTop;

      if (startTopScroll <= 0) elem.scrollTop = 1;

      if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
        elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    },
    false
  );
}
