import {
    LOAD_COMPANY_SUCCESS,
    LOAD_FEEDBACKS_SUCCESS
} from './actions';

const defaultState = {
    company: {},
    feedbacks: []
};

const companyPageReducer = (state = defaultState, action) => {
    switch (action.type) {

        case LOAD_COMPANY_SUCCESS: {
            return {
                ...state,
                company: action.payload
            }
        }

        case LOAD_FEEDBACKS_SUCCESS: {
            return {
                ...state,
                feedbacks: action.payload
            }
        }

        default: {
            return state;
        }
    }
};

export default companyPageReducer;