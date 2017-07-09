import fetch from 'isomorphic-fetch';

export const SAVE_PROMO_REQUEST = 'SAVE_PROMO_REQUEST';
export const SAVE_PROMO_SUCCESS = 'SAVE_PROMO_SUCCESS';
export const SAVE_PROMO_FAILURE = 'SAVE_PROMO_FAILURE';


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

export const savePromo = (formData) => {
	return dispatch => {
		dispatch(savePromoStart());

		return fetch('/kek', {
			method: 'POST',
			body: formData
		}).then(
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
			dispatch(savePromoSuccess(json))
		}).catch(error => {
			dispatch(savePromoFailed(error))
		})
	};
};

