import { combineReducers } from 'redux';

import newPromoReducer from './promos/newPromo/newPromo';
import newCompanyReducer from './companies/newCompany'

import promoPageReducer from './promos/promoPage/promoPage';
import companyPageReducer from './companies/companyPage/companyPage';

import promosListReducer from './promos/promosList/promosListReducer';
import {promosFilterReducer} from './promos/promosList/filterReducer';

import companiesListReducer from './companies/companiesList/companiesListReducer';
import {companiesFilterReducer} from './companies/companiesList/filterReducer';

import commonReducer from './common/common';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    form: formReducer,
	common: commonReducer,

	newPromo: newPromoReducer,
	promoPage: promoPageReducer,

	newCompany: newCompanyReducer,
	companyPage : companyPageReducer,

	promosList: combineReducers({
		main: promosListReducer,
		filter: promosFilterReducer,
	}),

	companiesList: combineReducers({
		main: companiesListReducer,
		filter: companiesFilterReducer,
	}),
});

export default rootReducer;
