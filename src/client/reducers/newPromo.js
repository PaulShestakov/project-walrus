import { SAVE_PROMO_REQUEST,
	SAVE_PROMO_SUCCESS,
	SAVE_PROMO_FAILURE } from '../actionCreators/newPromo';

const newPromo = (state = {}, action) => {
	switch (action.type) {

		case SAVE_PROMO_REQUEST:
			return {
				...state,
				isFetching: true
			};

		case SAVE_PROMO_SUCCESS:
			return {
				...state,
				response: action.response,
				isFetching: false
			};

		case SAVE_PROMO_FAILURE:
			return {
				...state,
				error: action.error,
				isFetching: false
			};

		default:
			return state;
	}
};

export default newPromo;