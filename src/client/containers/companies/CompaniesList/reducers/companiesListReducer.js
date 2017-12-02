import {
	LOAD_COMPANIES_START,
	LOAD_COMPANIES_ERROR,
	LOAD_COMPANIES_SUCCESS,
	FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS,
	CLEAR_FUZZY_SEARCH_LOADED_COMPANIES,
	COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE,
	COMPONENT_LEAVE,

} from '../actionCreators/companiesList';

const defaultState = {
	companies: [],
	suggestionInputValue: '',
	fuzzySearchCompanies: [],

	isLoading: false
};

const companiesListReducer = (state = defaultState, action) => {
	switch (action.type) {


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
			companies: action.payload,
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

	default: {
		return state;
	}
	}
};

export default companiesListReducer;