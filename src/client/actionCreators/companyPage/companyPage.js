export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';


const loadCompanySuccess = (data) => ({
    type: LOAD_COMPANY_SUCCESS,
    payload: data,
    isFetching: false
});

export function loadCompany(companyId) {
    return (dispatch) => {

        fetch('/api/v1/company/' + companyId).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            },
            error => {
                //dispatch(loadPromoError())
            }
        ).then(json => {
            dispatch(loadCompanySuccess(json));
        });

    }
}