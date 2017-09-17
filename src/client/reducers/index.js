import { combineReducers } from 'redux';

import newPromoReducer from './newPromo/newPromo';

import promoPageReducer from './promoPage/promoPage';

import promosListReducer from './promosList/promosListReducer';
import filterReducer from './promosList/filterReducer';

import commonReducer from './common/common';

const rootReducer = combineReducers({
	common: commonReducer,
	newPromo: newPromoReducer,
	promoPage: promoPageReducer,

	promosList: combineReducers({
		main: promosListReducer,
		filter: filterReducer,
	})
});

export default rootReducer;
