import fetch from 'isomorphic-fetch';

export const FETCH_PROMOS = 'FETCH_PROMOS';
export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const FETCH_BREED_SUCCESS = 'FETCH_BREED_SUCCESS';


const baseUrl = '/api/v1';

export const requestPromos = () => {
	return {
		type: REQUEST_PROMOS,
		isFetching : true
	};
};

export const loadBreedSuccess = (data) => {
    return {
        type: FETCH_BREED_SUCCESS,
        data,
        isFetching : false
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

export const fetchBreed = (animal) => {
	return dispatch => {
		fetch(baseUrl + "/codevalue/promo/breed?animal=" + animal).then(
			response => {
				if (response.ok) {
					return response.json();
				}
			},
			error => {
				console.log('An error occured.', error);
			}
		).then(json => {
			dispatch(loadBreedSuccess(json));
		});
	};
};

export const fetchPromos = () => {
    return dispatch => {
        dispatch({
            type: FETCH_PROMOS,
            isFetching : false
        });
	}
};
