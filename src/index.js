import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import './index.scss';
import ConnectedApp from './containers/ConnectedApp';
import ConnectedSEO from './containers/ConnectedSEO';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedSEO />
        <ConnectedApp />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// https://stackoverflow.com/questions/19909533/disable-rubber-band-in-ios-full-screen-web-app?noredirect=1&lq=1
document.body.addEventListener(
  'touchmove',
  function(event) {
    var isTouchMoveAllowed = false;
    var p = event.target;

    while (p != null) {
      if (p && p.getAttribute && p.getAttribute('data-can-scroll')) {
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

// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript#4819886
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
