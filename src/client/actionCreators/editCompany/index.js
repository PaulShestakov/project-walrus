export const LOAD_COMPANY_START = 'editCompany/LOAD_COMPANY_START';
export const LOAD_COMPANY_ERROR = 'editCompany/LOAD_COMPANY_ERROR';
export const LOAD_COMPANY_SUCCESS = 'editCompany/LOAD_COMPANY_SUCCESS';

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

		fetch('/api/v1/company/' + companyId).then(
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