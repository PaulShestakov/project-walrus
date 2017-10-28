import Util from '../../../../reducers/util/Util';
import {
	COMPANIES_LIST_ADD_CITY,
	COMPANIES_LIST_REMOVE_CITY,

	COMPANIES_LIST_SET_IS_WORKING_NOW,

	COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,

	COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE
} from '../actionCreators/filter';

const defaultState = {
	companyCategoryId: null,
	companySubcategoryId: null,

	selectedCitiesIds: [],

	isWorkingNow: false
};


export const companiesFilterReducer = (state = defaultState, action) => {
	switch (action.type) {
		case COMPANIES_LIST_ADD_CITY: {
			return {
				...state,
				selectedCitiesIds: state.selectedCitiesIds.concat([action.payload])
			}
		}
		case COMPANIES_LIST_REMOVE_CITY: {
			return {
				...state,
				selectedCitiesIds: state.selectedCitiesIds.filter(x => x !== action.payload)
			}
		}

		case COMPANIES_LIST_SET_IS_WORKING_NOW: {
			return {
				...state,
				isWorkingNow: action.payload
			}
		}

		case COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE: {
			updateUrl(state, action.payload);

			return state;
		}
		case COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE: {
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

export function stateDataToUrlQuery(state) {
	const filterData = {
		companyCategoryId: state.companyCategoryId,
		companySubcategoryId: state.companySubcategoryId,
		cityId: state.selectedCitiesIds,
		isWorkingNow: state.isWorkingNow
	};

	return Util.objectToUrlQuery(filterData);
}

function updateUrl(state, history) {
	history.push({
		search: stateDataToUrlQuery(state)
	});
}


function urlParamsToStateData(searchParams) {
	const urlData = Util.searchParamsToObject(searchParams);

	return {
		companyCategoryId: urlData.companyCategoryId || defaultState.companyCategoryId,
		companySubcategoryId: urlData.companySubcategoryId  || defaultState.companySubcategoryId,
		selectedCitiesIds: Util.ensureArray(urlData.cityId),
		isWorkingNow: urlData.isWorkingNow === 'true'
	};
}