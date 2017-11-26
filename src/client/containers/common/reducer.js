import {
	LOAD_PROMO_CODE_VALUES_SUCCESS,
	LOAD_COMPANIES_CODE_VALUES_SUCCESS,
	LOAD_USER_INFO_SUCCESS,
	UNAUTHORIZED_ERROR,
	CLOSE_UNAUTHORIZED_DIALOG
} from './actions';


const defaultState = {
	animals: [],
	animalsAreLoaded: false,
	user: {
		role: 5
	},

	countries: [],
	citiesAreLoaded: false,

	companiesCategories: [],
	companiesCategoriesAreLoaded: false,
    unauthorizedError: false,

	daysOfWeek: [],
    drugsTypes: [],
    torgTypes: [],
    clinicsServices: [],
    specialistDirections: [],
};

const commonReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_PROMO_CODE_VALUES_SUCCESS:
			return {
				...state,

				animals: action.payload.animals,
				animalsAreLoaded: true,

				countries: action.payload.countries,
				citiesAreLoaded: true
			};

		case LOAD_COMPANIES_CODE_VALUES_SUCCESS:
            return {
                ...state,
				animals: action.payload.animals,
				countries: action.payload.countries,
				daysOfWeek: action.payload.DAY_OF_WEEK,
                drugsTypes: action.payload.DRUGS_TYPE,
                torgTypes: action.payload.TORG_TYPE,
                specialistDirections: action.payload.SPECIALIST_DIRECTION,
                clinicsServices: action.payload.CLINICS_SERVICES,
                companiesCategories: action.payload.categories
			};

		case LOAD_USER_INFO_SUCCESS:
			return {
                ...state,
				user: action.payload
			};
		
		case UNAUTHORIZED_ERROR:
			return {
                ...state,
				unauthorizedError: true
			};
		case CLOSE_UNAUTHORIZED_DIALOG:
			return {
                ...state,
				unauthorizedError: false
			};
		default:
			return state;
	}
};

export default commonReducer;