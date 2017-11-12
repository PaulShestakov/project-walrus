import Util from '../../../util/index';
import {
	COMPANIES_LIST_ADD_CITY,
	COMPANIES_LIST_REMOVE_CITY,

	COMPANIES_LIST_ADD_SUBWAY,
	COMPANIES_LIST_REMOVE_SUBWAY,

	COMPANIES_LIST_ADD_ANIMAL,
	COMPANIES_LIST_REMOVE_ANIMAL,

	COMPANIES_LIST_ADD_BREED,
	COMPANIES_LIST_REMOVE_BREED,

	COMPANIES_LIST_SET_IS_WORKING_NOW,

	COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,

	COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE
} from '../actionCreators/filter';

const defaultState = {
	companyCategoryId: null,
	companySubcategoryId: null,

	selectedCitiesIds: [],
	selectedSubwaysIds: [],
	selectedAnimalsIds: [],
	selectedBreedsIds: [],

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

				case COMPANIES_LIST_ADD_SUBWAY: {
						return {
								...state,
								selectedSubwaysIds: state.selectedSubwaysIds.concat([action.payload])
						}
				}
				case COMPANIES_LIST_REMOVE_SUBWAY: {
						return {
								...state,
								selectedSubwaysIds: state.selectedSubwaysIds.filter(x => x !== action.payload)
						}
				}

				case COMPANIES_LIST_ADD_ANIMAL: {
						return {
								...state,
								selectedAnimalsIds: state.selectedAnimalsIds.concat([action.payload])
						}
				}
				case COMPANIES_LIST_REMOVE_ANIMAL: {
						return {
								...state,
								selectedAnimalsIds: state.selectedAnimalsIds.filter(x => x !== action.payload)
						}
				}

				case COMPANIES_LIST_ADD_BREED: {
						return {
								...state,
								selectedBreedsIds: state.selectedBreedsIds.concat([action.payload])
						}
				}
				case COMPANIES_LIST_REMOVE_BREED: {
						return {
								...state,
								selectedBreedsIds: state.selectedBreedsIds.filter(x => x !== action.payload)
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
		subwayId: state.selectedSubwaysIds,
		animalId: state.selectedAnimalsIds,
		breedId: state.selectedBreedsIds,
		isWorkingNow: state.isWorkingNow
	};

	return Util.objectToUrlQuery(filterData);
}

function updateUrl(state, history) {
	const updatedState = {...state};
	// I will think over this...
	delete updatedState.companyCategoryId;
	delete updatedState.companySubcategoryId;
	history.push({
		search: stateDataToUrlQuery(updatedState)
	});
}


function urlParamsToStateData(searchParams) {
	const urlData = Util.searchParamsToObject(searchParams);

	return {
		companyCategoryId: urlData.companyCategoryId || defaultState.companyCategoryId,
		companySubcategoryId: urlData.companySubcategoryId  || defaultState.companySubcategoryId,
		selectedCitiesIds: Util.ensureArray(urlData.cityId),
		selectedSubwaysIds: Util.ensureArray(urlData.subwayId),
		selectedAnimalsIds: Util.ensureArray(urlData.animalId),
		selectedBreedsIds: Util.ensureArray(urlData.breedId),
		isWorkingNow: urlData.isWorkingNow === 'true'
	};
}