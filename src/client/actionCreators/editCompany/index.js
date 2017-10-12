export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const LOAD_FEEDBACKS_SUCCESS = 'LOAD_FEEDBACKS_SUCCESS';
export const POST_FEEDBACK_SUCCESS = 'POST_FEEDBACK_SUCCESS';

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
			dispatch({
				type: LOAD_COMPANY_SUCCESS,
				payload: json,
				isFetching: false
			});
		});

	}
}