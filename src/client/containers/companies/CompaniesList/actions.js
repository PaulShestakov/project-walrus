import fetch from 'isomorphic-fetch';
import {stateDataToUrlQuery} from './reducer';
import Util from '../../util/index';

export const LOAD_COMPANIES_START = 'companiesList/LOAD_COMPANIES_START';
export const LOAD_COMPANIES_SUCCESS = 'companiesList/LOAD_COMPANIES_SUCCESS';
export const LOAD_COMPANIES_ERROR = 'companiesList/LOAD_COMPANIES_ERROR';
export const DELETE_COMPANY_SUCCESS = 'companiesList/DELETE_COMPANY_SUCCESS';

const baseUrl = '/api/v1';


const loadCompaniesStart = () => ({
	type: LOAD_COMPANIES_START,
	isFetching: true
});

const loadCompaniesError = (error) => ({
	type: LOAD_COMPANIES_ERROR,
	isFetching: false,
	payload: error
});

export const loadCompanies = () => {
	return (dispatch, getState) => {
		dispatch(loadCompaniesStart());

		const state = getState().companiesList;
		// const metadata = getState().companiesList.main.metadata;

		const filterData = {
			// limit: metadata.limit,
			// offset: metadata.offset,

			companyCategoryId: state.companyCategoryId,
			companySubcategoryId: state.companySubcategoryId,

			...state.filters
		};

		return fetch(baseUrl + '/company/filtered' + Util.objectToUrlQuery(filterData)).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			},
			error => {
				dispatch(loadCompaniesError(error));
			}
		).then(json => {
			dispatch({
				type: LOAD_COMPANIES_SUCCESS,
				isFetching: false,
				payload: json
			});
		}).catch(error => {
			dispatch(loadCompaniesError(error));
		});
	};
};

export const removeCompany = (companyId, history) => {
	return dispatch => {
		return fetch(baseUrl + '/company/' + companyId, {
			method: 'DELETE',
			credentials: 'include'
		}).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			},
			error => {
				dispatch(loadCompaniesError(error));
			}
		).then(json => {
			if (history) {
				history.goBack();
			}
			dispatch(loadCompanies());
		}).catch(error => {
			// dispatch(loadCompaniesError(error));
		});
	};
};


export const FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS = 'companiesList/FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS';
const fuzzySearchLoadCompaniesSuccess = (data) => ({
	type: FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS,
	payload: data
});

export const fuzzySearchLoadCompanies = (searchData) => {
	return (dispatch) => {
		return fetch(`${baseUrl}/company/fuzzySearch${Util.objectToUrlQuery(searchData)}`).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			}
		).then(json => {
			dispatch(fuzzySearchLoadCompaniesSuccess(json));
		});
	};
};


export const CLEAR_FUZZY_SEARCH_LOADED_COMPANIES = 'companiesList/CLEAR_FUZZY_SEARCH_LOADED_COMPANIES';
export const clearFuzzySearchLoadedCompanies = () => ({
	type: CLEAR_FUZZY_SEARCH_LOADED_COMPANIES
});


export const COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE = 'companiesList/COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE';
export const suggestionInputValueChange = (data) => ({
	type: COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE,
	payload: data
});


export const COMPONENT_LEAVE = 'companiesList/COMPONENT_LEAVE';
export const componentLeave = () => ({
	type: COMPONENT_LEAVE
});



















export const COMPANIES_LIST_SET_IS_WORKING_NOW = 'COMPANIES_LIST_SET_IS_WORKING_NOW';
export const setIsWorkingNow = (data) => {
	return {
		type: COMPANIES_LIST_SET_IS_WORKING_NOW,
		payload: data
	};
};


export const COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE = 'COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE';
export const updateUrlWithStateSource = (history) => {
	return {
		type: COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,
		payload: history
	};
};

export const COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE = 'COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE';
export const updateStateWithUrlSource = (staticPathParams, dynamicPathParams, queryParams) => {
	return {
		type: COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE,
		payload: {
			staticPathParams,
			dynamicPathParams,
			queryParams
		}
	};
};



export const SET_DEFAULT_FILTERS_VALUES = 'companiesList/SET_DEFAULT_FILTERS_VALUES';
export const setDefaultFiltersValues = (defaultFiltersValues) => {
	return {
		type: SET_DEFAULT_FILTERS_VALUES,
		payload: defaultFiltersValues
	};
};



export const SUGGESTION_FILTER_CHANGE = 'companiesList/SUGGESTION_FILTER_CHANGE';
export const suggestionFilterChange = (name, value) => {
	return {
		type: SUGGESTION_FILTER_CHANGE,
		payload: {
			name,
			value
		}
	};
};


export const CHECKBOXES_BLOCK_FILTER_CHANGE = 'companiesList/CHECKBOXES_BLOCK_FILTER_CHANGE';
export const checkboxesBlockFilterChange = (name, value, isChecked) => {
	return {
		type: CHECKBOXES_BLOCK_FILTER_CHANGE,
		payload: {
			name,
			value,
			isChecked
		}
	};
};


export const SUGGESTION_SEARCH = 'companiesList/SUGGESTION_SEARCH';
export const handleSuggestionSearch = (name, searchQuery) => {
	return {
		type: SUGGESTION_SEARCH,
		payload: {
			name,
			searchQuery
		}
	};
};


export const SWITCH_FILTER_CHANGE = 'companiesList/SWITCH_FILTER_CHANGE';
export const switchFilterChange = (name, checked) => {
	return {
		type: SWITCH_FILTER_CHANGE,
		payload: {
			name,
			checked
		}
	};
};


export const UPDATE_PAGINATION_DATA = 'companiesList/UPDATE_PAGINATION_DATA';
export const updatePaginationData = (nextPage) => ({
	type: UPDATE_PAGINATION_DATA,
	payload: nextPage
});
