
export const COMPANIES_LIST_ADD_SUBWAY = 'COMPANIES_LIST_ADD_SUBWAY';
export const COMPANIES_LIST_REMOVE_SUBWAY = 'COMPANIES_LIST_REMOVE_SUBWAY';
export const addSubway = (subwayId) => {
    return {
        type: COMPANIES_LIST_ADD_SUBWAY,
        payload: subwayId
    };
};
export const removeSubway = (subwayId) => {
    return {
        type: COMPANIES_LIST_REMOVE_SUBWAY,
        payload: subwayId
    };
};

export const COMPANIES_LIST_ADD_BREED = 'COMPANIES_LIST_ADD_BREED';
export const COMPANIES_LIST_REMOVE_BREED = 'COMPANIES_LIST_REMOVE_BREED';
export const addBreed = (breedId) => {
    return {
        type: COMPANIES_LIST_ADD_BREED,
        payload: breedId
    };
};
export const removeBreed = (breedId) => {
    return {
        type: COMPANIES_LIST_REMOVE_BREED,
        payload: breedId
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