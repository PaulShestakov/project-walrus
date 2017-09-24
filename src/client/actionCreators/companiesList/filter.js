export const SET_ANIMAL = 'SET_ANIMAL';
export const SET_PROMO_TYPE = 'SET_PROMO_TYPE';
export const ADD_BREED = 'ADD_BREED';
export const REMOVE_BREED = 'REMOVE_BREED';
export const ADD_CITY = 'ADD_CITY';
export const REMOVE_CITY = 'REMOVE_CITY';

export const setAnimal = (animalId, label) => {
	return {
		type: SET_ANIMAL,
		payload: {
			animalId,
			label
		}
	};
};
export const setPromoType = (promoTypeId) => {
	return {
		type: SET_PROMO_TYPE,
		payload: promoTypeId
	};
};
export const addBreed = (breedId) => {
	return {
		type: ADD_BREED,
		payload: breedId
	};
};
export const removeBreed = (breedId) => {
	return {
		type: REMOVE_BREED,
		payload: breedId
	};
};
export const addCity = (cityId) => {
	return {
		type: ADD_CITY,
		payload: cityId
	};
};
export const removeCity = (cityId) => {
	return {
		type: REMOVE_CITY,
		payload: cityId
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