import fetch from 'isomorphic-fetch';

export const SAVE_PROMO_REQUEST = 'SAVE_PROMO_REQUEST';
export const SAVE_PROMO_SUCCESS = 'SAVE_PROMO_SUCCESS';
export const SAVE_PROMO_FAILURE = 'SAVE_PROMO_FAILURE';


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

export const savePromo = data => {

	let form = new FormData();

	form.append('promo', JSON.stringify(data));
	// form.append('lostTime', data.lostTime);
	// form.append('foundAddress', data.foundAddress);
	// form.append('foundTime', data.foundTime);
	//
	// form.append('gender', data.gender);
	// form.append('approximateAge', data.approximateAge);
	//
	// form.append('price', data.price);
	//
	// form.append('personName', data.personName);
	// form.append('personAddress', data.personAddress);
	// form.append('personPhone', data.personPhone);
	// form.append('personEmail', data.personEmail);
	//
	// form.append('description', data.description);

	data.images.forEach((file, index) => {
		form.append('image', file);
	});


	return dispatch => {
		dispatch(savePromoStart());

		return fetch(baseUrl + '/promo', {
			method: 'POST',
			// headers: new Headers({
			// 	'Content-Type': 'multipart/form-data'
			// }),
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

