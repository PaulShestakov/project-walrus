export const COMPANIES_LIST_ADD_CITY = 'COMPANIES_LIST_ADD_CITY';
export const COMPANIES_LIST_REMOVE_CITY = 'COMPANIES_LIST_REMOVE_CITY';

export const addCity = (cityId) => {
	return {
		type: COMPANIES_LIST_ADD_CITY,
		payload: cityId
	};
};
export const removeCity = (cityId) => {
	return {
		type: COMPANIES_LIST_REMOVE_CITY,
		payload: cityId
	};
};

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

export const updateStateWithUrlSource = (searchParams) => {
	return {
		type: COMPANIES_LIST_UPDATE_FILTER_STATE_WITH_URL_SOURCE,
		payload: searchParams
	}
};