import fetch from 'isomorphic-fetch';

export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';


const baseUrl = '/api/v1';

export const requestPromos = () => {
	return {
		type: REQUEST_PROMOS,
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
