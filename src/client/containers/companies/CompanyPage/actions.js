import { unauthorizedError } from '../../common/actions';

export const LOAD_COMPANY_START = 'companyPage/LOAD_COMPANY_START';
export const LOAD_COMPANY_ERROR = 'companyPage/LOAD_COMPANY_ERROR';
export const LOAD_COMPANY_SUCCESS = 'companyPage/LOAD_COMPANY_SUCCESS';
export function loadCompany(url_id) {
	return (dispatch) => {
		dispatch({
			type: LOAD_COMPANY_START
		});

		fetch('/api/v1/company/' + url_id).then(
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
				payload: {
					data: json
				}
			});
		}, error => {
			dispatch({
				type: LOAD_COMPANY_ERROR,
				error: true,
				payload: error
			});
		});

	};
}

export const POST_FEEDBACK_SUCCESS = 'companyPage/POST_FEEDBACK_SUCCESS';
export function postFeedback(feedback, history) {
	return (dispatch) => {

		fetch('/api/v1/company/' + feedback.companyId + '/feedback', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(feedback),
			credentials: 'include'
		}).then(
			response => {
				if (response.status === 401) {
					throw new Error();
				}
				if (response.ok) {
					return response.json();
				}
			},
			error => {
                
			}
		).then(json => {
			history.push(feedback.redirectUrl);
			dispatch(loadCompany(feedback.url_id, history));
		}).catch(error => {
			dispatch(unauthorizedError());
		});

	};
}

export const DELETE_FEEDBACK_SUCCESS = 'companyPage/DELETE_FEEDBACK_SUCCESS';
export function deleteFeedback(data, history) {
	return (dispatch) => {

		fetch('/api/v1/company/' + data.companyId + '/feedback/' + data.feedbackId, {
			method: 'DELETE',
			credentials: 'include'
		}).then(
			response => {
				if (response.ok) {
					return response.json();
				}
			},
			error => {
				//dispatch(loadPromoError())
			}
		).then(json => {
			history.push(data.redirectUrl);
			dispatch(loadCompany(data.url_id, history));
		});

	};
}

export const ON_COMPONENT_LEAVE = 'companyPage/ON_COMPONENT_LEAVE';
export const onComponentLeave = () => ({
	type: ON_COMPONENT_LEAVE
});
