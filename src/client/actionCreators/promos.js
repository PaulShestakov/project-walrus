import fetch from 'isomorphic-fetch';

export const FETCH_PROMOS = 'FETCH_PROMOS';
export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';


const baseUrl = '/api/v1';

export const requestPromos = () => {
	return {
		type: REQUEST_PROMOS,
		isFetching : true
	};
};

export const addFilter = (filterGroupId, filterValueId) => {
	return {
		type: ADD_FILTER,
		payload: {
			filterGroupId,
			filterValueId
		}
	};
};

export const removeFilter = (filterGroupId, filterValueId) => {
	return {
		type: ADD_FILTER,
		payload: {
			filterGroupId,
			filterValueId
		}
	};
};

export const fetchPromos = () => {
	dispatch({
        type: FETCH_PROMOS,
        isFetching : true
    });
    return dispatch => {

	}
};
