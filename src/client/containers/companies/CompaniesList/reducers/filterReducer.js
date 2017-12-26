import Util from '../../../util/index';
import filtersDescription from '../settings/filtersDescription';
import { findFilters } from '../settings/assignments';

import {
	COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,
	COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE,


	SETUP_INITIAL_FILTER_STATE,

	SUGGESTION_FILTER_CHANGE,
	CHECKBOXES_BLOCK_FILTER_CHANGE,

	SUGGESTION_SEARCH,

	SWITCH_FILTER_CHANGE
} from '../actionCreators/filter';
import {URL_PARAM_TYPES} from '../settings/constants';

const defaultState = {
	companyCategoryId: null,
	companySubcategoryId: null,

	suggestionQueries: {},

	sidebarFilters: {}
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

		const filterName = action.payload.name;
		const filterDescription = filtersDescription[filterName];
		const dependentFiltersNames = filterDescription.dependentFiltersNames;

		let dependentCleanup = {};
		if (dependentFiltersNames) {
			const presentFilters = findFilters(state.companyCategoryId, state.companySubcategoryId);

			dependentCleanup = dependentFiltersNames.reduce((acc, name) => {

				if (presentFilters.find(filter => filter.name === name)) {
					acc[name] = filtersDescription[name].defaultValue;
				}

				return acc;
			}, {});
		}

		return {
			...state,

			sidebarFilters: {
				...state.sidebarFilters,
				[action.payload.name]: action.payload.value,
				...dependentCleanup
			},

			suggestionQueries: {
				...state.suggestionQueries,
				[action.payload.name]: null
			}

		};
	}

	case CHECKBOXES_BLOCK_FILTER_CHANGE: {
		const previousSelectedCheckboxes = state.sidebarFilters[action.payload.name];

		let nextSelectedCheckboxes;
		if (action.payload.isChecked) {
			nextSelectedCheckboxes = previousSelectedCheckboxes.concat(action.payload.value);
		} else {
			const itemToDeleteIndex = previousSelectedCheckboxes.indexOf(action.payload.value);

			nextSelectedCheckboxes = [
				...previousSelectedCheckboxes.slice(0, itemToDeleteIndex),
				...previousSelectedCheckboxes.slice(itemToDeleteIndex + 1)
			];
		}

		return {
			...state,
			sidebarFilters: {
				...state.sidebarFilters,
				[action.payload.name]: nextSelectedCheckboxes
			}
		};
	}

	case SWITCH_FILTER_CHANGE: {
		return {
			...state,
			sidebarFilters: {
				...state.sidebarFilters,
				[action.payload.name]: action.payload.checked
			}
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

	case COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE: {
		updateUrl(state, action.payload);
		return state;
	}

	case COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE: {

		const staticPathParams = action.payload.staticPathParams;
		const dynamicPathParams = action.payload.dynamicPathParams;
		const queryParams = action.payload.queryParams;

		return {
			...state,
			...staticPathParams,

			sidebarFilters: {
				...state.sidebarFilters,
				...dynamicPathParams,
				...queryParams
			}
		};
	}

	default: {
		return state;
	}
	}
};

export function stateDataToUrlQuery(state) {
	const filterData = {
		offset: state.offset,
		limit: state.limit,

		companyCategoryId: state.companyCategoryId,
		companySubcategoryId: state.companySubcategoryId,

		...state.sidebarFilters
	};

	return Util.objectToUrlQuery(filterData);
}


function updateUrl(state, history) {

	const pathParams = [
		state.companyCategoryId,
		state.companySubcategoryId
	];
	const queryParams = {};


	const pathParamsFromFilter = [];

	// DIRTY. Accessing assignment here
	const assignmentFilters = findFilters(state.companyCategoryId, state.companySubcategoryId);

	Object.keys(state.sidebarFilters).forEach(filterName => {
		const assignmentFiltersDescriptions = assignmentFilters.map(filter => filtersDescription[filter.name]);
		const filterDescription = assignmentFiltersDescriptions.find(filter => filter.name === filterName);

		const urlParamConfig = filterDescription.urlParamConfig || {};

		switch (urlParamConfig.type) {
		case URL_PARAM_TYPES.PATH:
			pathParamsFromFilter.push({
				sort: urlParamConfig.sort,
				value: state.sidebarFilters[filterName]
			});
			break;
		case URL_PARAM_TYPES.QUERY:
			queryParams[filterName] = state.sidebarFilters[filterName];
			break;
		default:
			// Skip invisible parameter, do not add to url path
			break;
		}
	});

	pathParams.push(
		...pathParamsFromFilter.sort((a, b) => a.sort - b.sort)
			.map(param => param.value)
			.filter(param => param !== '')
	);

	history.push({
		pathname: '/company/' + pathParams.join('/'),
		search: Util.objectToUrlQuery(queryParams)
	});
}