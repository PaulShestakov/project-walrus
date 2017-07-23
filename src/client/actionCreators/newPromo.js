import fetch from 'isomorphic-fetch';

export const SAVE_PROMO_REQUEST = 'SAVE_PROMO_REQUEST';
export const SAVE_PROMO_SUCCESS = 'SAVE_PROMO_SUCCESS';
export const SAVE_PROMO_FAILURE = 'SAVE_PROMO_FAILURE';
export const CODE_VALUES_LOADED = 'CODE_VALUES_LOADED';
export const CODE_VALUES_REQUEST = 'CODE_VALUES_REQUEST';


const baseUrl = '/api/v1';


const savePromoStart = () => {
	return {
		type: SAVE_PROMO_REQUEST,
	};
};

const savePromoFailed = (error) => {
	return {
		type: SAVE_PROMO_FAILURE,
		error: error
	}
};

const savePromoSuccess = (response) => {
	return {
		type: SAVE_PROMO_SUCCESS,
		response
	}
};

const loadCodeValuesSuccess = (response) => {
    return {
        type: CODE_VALUES_LOADED,
        response
    }
};

const loadCodeValuesStart = () => {
    return {
        type: CODE_VALUES_REQUEST
    }
};

const loadCodeValues = () => {
    return dispatch => {
    	dispatch(loadCodeValuesStart());

    	fetch(baseUrl + '/codevalue/promo').then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            },
            error => {
                console.log('An error occured.', error);
            }
        ).then(json => {
            dispatch(loadCodeValuesSuccess(json));
        });
    }
};

const savePromo = data => {

	let form = new FormData();

	form.append('promo', JSON.stringify(data));

	data.images.forEach((file, index) => {
		form.append('image', file);
	});


	return dispatch => {
		dispatch(savePromoStart());

		return fetch(baseUrl + '/promo', {
			method: 'POST',
			body: form
		}).then(
			response => {
            if (response.ok) {
                return response.json();
            }
            else {
                throw new Error('Network response was not ok.');
                console.log(response)
            }
        },
            error => {
                console.log('An error occured.', error);
                dispatch(savePromoFailed(error))
            }
        ).then(json => {
			dispatch(savePromoSuccess(json))
		}).catch(error => {
			dispatch(savePromoFailed(error))
		})
	};
};

export { savePromo, loadCodeValues }
