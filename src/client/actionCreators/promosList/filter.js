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

export const onFilterChange = (filterGroup, value) => {
	return {
		type: FILTER_CHANGE,
		filterGroup,
		value
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
		fetch("/api/v1/codevalue/promo/breed?animal=" + animalId).then(
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
		id: breed.id,
		name: breed.name,
		isSelected: false
	}
}