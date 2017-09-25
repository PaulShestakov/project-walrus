import {
    LOAD_COMPANY_SUCCESS
} from './../../actionCreators/companyPage/companyPage';

const defaultState = {
    company: {}
};

const companyPageReducer = (state = defaultState, action) => {
    switch (action.type) {

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

export default companyPageReducer;