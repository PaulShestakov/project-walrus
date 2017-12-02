export const LOAD_PROMO_START = 'LOAD_PROMO_START';
export const LOAD_PROMO_SUCCESS = 'LOAD_PROMO_SUCCESS';
export const LOAD_PROMO_ERROR = 'LOAD_PROMO_ERROR';


const loadPromoStart = () => ({
	type: LOAD_PROMO_START,
	isFetching: true
});
const loadPromoSuccess = (data) => ({
	type: LOAD_PROMO_SUCCESS,
	payload: data,
	isFetching: false
});
const loadPromoError = (error) => ({
	type: LOAD_PROMO_ERROR,
	payload: error,
	isFetching: false
});

export function loadPromo(promoId) {
	return (dispatch) => {

		dispatch(loadPromoStart());

		fetch('/api/v1/promo/' + promoId).then(
			response => {
				if (response.ok) {
					return response.json();
				}
			},
			error => {
				dispatch(loadPromoError());
			}
		).then(json => {
			dispatch(loadPromoSuccess(json));
		});

	};
}