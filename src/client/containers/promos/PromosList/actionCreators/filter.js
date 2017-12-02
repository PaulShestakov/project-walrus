export const ANIMAL_SELECTED = 'ANIMAL_SELECTED';
export const FILTER_CHANGE = 'FILTER_CHANGE';
export const LOAD_BREEDS_SUCCESS = 'LOAD_BREEDS_SUCCESS';



export const onAnimalSelected = (animalId, label) => {
	return {
		type: ANIMAL_SELECTED,
		animalId,
		label
	};
};

export const onFilterChange = (filterGroup, value, checked) => {
	return {
		type: FILTER_CHANGE,
		filterGroup,
		value,
		checked
	};
};


export const loadBreedsSuccess = (data) => {
	return {
		type: LOAD_BREEDS_SUCCESS,
		payload: data,
		isFetching: false
	};
};
export const loadBreeds = (animalId) => {
	return dispatch => {
		fetch('/api/v1/codevalue/breed?animal=' + animalId).then(
			response => {
				if (response.ok) {
					return response.json();
				}
			},
			error => {
				console.log('An error occured.', error);
			}
		).then(json => {
			dispatch(loadBreedsSuccess(json.map(mapBreed)));
		});
	};
};
function mapBreed(breed) {
	return {
		value: breed.id,
		label: breed.name
	};
}



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



export const UPDATE_URL_WITH_STATE_SOURCE = 'UPDATE_URL_WITH_STATE_SOURCE';

export const updateUrlWithStateSource = (history) => {
	return {
		type: UPDATE_URL_WITH_STATE_SOURCE,
		payload: history
	};
};



export const UPDATE_FILTER_STATE_WITH_URL_SOURCE = 'UPDATE_FILTER_STATE_WITH_URL_SOURCE';

export const updateFilterStateWithUrlSource = (searchParams) => {
	return {
		type: UPDATE_FILTER_STATE_WITH_URL_SOURCE,
		payload: searchParams
	};
};