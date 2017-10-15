import fetch from 'isomorphic-fetch';

export const POST_COMPANY_SUCCESS = 'POST_COMPANY_SUCCESS';
export const POST_COMPANY_FAILURE = 'POST_COMPANY_FAILURE';

const baseUrl = '/api/v1';

const saveCompanyFailed = (error) => ({
    type: POST_COMPANY_FAILURE,
    error: error
});

const saveCompanySuccess = (response) => ({
    type: POST_COMPANY_SUCCESS,
    response
});

const postCompany = (values, history) => {

    let form = new FormData();
    form.append('company', JSON.stringify(values));
    if (values.image) {
        form.append('image', values.image)
    }

    return dispatch => {

        fetch(baseUrl + '/company', {
            method: 'POST',
            body: form,
            credentials: 'include'
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error('Network response was not ok.');
                }
            },
            error => {
                console.log('An error occurred.', error);
            }
        ).then(json => {
            history.push("/company/overview");
            dispatch(saveCompanySuccess(json));
        }).catch(error => {
            dispatch(saveCompanyFailed(error))
        })
    };
};

export { postCompany };