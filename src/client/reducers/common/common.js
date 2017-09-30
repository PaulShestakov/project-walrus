import {
	LOAD_PROMO_CODE_VALUES_SUCCESS,
	LOAD_COMPANIES_CODE_VALUES_SUCCESS
} from '../../actionCreators/common';

const defaultState = {
	animals: [],
	animalsAreLoaded: false,

	cities: [],
	subway: [],
	citiesAreLoaded: false,

	companiesCategories: [],
	companiesCategoriesAreLoaded: false,

	daysOfWeek: []
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

		case LOAD_COMPANIES_CODE_VALUES_SUCCESS:
            return {
                ...state,
				cities: action.payload.CITY,
				daysOfWeek: action.payload.DAY_OF_WEEK,
                subway: action.payload['SUBWAY.MINSK'],
                companiesCategories: action.payload.categories
            }

		default:
			return state;
	}
};

export default commonReducer;