import Util from '../util/Util';
import {
	COMPANIES_LIST_ADD_CITY,
	COMPANIES_LIST_REMOVE_CITY,

	COMPANIES_LIST_ADD_DAY_OF_WEEK,
	COMPANIES_LIST_REMOVE_DAY_OF_WEEK,

	COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,

	COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE
} from './../../actionCreators/companiesList/filter';

const defaultState = {
	companyCategoryId: undefined,
	companySubcategoryId: undefined,
	selectedCitiesIds: [],
	selectedDaysOfWeekIds: []
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

		case COMPANIES_LIST_ADD_DAY_OF_WEEK: {
			return {
				...state,
				selectedDaysOfWeekIds: state.selectedDaysOfWeekIds.concat([action.payload])
			}
		}
		case COMPANIES_LIST_REMOVE_DAY_OF_WEEK: {
			return {
				...state,
				selectedDaysOfWeekIds: state.selectedDaysOfWeekIds.filter(x => x !== action.payload)
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
		dayOfWeek: state.selectedDaysOfWeekIds
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
		selectedDaysOfWeekIds: Util.ensureArray(urlData.dayOfWeek),
	};
}