import fetch from 'isomorphic-fetch';

export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const REQUEST_PROMOS_SUCCESS = 'REQUEST_PROMOS_SUCCESS';
export const REQUEST_PROMOS_ERROR = 'REQUEST_PROMOS_ERROR';

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

const loadPromosStart = () => {
	return {
        type: REQUEST_PROMOS,
        isFetching : true
    };
};

const loadPromosSuccess = (data) => {
	return {
		type: REQUEST_PROMOS_SUCCESS,
		isFetching : false,
		data
	};
};

const loadPromosError = () => {
	return {
		type: REQUEST_PROMOS_ERROR,
		isFetching : false
	};
};

export const loadPromos = () => {
	return dispatch => {
		dispatch(loadPromosStart());

		return fetch(baseUrl + '/promo').then(
			response => {
				if (response.ok) {
					return response.json();
				}
				else {
					throw new Error('Network response was not ok.');
				}
			},
			error => {
				console.log('An error occured.', error);
				dispatch(savePromoFailed(error))
			}
		).then(json => {
			dispatch(loadPromosSuccess(json))
		}).catch(error => {
			dispatch(loadPromosError());
		})
	};
};
