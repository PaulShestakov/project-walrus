


export const COMPANIES_LIST_SET_IS_WORKING_NOW = 'COMPANIES_LIST_SET_IS_WORKING_NOW';
export const setIsWorkingNow = (data) => {
	return {
		type: COMPANIES_LIST_SET_IS_WORKING_NOW,
		payload: data
	};
};


export const COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE = 'COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE';
export const updateUrlWithStateSource = (history) => {
	return {
		type: COMPANIES_LIST_UPDATE_URL_WITH_STATE_SOURCE,
		payload: history
	};
};

export const COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE = 'COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE';
export const updateStateWithUrlSource = (staticPathParams, dynamicPathParams, searchParams) => {
	return {
		type: COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE,
		payload: {
			staticPathParams,
			dynamicPathParams,
			searchParams
		}
	};
};



export const SETUP_INITIAL_FILTER_STATE = 'companiesList/SETUP_INITIAL_FILTER_STATE';
export const setupInitialFilterState = (filters) => {

	const defaultState = filters.reduce((acc, filter) => {
		acc[filter.name] = filter.defaultValue;
		return acc;
	}, {});

	return {
		type: SETUP_INITIAL_FILTER_STATE,
		payload: defaultState
	};
};



export const SUGGESTION_FILTER_CHANGE = 'companiesList/SUGGESTION_FILTER_CHANGE';
export const suggestionFilterChange = (name, value) => {
	return {
		type: SUGGESTION_FILTER_CHANGE,
		payload: {
			name,
			value
		}
	};
};


export const CHECKBOXES_BLOCK_FILTER_CHANGE = 'companiesList/CHECKBOXES_BLOCK_FILTER_CHANGE';
export const checkboxesBlockFilterChange = (name, value, isChecked) => {
	return {
		type: CHECKBOXES_BLOCK_FILTER_CHANGE,
		payload: {
			name,
			value,
			isChecked
		}
	};
};

export const SUGGESTION_SEARCH = 'companiesList/SUGGESTION_SEARCH';
export const handleSuggestionSearch = (name, searchQuery) => {
	return {
		type: SUGGESTION_SEARCH,
		payload: {
			name,
			searchQuery
		}
	};
};

//
// export const SUGGESTION_FILTER_CHANGE = 'companiesList/FILTER_CHANGE';
// export const filterChange = (component, config) => {
//
// 	switch(component) {
// 		case 'suggestion':
// 		case 'switch': {
// 			return {
// 				type: FILTER_CHANGE,
// 				payload: {
// 					name: config.name,
// 					value: config.newValue
// 				}
// 			};
// 		}
// 		case 'checkbox': {
// 			return {
// 				type: FILTER_CHANGE,
// 				payload: {
// 					type: config.type,
// 					value: config.newValue
// 				}
// 			};
// 		}
// 	}
// };