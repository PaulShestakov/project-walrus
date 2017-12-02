import {
	POST_COMPANY_SUCCESS,
	LOAD_COMPANY_SUCCESS,
	RESET_FORM_STATE,
	UPDATE_COMPANY_SUCCESS
} from './actions';

const defaultState = {
	company: {
		name: '',
		locations: [],
		imageObjects: []
	}
};

const newCompanyReducer = (state = defaultState, action) => {
	switch (action.type) {

	case POST_COMPANY_SUCCESS: {
		action.history.push('/company/overview');
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
			company: {
				name: '',
				locations: [],
				imageObjects: []
			}
		};
	}

	default: {
		return state;
	}
	}
};

export default newCompanyReducer;