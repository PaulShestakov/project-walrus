import {
	REQUEST_PROMOS,
	REQUEST_PROMOS_SUCCESS,
	REQUEST_PROMOS_ERROR,
} from './../../actionCreators/promosList/promosList';

// import {NEW_PROMO_CODEVALUES_SUCCESS} from "./../../actionCreators/newPromo";

const promosListReducer = (state = {}, action) => {
	switch (action.type) {

		case REQUEST_PROMOS: {
			return {
				...state,
				isFetching: true
			};
		}
		case REQUEST_PROMOS_SUCCESS: {
			return {
				...state,
				promos: action.data,
				isFetching: false
			};
		}
		case REQUEST_PROMOS_ERROR: {
			return {
				...state,
				isFetching: false
			};
		}
		default: {
			return state;
		}
	}
};

function mapCodeValue(codevalue) {
	return {
		value: codevalue.id,
		label: codevalue.name
	}
}

export default promosListReducer;