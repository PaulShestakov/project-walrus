import {
	LOAD_COMPANY_START,
	LOAD_COMPANY_ERROR,
	LOAD_COMPANY_SUCCESS,
	ON_COMPONENT_LEAVE
} from './actions';

const defaultState = {
	isLoading: true,
	company: {
		locations: [],
	},
};

const companyPageReducer = (state = defaultState, action) => {
	switch (action.type) {

	case LOAD_COMPANY_START: {
		return {
			...state,
			isLoading: true
		};
	}
	case LOAD_COMPANY_ERROR: {
		return {
			...state,
			isLoading: false
		};
	}
	case LOAD_COMPANY_SUCCESS: {
		return {
			...state,
			company: action.payload.data,
			isLoading: false
		};
	}

	case ON_COMPONENT_LEAVE: {
		return {
			...state,
			...defaultState
		};
	}

	// case LOAD_FEEDBACKS_SUCCESS: {
	//     return {
	//         ...state,
	//         feedbacks: action.payload
	//     }
	// }

	default: {
		return state;
	}
	}
};

export default companyPageReducer;
