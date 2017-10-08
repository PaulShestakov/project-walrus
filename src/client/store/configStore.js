import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index.js';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';


export default function configureStore() {
	//const persistedState = loadState();
	const persistedState = {};


	const middlewares = [thunk];

	if (process.env.NODE_ENV === 'development') {
		const logger = createLogger();
		middlewares.push(logger);
	}



    const store = createStore(
		rootReducer,
		persistedState,
		applyMiddleware(...middlewares)
	);

	// store.subscribe(function() {
	//   saveState(store.getState())
	// });

	return store;
}