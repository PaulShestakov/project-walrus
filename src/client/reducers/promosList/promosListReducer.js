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

		// case ADD_FILTER: {
		// 	const filterGroupId = action.payload.filterGroupId;
		// 	const filterValueId = action.payload.filterValueId;
		//
		// 	return {
		// 		...state,
		// 		filter: {
		// 			...state.filter,
		// 			[filterGroupId]: [
		// 				...state.filter[filterGroupId],
		// 				filterValueId
		// 			]
		// 		}
		// 	};
		// }
		// case REMOVE_FILTER: {
		// 	const filterGroupId = action.payload.filterGroupId;
		// 	const filterValueId = action.payload.filterValueId;
		//
		// 	return {
		// 		...state,
		// 		filter: {
		// 			...state.filter,
		// 			[filterGroupId]: state.filter[filterGroupId].filter(valueId => {
		// 				return valueId !== filterValueId;
		// 			})
		// 		}
		// 	};
		// }
        // case NEW_PROMO_CODEVALUES_SUCCESS:
        //     return {
        //         ...state,
        //         animals: action.payload.animals.map(mapCodeValue),
        //         cities: action.payload.cities.map(mapCodeValue),
        //         isFetching: false
        //     };



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