import {
	LOAD_PROMO_CODE_VALUES_START,
	LOAD_PROMO_CODE_VALUES_SUCCESS,
	LOAD_PROMO_CODE_VALUES_ERROR,
} from '../../actionCreators/common';

const defaultState = {
	promoCodeValues: {
		animals: [],
		cities: [],
		dataLoaded: false
	}
};

const commonReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_PROMO_CODE_VALUES_SUCCESS:
			return {
				...state,
				promoCodeValues: action.payload,
				isFetching: false
			};
		default:
			return state;
	}
};

export default commonReducer;