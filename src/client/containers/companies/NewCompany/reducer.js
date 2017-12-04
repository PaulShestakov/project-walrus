import {
	POST_COMPANY_SUCCESS,
	LOAD_COMPANY_SUCCESS,
	RESET_FORM_STATE,
	UPDATE_COMPANY_SUCCESS
} from './actions';

const defaultState = {
	company: {
		name: '',
		extensions: [],
		locations: [],
		imageObjects: []
	}
};

const newCompanyReducer = (state = defaultState, action) => {
	switch (action.type) {

	case POST_COMPANY_SUCCESS: {
		return state;
	}

	case LOAD_COMPANY_SUCCESS: {
		return {
			...state,
			company: action.payload
		};
	}

	case UPDATE_COMPANY_SUCCESS: {
		return state;
	}
        
	case RESET_FORM_STATE: {
		return {
			company: defaultState.company
		};
	}

	default: {
		return state;
	}
	}
};

export default newCompanyReducer;