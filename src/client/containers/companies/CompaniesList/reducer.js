import {
	LOAD_COMPANIES_START, LOAD_COMPANIES_ERROR, LOAD_COMPANIES_SUCCESS,

	FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS, CLEAR_FUZZY_SEARCH_LOADED_COMPANIES,

	COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE,
	UPDATE_PAGINATION_DATA,



	COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,
	COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE,


	SET_DEFAULT_FILTERS_VALUES,

	SUGGESTION_FILTER_CHANGE,
	CHECKBOXES_BLOCK_FILTER_CHANGE,

	SUGGESTION_SEARCH,

	SWITCH_FILTER_CHANGE,

	COMPONENT_LEAVE
} from './actions.js';
import Util from '../../util/index';
import FILTERS_CONFIGURATIONS from '../../../metadata/settings/filtersConfigurations';
import { findFilters } from '../../../metadata/settings/assignments';
import {URL_PARAM_TYPES} from '../../../metadata/settings/constants';


import { DEFAULT_PAGING_DATA } from './constants';


const defaultState = {
	isLoading: false,

	companies: [],
	companiesMetadata: {},


	companyCategoryId: null,
	companySubcategoryId: null,

	suggestionInputValue: '',

	fuzzySearchCompanies: [],


	suggestionQueries: {},

	filters: {
		...DEFAULT_PAGING_DATA
	}
};

const companiesListReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_COMPANIES_START: {
			return { ...state, isLoading: true };
		}
		case LOAD_COMPANIES_ERROR: {
			return { ...state, isLoading: false };
		}
		case LOAD_COMPANIES_SUCCESS: {
			return {
				...state,
				companies: action.payload.companies,
				companiesMetadata: action.payload.metadata,
				isLoading: false
			};
		}

		case FUZZY_SEARCH_LOAD_COMPANIES_SUCCESS: {
			return {
				...state,
				fuzzySearchCompanies: action.payload
			};
		}

		case CLEAR_FUZZY_SEARCH_LOADED_COMPANIES: {
			return {
				...state,
				fuzzySearchCompanies: []
			};
		}

		case COMPANIES_SUGGESTION_INPUT_VALUE_CHANGE: {
			return {
				...state,
				suggestionInputValue: action.payload
			};
		}

		case COMPONENT_LEAVE: {
			return {
				...defaultState
			};
		}
















		case SET_DEFAULT_FILTERS_VALUES: {
			return {
				...state,
				filters: {
					...state.filters,
					...action.payload
				}
			};
		}

		case SUGGESTION_FILTER_CHANGE: {

			const filterName = action.payload.name;
			const filterDescription = FILTERS_CONFIGURATIONS[filterName];
			const dependentFiltersNames = filterDescription.dependentFiltersNames;

			let dependentCleanup = {};
			if (dependentFiltersNames) {
				const presentFilters = findFilters(state.companyCategoryId, state.companySubcategoryId);

				dependentCleanup = dependentFiltersNames.reduce((acc, name) => {

					if (presentFilters.find(filter => filter.name === name)) {
						acc[name] = FILTERS_CONFIGURATIONS[name].defaultValue;
					}

					return acc;
				}, {});
			}

			return {
				...state,

				filters: {
					...state.filters,
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
			const previousSelectedCheckboxes = state.filters[action.payload.name];

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
				filters: {
					...state.filters,
					[action.payload.name]: nextSelectedCheckboxes
				}
			};
		}

		case SWITCH_FILTER_CHANGE: {
			return {
				...state,
				filters: {
					...state.filters,
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

				filters: {
					...state.filters,
					...dynamicPathParams,
					...queryParams
				}
			};
		}

		case UPDATE_PAGINATION_DATA: {
			return {
				...state,
				filters: {
					...state.filters,
					page: action.payload
				}
			};
		}

		default: {
			return state;
		}
	}
};



function updateUrl(state, history) {

	const pathParams = [
		state.companyCategoryId,
		state.companySubcategoryId
	];
	const queryParams = {};

	const pathParamsFromFilter = [];

	// DIRTY. Accessing assignment here
	const assignmentFilters = findFilters(state.companyCategoryId, state.companySubcategoryId);

	Object.keys(state.filters).forEach(filterName => {
		const assignmentFiltersDescriptions = assignmentFilters.map(filter => FILTERS_CONFIGURATIONS[filter.name]);
		const filterDescription = assignmentFiltersDescriptions.find(filter => filter.name === filterName);

		// TODO: Refactor.
		if (filterDescription) {
			const urlParamConfig = filterDescription.urlParamConfig || {};

			switch (urlParamConfig.type) {
				case URL_PARAM_TYPES.PATH:
					pathParamsFromFilter.push({
						sort: urlParamConfig.sort,
						value: state.filters[filterName]
					});
					break;
				case URL_PARAM_TYPES.QUERY:
					queryParams[filterName] = state.filters[filterName];
					break;
				default:
					// Skip invisible parameter, do not add to url path
					break;
			}
		} else {
			queryParams[filterName] = state.filters[filterName];
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



export default companiesListReducer;
