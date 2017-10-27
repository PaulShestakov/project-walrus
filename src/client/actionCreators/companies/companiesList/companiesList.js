import fetch from 'isomorphic-fetch';
import {stateDataToUrlQuery} from '../../../reducers/companies/companiesList/filterReducer';

export const LOAD_COMPANIES_START = 'LOAD_COMPANIES_START';
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS';
export const LOAD_COMPANIES_ERROR = 'LOAD_COMPANIES_ERROR';
export const DELETE_COMPANY_SUCCESS = 'DELETE_COMPANY_SUCCESS';

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

		const filterState = getState().companiesList.filter;

		return fetch(baseUrl + '/company/filtered' + stateDataToUrlQuery(filterState)).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			},
			error => {
				dispatch(loadCompaniesError(error))
			}
		).then(json => {
			dispatch({
				type: LOAD_COMPANIES_SUCCESS,
				isFetching: false,
				payload: json
			});
		}).catch(error => {
			dispatch(loadCompaniesError(error));
		})
	};
};

export const removeCompany = (companyId) => {
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
				dispatch(loadCompaniesError(error))
			}
		).then(json => {
			dispatch(loadCompanies());
		}).catch(error => {
			// dispatch(loadCompaniesError(error));
		})
	};
};


export const FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS = 'FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS';

const fuzzySearchLoadCompaniesSuccess = (data) => ({
	type: FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS,
	payload: data
});

export const fuzzySearchLoadCompanies = (searchQuery) => {
	return (dispatch) => {
		return fetch(`${baseUrl}/company/fuzzySearch?searchQuery=${searchQuery}`).then(
			response => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error('Network response was not ok.');
				}
			}
		).then(json => {
			dispatch(fuzzySearchLoadCompaniesSuccess(json));
		})
	};
};


export const CLEAR_FUZZY_SEARCH_LOADED_COMPANIES = 'CLEAR_FUZZY_SEARCH_LOADED_COMPANIES';

export const clearFuzzySearchLoadedCompanies = () => ({
	type: CLEAR_FUZZY_SEARCH_LOADED_COMPANIES
});


export const COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE = 'COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE';

export const suggestionInputValueChange = (data) => ({
	type: COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE,
	payload: data
});