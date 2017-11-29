import Util from '../../../util/index';
import * as _ from 'lodash';

import {
// 	COMPANIES_LIST_ADD_CITY,
// 	COMPANIES_LIST_REMOVE_CITY,

	COMPANIES_LIST_ADD_SUBWAY,
	COMPANIES_LIST_REMOVE_SUBWAY,
	//
	// COMPANIES_LIST_ADD_ANIMAL,
	// COMPANIES_LIST_REMOVE_ANIMAL,

	COMPANIES_LIST_ADD_BREED,
	COMPANIES_LIST_REMOVE_BREED,

	COMPANIES_LIST_SET_IS_WORKING_NOW,

	COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,
	COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE,


	SETUP_INITIAL_FILTER_STATE,

	SUGGESTION_FILTER_CHANGE,
	CHECKBOXES_BLOCK_FILTER_CHANGE,

	SUGGESTION_SEARCH

} from '../actionCreators/filter';

const defaultState = {
	companyCategoryId: null,
	companySubcategoryId: null,

	suggestionQueries: {}

};


export const companiesFilterReducer = (state = defaultState, action) => {
	switch (action.type) {

	case SETUP_INITIAL_FILTER_STATE: {
		return {
			...state,
			sidebarFilters: action.payload
		};
	}

	case SUGGESTION_FILTER_CHANGE: {
		return {
			...state,

			[action.payload.name]: action.payload.newValue,

			suggestionQueries: {
				...state.suggestionQueries,
				[action.payload.name]: null
			}

		};
	}

	case CHECKBOXES_BLOCK_FILTER_CHANGE: {
		console.log(action.payload);
		return {
			...state,

		};
	}

	case SUGGESTION_SEARCH: {
		return {
			...state,
			suggestionQueries: {
				...state.suggestionQueries,
				[action.payload.name]: action.payload.searchQuery
			}
		};
	}








	case COMPANIES_LIST_ADD_SUBWAY: {
		return {
			...state,
			selectedSubwaysIds: state.selectedSubwaysIds.concat([action.payload])
		};
	}
	case COMPANIES_LIST_REMOVE_SUBWAY: {
		return {
			...state,
			selectedSubwaysIds: state.selectedSubwaysIds.filter(x => x !== action.payload)
		};
	}

	case COMPANIES_LIST_ADD_BREED: {
		return {
			...state,
			selectedBreedsIds: state.selectedBreedsIds.concat([action.payload])
		};
	}
	case COMPANIES_LIST_REMOVE_BREED: {
		return {
			...state,
			selectedBreedsIds: state.selectedBreedsIds.filter(x => x !== action.payload)
		};
	}
	case COMPANIES_LIST_SET_IS_WORKING_NOW: {
		return {
			...state,
			isWorkingNow: action.payload
		};
	}

	case COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE: {
		updateUrl(state, action.payload);
		return state;
	}
	case COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE: {
		return {
			...state,
			...urlParamsToStateData(action.payload)
		};
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
		countryId: state.selectedCountryId,
		cityId: state.selectedCityId,
		subwayId: state.selectedSubwaysIds,
		animalId: state.selectedAnimalId,
		breedId: state.selectedBreedsIds,
		isWorkingNow: state.isWorkingNow
	};

	return Util.objectToUrlQuery(filterData);
}

function updateUrl(state, history) {
	const updatedState = {...state};
	delete updatedState.companyCategoryId;
	delete updatedState.companySubcategoryId;
	delete updatedState.selectedCountryId;
	delete updatedState.selectedCityId;


	history.push({
		search: stateDataToUrlQuery(updatedState)
	});
}


function urlParamsToStateData(searchParams) {
	const urlData = Util.searchParamsToObject(searchParams);

	return {
		companyCategoryId: urlData.companyCategoryId || defaultState.companyCategoryId,
		companySubcategoryId: urlData.companySubcategoryId  || defaultState.companySubcategoryId,
		selectedCountryId: urlData.selectedCountryId || defaultState.selectedCountryId,
		selectedCityId: urlData.selectedCityId || defaultState.selectedCityId,
		selectedSubwaysIds: Util.ensureArray(urlData.subwayId),
		selectedAnimalId: urlData.selectedAnimalId,
		selectedBreedsIds: Util.ensureArray(urlData.breedId),
		isWorkingNow: urlData.isWorkingNow === 'true'
	};
}