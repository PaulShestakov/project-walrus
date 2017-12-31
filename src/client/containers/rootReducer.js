import { combineReducers } from 'redux';

import newPromoReducer from './promos/NewPromo/reducer';
import newCompanyReducer from './companies/NewCompany/reducer';

import promoPageReducer from './promos/PromoPage/reducer';
import companyPageReducer from './companies/CompanyPage/reducer.js';

import promosListReducer from './promos/PromosList/reducers/promosListReducer';
import {promosFilterReducer} from './promos/PromosList/reducers/filterReducer';

import companiesListReducer from './companies/CompaniesList/reducer.js';

import commonReducer from './common/reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	form: formReducer,
	common: commonReducer,

	newPromo: newPromoReducer,
	promoPage: promoPageReducer,

	newCompany: newCompanyReducer,
	companyPage: companyPageReducer,

	promosList: combineReducers({
		main: promosListReducer,
		filter: promosFilterReducer,
	}),

	companiesList: companiesListReducer,
});

export default rootReducer;
