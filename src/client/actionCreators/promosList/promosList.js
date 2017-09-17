import fetch from 'isomorphic-fetch';

export const REQUEST_PROMOS = 'REQUEST_PROMOS';
export const REQUEST_PROMOS_SUCCESS = 'REQUEST_PROMOS_SUCCESS';
export const REQUEST_PROMOS_ERROR = 'REQUEST_PROMOS_ERROR';

const baseUrl = '/api/v1';

import {stateDataToUrlQuery} from '../../reducers/promosList/filterReducer';


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

export const loadPromos = () => {
    return (dispatch, getState) => {
        const filterState = getState().promosList.filter;

        dispatch(loadPromosStart());

        return fetch(baseUrl + '/promo/filtered' + stateDataToUrlQuery(filterState)).then(
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





function loadPromoCodeValues() {
	return (dispatch, getState) => {
		const { common } = getState();

		if (!common.promoCodeValues.dataLoaded) {
			dispatch(loadPromoCodeValuesStart());

			fetch('/api/v1/codevalue/promo').then(
				response => {
					if (response.ok) {
						return response.json();
					}
				},
				error => {
					dispatch(loadPromoCodeValuesError())
				}
			).then(json => {
				dispatch(loadPromoCodeValuesSuccess({
					animals: json.animals.map(mapCodeValue),
					cities: json.cities.map(mapCodeValue),
					dataLoaded: true
				}));
			});
		}
	}
}
