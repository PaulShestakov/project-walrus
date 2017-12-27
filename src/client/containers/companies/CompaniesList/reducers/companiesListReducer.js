import {
	LOAD_COMPANIES_START,
	LOAD_COMPANIES_ERROR,
	LOAD_COMPANIES_SUCCESS,
	FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS,
	CLEAR_FUZZY_SEARCH_LOADED_COMPANIES,
	COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE,
	COMPONENT_LEAVE,
	UPDATE_PAGINATION_DATA,
	SETUP_INITIAL_METADATA
} from '../actionCreators/companiesList';
import { INITIAL_METADATA } from '../constants.js';

const defaultState = {
	companies: [],
	suggestionInputValue: '',
	fuzzySearchCompanies: [],

	isLoading: false,

	metadata: INITIAL_METADATA
};

const companiesListReducer = (state = defaultState, action) => {
	switch (action.type) {

	case SETUP_INITIAL_METADATA: {
		return {
			...state,
			matadata: INITIAL_METADATA
		};
	}

	case LOAD_COMPANIES_START: {
		return {
			...state,
			isLoading: true
		};
	}
	case LOAD_COMPANIES_ERROR: {
		return {
			...state,
			isLoading: false
		};
	}
	case LOAD_COMPANIES_SUCCESS: {
		return {
			...state,
			companies: action.payload.companies,
			metadata: action.payload.metadata,
			isLoading: false
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
		};
	}

	case COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE: {
		return {
			...state,
			suggestionInputValue: action.payload
		};
	}

	case COMPONENT_LEAVE: {
		return {
			...defaultState
		};
	}

	case UPDATE_PAGINATION_DATA: {
		return {
			...state,
			metadata: {
				...state.metadata,
				...action.payload
			}
		};
	}

	default: {
		return state;
	}
	}
};

export default companiesListReducer;