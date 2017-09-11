import fetch from 'isomorphic-fetch';

export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const REQUEST_PROMOS_SUCCESS = 'REQUEST_PROMOS_SUCCESS';
export const REQUEST_PROMOS_ERROR = 'REQUEST_PROMOS_ERROR';

const baseUrl = '/api/v1';


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

const loadPromosError = (error) => {
    return {
        type: REQUEST_PROMOS_ERROR,
        isFetching: false,
        error
    };
};

export const loadPromos = (filter) => {
    return dispatch => {
        dispatch(loadPromosStart());

        return fetch(buildUrl(baseUrl + '/promo/filtered', filter)).then(
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
            dispatch(loadPromosSuccess(json));
        }).catch(error => {
            dispatch(loadPromosError(error));
        })
    };
};

export function buildUrl(baseUrl, params) {
    if (!params || Object.keys(params).length === 0) {
        return baseUrl;
    }
    if (!baseUrl) {
        baseUrl = '';
    }
    baseUrl += '?';
    Object.keys(params).forEach(key => {
        let value = params[key];
        if (value instanceof Array) {
            value.forEach(item => {
                if (item) {
                    baseUrl += `${key}=${item}&`;
                }
            });
        } else {
            if (value) {
                baseUrl += `${key}=${value}&`;
            }
        }
    });
    return baseUrl.slice(0, -1);
}