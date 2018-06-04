import { createStore } from 'redux';
import spellbookApp from './reducers';

const store = createStore(
  spellbookApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
