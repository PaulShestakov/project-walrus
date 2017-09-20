import { combineReducers } from 'redux';

import newPromoReducer from './newPromo/newPromo';

import promoPageReducer from './promoPage/promoPage';
import companyPageReducer from './companyPage/companyPage';

import promosListReducer from './promosList/promosListReducer';
import filterReducer from './promosList/filterReducer';

import commonReducer from './common/common';

const rootReducer = combineReducers({
	common: commonReducer,
	newPromo: newPromoReducer,
	promoPage: promoPageReducer,
	companyPage : companyPageReducer,

	promosList: combineReducers({
		main: promosListReducer,
		filter: filterReducer,
	})
});

export default rootReducer;
