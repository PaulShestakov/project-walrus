import {
    POST_COMPANY_SUCCESS
} from '../../actionCreators/newCompany/index';

const defaultState = {
    company: {}
};

const newCompanyReducer = (state = defaultState, action) => {
    switch (action.type) {

        case POST_COMPANY_SUCCESS: {
            return {
                ...state,
                postCompanySuccess: true
            }
        }

        default: {
            return state;
        }
    }
};

export default newCompanyReducer;