import fetch from 'isomorphic-fetch';

export const POST_COMPANY_SUCCESS = 'newCompany/POST_COMPANY_SUCCESS';
export const POST_COMPANY_FAILURE = 'newCompany/POST_COMPANY_FAILURE';

const baseUrl = '/api/v1';

const saveCompanyFailed = (error) => ({
    type: POST_COMPANY_FAILURE,
    error: error
});

const saveCompanySuccess = (response) => ({
    type: POST_COMPANY_SUCCESS,
    response
});

export function postCompany(values, history) {

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
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
            },
            error => {
				throw Error(error);
            }
        ).then(json => {
            history.push("/company/" + json.uuid);
            dispatch(saveCompanySuccess(json));
        }).catch(error => {
            dispatch(saveCompanyFailed(error))
        })
    };
}



export const LOAD_COMPANY_START = 'newCompany/LOAD_COMPANY_START';
export const LOAD_COMPANY_ERROR = 'newCompany/LOAD_COMPANY_ERROR';
export const LOAD_COMPANY_SUCCESS = 'newCompany/LOAD_COMPANY_SUCCESS';

const loadCompanyStart = () => ({
	type: LOAD_COMPANY_START
});
const loadCompanyError = (error) => ({
	type: LOAD_COMPANY_ERROR,
	error: true,
	payload: error
});
const loadCompanySuccess = (data) => ({
	type: LOAD_COMPANY_SUCCESS,
	payload: data
});

export function loadCompany(companyId) {
	return (dispatch) => {
		dispatch(loadCompanyStart());

		fetch(baseUrl + '/company/' + companyId).then(
			response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			},
			error => {
				throw Error(error);
			}
		).then(json => {
			dispatch(loadCompanySuccess(json));
		}).catch(error => {
			dispatch(loadCompanyError(error));
		})
	}
}



export const UPDATE_COMPANY_START = 'newCompany/UPDATE_COMPANY_START';
export const UPDATE_COMPANY_ERROR = 'newCompany/UPDATE_COMPANY_ERROR';
export const UPDATE_COMPANY_SUCCESS = 'newCompany/UPDATE_COMPANY_SUCCESS';

const updateCompanyStart = () => ({
	type: LOAD_COMPANY_START
});
const updateCompanyError = (error) => ({
	type: LOAD_COMPANY_ERROR,
	error: true,
	payload: error
});
const updateCompanySuccess = (data) => ({
	type: LOAD_COMPANY_SUCCESS
});

export function updateCompany(companyId, company, history) {
	return (dispatch) => {
		dispatch(updateCompanyStart());

		const formData = new FormData();
		formData.append('company', JSON.stringify(company));
		if (company.image) {
			formData.append('image', company.image)
		}

		fetch(baseUrl + '/company/' + companyId, {
			method: 'PUT',
			body: formData,
			credentials: 'include'
		}).then(
			response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			},
			error => {
				throw Error(error);
			}
		).then(json => {
			history.push("/company/" + json.uuid);
			dispatch(updateCompanySuccess(json));
		}).catch(error => {
			dispatch(updateCompanyError(error))
		})
	}
}
