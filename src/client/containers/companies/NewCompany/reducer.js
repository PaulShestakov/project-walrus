import {
    POST_COMPANY_SUCCESS,
	LOAD_COMPANY_SUCCESS
} from './actions';


const defaultCompany = {
    name: '',
    locations: [],
	imageObjects: []
};

const defaultState = {
    company: defaultCompany
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
			}
		}

        default: {
            return state;
        }
    }
};

export default newCompanyReducer;