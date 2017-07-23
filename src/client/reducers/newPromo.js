import {
	SAVE_PROMO_REQUEST,
	SAVE_PROMO_SUCCESS,
	SAVE_PROMO_FAILURE,
    CODE_VALUES_REQUEST,
	CODE_VALUES_LOADED
} from '../actionCreators/newPromo';

const newPromo = (state = {}, action) => {
	switch (action.type) {

		case SAVE_PROMO_REQUEST:
		case CODE_VALUES_REQUEST:
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

		case CODE_VALUES_LOADED:
            return {
				...state,
				animals: action.response[0].animals,
				cities: action.response[1].cities,
				isFetching: false
			};

		default:
			return state;
	}
};

export default newPromo;