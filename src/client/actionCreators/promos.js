import fetch from 'isomorphic-fetch';

export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const REQUEST_PROMOS_SUCCESS = 'REQUEST_PROMOS_SUCCESS';
export const REQUEST_PROMOS_ERROR = 'REQUEST_PROMOS_ERROR';

export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const FETCH_BREED_SUCCESS = 'FETCH_BREED_SUCCESS';

const baseUrl = '/api/v1';

export const requestPromos = () => {
    return {
        type: REQUEST_PROMOS,
        isFetching: true
    };
};

export const loadBreedSuccess = (data) => {
    return {
        type: FETCH_BREED_SUCCESS,
        data,
        isFetching: false
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
        isFetching: true
    };
};

const loadPromosSuccess = (data) => {
    return {
        type: REQUEST_PROMOS_SUCCESS,
        isFetching: false,
        data
    };
};

const loadPromosError = () => {
    return {
        type: REQUEST_PROMOS_ERROR,
        isFetching: false
    };
};

export const loadPromos = (filter) => {
    return dispatch => {
        dispatch(loadPromosStart());

        return fetch(buildUrl(baseUrl + '/promo', filter)).then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
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

function buildUrl(baseUrl, params) {
    if (Object.keys(params).length === 0) {
        return baseUrl;
    }
    baseUrl += '?';
    Object.keys(params).forEach(key => {
        let value = params[key];
        if (value instanceof Array) {
            value.forEach(item => {
                baseUrl += `${key}=${item}&`;
            });
        } else {
            baseUrl += `${key}=${value}&`;
        }
    });
    return baseUrl.slice(0, -1);
}