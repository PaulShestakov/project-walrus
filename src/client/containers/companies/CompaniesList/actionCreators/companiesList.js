import fetch from 'isomorphic-fetch';
import {stateDataToUrlQuery} from '../reducers/filterReducer';
import Utils from "../../../util/index";

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
		return fetch(`${baseUrl}/company/fuzzySearch${Utils.objectToUrlQuery(searchData)}`).then(
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