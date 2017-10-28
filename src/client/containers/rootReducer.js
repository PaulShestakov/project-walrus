import { combineReducers } from 'redux';

import newPromoReducer from './promos/NewPromo/reducer';
import newCompanyReducer from './companies/NewCompany/reducer'

import promoPageReducer from './promos/PromoPage/reducer';
import companyPageReducer from './companies/CompanyPage/reducer';

import promosListReducer from './promos/PromosList/reducers/promosListReducer';
import {promosFilterReducer} from './promos/PromosList/reducers/filterReducer';

import companiesListReducer from './companies/CompaniesList/reducers/companiesListReducer';
import {companiesFilterReducer} from './companies/CompaniesList/reducers/filterReducer';

import commonReducer from './common/reducer';
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
