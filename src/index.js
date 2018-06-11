import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// https://stackoverflow.com/questions/19909533/disable-rubber-band-in-ios-full-screen-web-app?noredirect=1&lq=1
document.body.addEventListener(
  'touchmove',
  function(event) {
    var isTouchMoveAllowed = false;
    var p = event.target;

    while (p != null) {
      if (p && p.getAttribute && p.getAttribute('data-can-scroll') === 'true') {
        isTouchMoveAllowed = p.getAttribute('data-can-scroll');
        break;
      }
      p = p.parentNode;
    }

    if (!isTouchMoveAllowed) {
      event.preventDefault();
    }
  },
  {
    passive: false,
    useCapture: false,
  }
);

function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof window.DocumentTouch)
  ) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

function ready(fn) {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  if (!is_touch_device()) {
    document.body.classList.add('no-touch');
  }
});

registerServiceWorker();
