import fetch from 'isomorphic-fetch';

export const POST_COMPANY_SUCCESS = 'NewCompany/POST_COMPANY_SUCCESS';
export const POST_COMPANY_FAILURE = 'NewCompany/POST_COMPANY_FAILURE';

const baseUrl = '/api/v1';

const saveCompanyFailed = (error) => ({
    type: POST_COMPANY_FAILURE,
    error: error
});

const saveCompanySuccess = (response) => ({
    type: POST_COMPANY_SUCCESS,
    response
});

export function postCompany(company, history) {
    const formData = externalizeCompany(company);

    return dispatch => {
        fetch(baseUrl + '/company', {
            method: 'POST',
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
            dispatch(saveCompanySuccess(json));
        }).catch(error => {
            dispatch(saveCompanyFailed(error))
        })
    };
}



export const LOAD_COMPANY_START = 'NewCompany/LOAD_COMPANY_START';
export const LOAD_COMPANY_ERROR = 'NewCompany/LOAD_COMPANY_ERROR';
export const LOAD_COMPANY_SUCCESS = 'NewCompany/LOAD_COMPANY_SUCCESS';

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
	return (dispatch, getState) => {
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



export const UPDATE_COMPANY_START = 'NewCompany/UPDATE_COMPANY_START';
export const UPDATE_COMPANY_ERROR = 'NewCompany/UPDATE_COMPANY_ERROR';
export const UPDATE_COMPANY_SUCCESS = 'NewCompany/UPDATE_COMPANY_SUCCESS';

const updateCompanyStart = () => ({
	type: UPDATE_COMPANY_START
});
const updateCompanyError = (error) => ({
	type: UPDATE_COMPANY_ERROR,
	error: true,
	payload: error
});
const updateCompanySuccess = (data) => ({
	type: UPDATE_COMPANY_SUCCESS
});

export function updateCompany(companyId, company, history) {
	return (dispatch) => {
		dispatch(updateCompanyStart());

		const formData = externalizeCompany(company);

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

function externalizeCompany(company) {
	const files = [];
	const externalizedCompany = {...company};
	if (externalizedCompany.locations) {
        externalizedCompany.locations = externalizedCompany.locations.map(location => {
            return {
				locationId: location.locationId,
                location: location.markers[0].position,
                city: location.cityId.value,
                subway: location.subwayId ? location.subwayId.value : null,
                isMain: location.isMain,
                address: location.address,
                phones: location.phones,
                workingTimes: location.workingTimes,
            };
        });
	}

	if (externalizedCompany.animals) {
        externalizedCompany.animals = externalizedCompany.animals.map(animal => {
			return {
				animalId: animal.animalId,
				breedId: animal.breedId,
			}
        });
	}

	if (company.imageObjects.length > 0) {
		const file = company.imageObjects[0].file;

		if (file) {
			files.push(file);
		}
	}

	delete externalizedCompany.imageObjects;

	const formData = new FormData();
	formData.append('company', JSON.stringify(externalizedCompany));

	files.forEach(file => {
		formData.append('image', file);
	});


	return formData;
}

export const RESET_FORM_STATE = 'RESET_FORM_STATE';
export const resetFormState = () => ({
	type: RESET_FORM_STATE
});