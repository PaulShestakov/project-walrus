import {
	LOAD_PROMO_CODE_VALUES_SUCCESS,
	LOAD_COMPANIES_TYPES_SUCCESS,

	LOAD_COMPANIES_CODE_VALUES_SUCCESS
} from '../../actionCreators/common';

const defaultState = {
	animals: [],
	animalsAreLoaded: false,

	cities: [],
	citiesAreLoaded: false,

	companiesCategories: [],
	companiesCategoriesAreLoaded: false
};

const commonReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_PROMO_CODE_VALUES_SUCCESS:
			return {
				...state,

				animals: action.payload.animals,
				animalsAreLoaded: true,

				cities: action.payload.cities,
				citiesAreLoaded: true
			};

		case LOAD_COMPANIES_TYPES_SUCCESS:
			return {
				...state,
				companiesCategories: action.payload,
				companiesCategoriesAreLoaded: true
			};

		case LOAD_COMPANIES_CODE_VALUES_SUCCESS:
			return {
				...state,

				cities: action.payload.cities,
				citiesAreLoaded: true
			};

		default:
			return state;
	}
};

export default commonReducer;