import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index.js';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';


export default function configureStore() {
  const logger = createLogger();
  const persistedState = loadState();

  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(logger, thunk)
  );

  store.subscribe(function() {
    saveState(store.getState())
  });

  return store;
}
