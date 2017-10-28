import {
	SAVE_PROMO_REQUEST,
	SAVE_PROMO_SUCCESS,
	SAVE_PROMO_FAILURE,

	NEW_PROMO_CODEVALUES_SUCCESS,
} from './actions';

import { FETCH_BREED_SUCCESS } from '../PromosList/actionCreators/promosList';

const newPromoReducer = (state = {}, action) => {
	switch (action.type) {

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

		case NEW_PROMO_CODEVALUES_SUCCESS:
            return {
				...state,
				animals: action.payload.animals.map(mapCodeValue),
				cities: action.payload.cities.map(mapCodeValue),
				isFetching: false
			};

        case FETCH_BREED_SUCCESS:
            return {
                ...state,
                breeds: action.payload.map(mapCodeValue)
            };

		default:
			return state;
	}
};


function mapCodeValue(codevalue) {
	return {
		value: codevalue.id,
		label: codevalue.name
	}
}

export default newPromoReducer;