
import {
	ANIMAL_SELECTED,
	FILTER_CHANGE,
	LOAD_BREEDS_SUCCESS
} from './../../actionCreators/promosList/filter';

const defaultState = {
	selectedAnimal: {
		id: 'ALL',
		label: 'Все'
	},
	selectedCities: [],
	selectedBreedsId: [],
	priceFrom: null,
	priceTo: null
};


const filterReducer = (state = defaultState, action) => {
	switch (action.type) {

		case ANIMAL_SELECTED:
			return {
				...state,
				selectedAnimal: {
					id: action.id,
					label: action.label
				}
			};

		case FILTER_CHANGE: {

			switch (action.filterGroup) {
				case 'breed': {
					return {
						...state
					}
				}
				default: {
					return state;
				}
			}
		}

		case LOAD_BREEDS_SUCCESS:
			return {
				...state,
				breeds: action.payload
			};
		default: {
			return state;
		}
	}
};

export default filterReducer;