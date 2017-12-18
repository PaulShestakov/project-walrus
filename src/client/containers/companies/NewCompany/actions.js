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
			history.goBack();
			dispatch(saveCompanySuccess(json));
		}).catch(error => {
			dispatch(saveCompanyFailed(error));
		});
	};
}



export const LOAD_COMPANY_START = 'NewCompany/LOAD_COMPANY_START';
export const LOAD_COMPANY_ERROR = 'NewCompany/LOAD_COMPANY_ERROR';
export const LOAD_COMPANY_SUCCESS = 'NewCompany/LOAD_COMPANY_SUCCESS';

const loadCompanyStart = () => ({
	type: LOAD_COMPANY_START
});

export function loadCompany(url_id) {
	return (dispatch) => {
		dispatch(loadCompanyStart());

		fetch(baseUrl + '/company/' + url_id).then(
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
			dispatch({
				type: LOAD_COMPANY_SUCCESS,
				payload: json
			});
		}).catch(error => {
			dispatch({
				type: LOAD_COMPANY_ERROR,
				error: true,
				payload: error
			});
		});
	};
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
			history.goBack();
			dispatch(updateCompanySuccess(json));
		}).catch(error => {
			dispatch(updateCompanyError(error));
		});
	};
}

function externalizeCompany(company) {
	const files = [];
	const externalizedCompany = {
		...company,
		drugsTypes: [],
		clinicsServices: [],
		torgTypes: [],
		ownerTypes: [],
		jobTypes: []
	};

	if (externalizedCompany.locations) {
		externalizedCompany.locations = externalizedCompany.locations.map(location => {
        	let markers = location.markers;
        	let position = null;
        	if (markers && markers.length > 0) {
				position = markers[0].position;
			}
			return {
				locationId: location.locationId,
				location: position,
				url_id: location.url_id,
				country: location.countryId ? location.countryId.value : null,
				city: location.cityId ? location.cityId.value : null,
				subway: location.subwayId ? location.subwayId.value : null,
				isMain: location.isMain,
				address: location.address,
				phones: location.phones,
				workingTimes: location.workingTimes.filter(wt => wt.dayOfWeek && wt.open && wt.close).map(wt => ({
                	day: wt.dayOfWeek.value,
					open: wt.open,
					close: wt.close,
				})),
			};
		});
	}

	if (externalizedCompany.animals) {
		externalizedCompany.animals = externalizedCompany.animals.filter(i => i.animalId).map(animal => {
			return {
				animalId: animal.animalId ? animal.animalId.value : null,
				breedId: animal.breedId ? animal.breedId.value : null,
			};
		});
	}

	if (externalizedCompany.extensions) {
		externalizedCompany.extensions.forEach(ext => {
			externalizedCompany[ext.name] = ext.childs.map(ch => ch.item.value);
		});
		delete externalizedCompany.extensions;
	}

	if (company.imageObjects && company.imageObjects.length > 0) {
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