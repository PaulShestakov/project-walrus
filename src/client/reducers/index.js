import { combineReducers } from 'redux';

import newPromoReducer from './newPromo/newPromo';
import newCompanyReducer from './newCompany'

import promoPageReducer from './promoPage/promoPage';
import companyPageReducer from './companyPage/companyPage';

import promosListReducer from './promosList/promosListReducer';
import {promosFilterReducer} from './promosList/filterReducer';

import companiesListReducer from './companiesList/companiesListReducer';
import {companiesFilterReducer} from './companiesList/filterReducer';

import commonReducer from './common/common';
import editCompanyReducer from "./editCompany/editCompany";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    form: formReducer,
	common: commonReducer,

	newPromo: newPromoReducer,
	promoPage: promoPageReducer,

	newCompany: newCompanyReducer,
	editCompany: editCompanyReducer,
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
