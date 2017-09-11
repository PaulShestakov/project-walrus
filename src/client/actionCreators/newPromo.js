import fetch from 'isomorphic-fetch';

export const SAVE_PROMO_REQUEST = 'SAVE_PROMO_REQUEST';
export const SAVE_PROMO_SUCCESS = 'SAVE_PROMO_SUCCESS';
export const SAVE_PROMO_FAILURE = 'SAVE_PROMO_FAILURE';

const baseUrl = '/api/v1';


const savePromoStart = () => ({
	type: SAVE_PROMO_REQUEST
});

const savePromoFailed = (error) => ({
	type: SAVE_PROMO_FAILURE,
	error: error
});

const savePromoSuccess = (response) => ({
	type: SAVE_PROMO_SUCCESS,
	response
});

const savePromo = (data) => {
	let form = new FormData();

	form.append('promo', JSON.stringify(data));

	data.images.forEach((file, index) => {
		form.append('image', file);
	});

	return dispatch => {
		dispatch(savePromoStart());

		fetch(baseUrl + '/promo', {
			method: 'POST',
			body: form
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
			dispatch(savePromoSuccess(json));
		}).catch(error => {
			dispatch(savePromoFailed(error))
		})
	};
};

export { savePromo }