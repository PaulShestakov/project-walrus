import {
	LOAD_COMPANIES_SUCCESS,
	FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS,
	CLEAR_FUZZY_SEARCH_LOADED_COMPANIES,
	COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE
} from './../../actionCreators/companiesList/companiesList';

const defaultState = {
	companies: [],

	suggestionInputValue: '',
	fuzzySearchCompanies: []
};

const companiesListReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_COMPANIES_SUCCESS: {
			return {
				...state,
				companies: action.payload
			};
		}

		case FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS: {
			return {
				...state,
				fuzzySearchCompanies: action.payload
			};
		}

		case CLEAR_FUZZY_SEARCH_LOADED_COMPANIES: {
			return {
				...state,
				fuzzySearchCompanies: []
			}
		}

		case COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE: {
			return {
				...state,
				suggestionInputValue: action.payload
			}
		}

		default: {
			return state;
		}
	}
};

export default companiesListReducer;