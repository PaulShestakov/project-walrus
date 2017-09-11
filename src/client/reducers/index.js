import { combineReducers } from 'redux';

import newPromo from './newPromo';
import promosListReducer from './promosList/promosListReducer';
import filterReducer from './promosList/filterReducer';
import { commonReducer } from './common';

const rootReducer = combineReducers({
	common: commonReducer,
	newPromo,

	promosList: combineReducers({
		main: promosListReducer,
		filter: filterReducer,
	})
});

export default rootReducer;
