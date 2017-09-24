import fetch from 'isomorphic-fetch';
import {stateDataToUrlQuery} from '../../reducers/companiesList/filterReducer';

export const LOAD_COMPANIES_START = 'LOAD_COMPANIES_START';
export const LOAD_COMPANIES_SUCCESS = 'LOAD_COMPANIES_SUCCESS';
export const LOAD_COMPANIES_ERROR = 'LOAD_COMPANIES_ERROR';

const baseUrl = '/api/v1';


const loadCompaniesStart = () => ({
	type: LOAD_COMPANIES_START,
	isFetching: true
});

const loadCompaniesSuccess = (data) => ({
	type: LOAD_COMPANIES_SUCCESS,
	isFetching: false,
	payload: data
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
            dispatch(loadCompaniesSuccess(json));
        }).catch(error => {
            dispatch(loadCompaniesError(error));
        })
    };
};