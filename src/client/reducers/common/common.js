import {
	LOAD_PROMO_CODE_VALUES_SUCCESS,
	LOAD_COMPANIES_TYPES_SUCCESS,
} from '../../actionCreators/common';

const defaultState = {
	promoCodeValues: {
		animals: [],
		cities: [],
		dataLoaded: false
	},
	companiesCategories: []
};

const commonReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_PROMO_CODE_VALUES_SUCCESS:
			return {
				...state,
				promoCodeValues: action.payload,
				promoCodeValuesLoaded: true
			};

		case LOAD_COMPANIES_TYPES_SUCCESS:
			return {
				...state,
				companiesCategories: action.payload,
				companiesCategoriesLoaded: true
			};

		default:
			return state;
	}
};

export default commonReducer;