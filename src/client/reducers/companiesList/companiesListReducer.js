import {
	LOAD_COMPANIES_START,
	LOAD_COMPANIES_SUCCESS,
	LOAD_COMPANIES_ERROR,
} from './../../actionCreators/companiesList/companiesList';

const defaultState = {
	companies: []
};

const companiesListReducer = (state = defaultState, action) => {
	switch (action.type) {

		case LOAD_COMPANIES_SUCCESS: {
			return {
				...state,
				companies: action.payload
			};
		}

		default: {
			return state;
		}
	}
};

export default companiesListReducer;