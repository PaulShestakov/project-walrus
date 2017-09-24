import Util from '../util/Util';
import {
	LOAD_BREEDS_SUCCESS,

	SET_ANIMAL,
	SET_PROMO_TYPE,
	ADD_BREED,
	REMOVE_BREED,
	ADD_CITY,
	REMOVE_CITY,

	UPDATE_URL_WITH_STATE_SOURCE,

	UPDATE_FILTER_STATE_WITH_URL_SOURCE
} from './../../actionCreators/promosList/filter';

const defaultState = {
	companySubcategoryId: undefined,
	selectedCitiesIds: []
};


const filterReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_CITY: {
			return {
				...state,
				selectedCitiesIds: state.selectedCitiesIds.concat([action.payload])
			}
		}
		case REMOVE_CITY: {
			return {
				...state,
				selectedCitiesIds: state.selectedCitiesIds.filter(x => x !== action.payload)
			}
		}

		case UPDATE_URL_WITH_STATE_SOURCE: {
			updateUrl(state, action.payload);

			return state;
		}
		case UPDATE_FILTER_STATE_WITH_URL_SOURCE: {
			return {
				...state,
				...urlParamsToStateData(action.payload)
			}
		}

		default: {
			return state;
		}
	}
};


function updateUrl(state, history) {
	const filterData = {
		companySubcategoryId: state.companySubcategoryId,
		cityId: state.selectedCitiesIds
	};

	history.push({
		search: Util.objectToUrlQuery(filterData)
	});
}


function urlParamsToStateData(searchParams) {
	const urlData = Util.searchParamsToObject(searchParams);

	return {
		companySubcategoryId: urlData.companySubcategoryId  || defaultState.companySubcategoryId,
		selectedCitiesIds: urlData.cityId || defaultState.selectedCitiesIds,

	};
}

export default filterReducer;