import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import spellbookApp from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['currentSpellId'],
};

const persistedReducer = persistReducer(persistConfig, spellbookApp);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
