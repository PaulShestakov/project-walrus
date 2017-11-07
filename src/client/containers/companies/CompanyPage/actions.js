import { unauthorizedError } from '../../common/actions';

export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const POST_FEEDBACK_SUCCESS = 'POST_FEEDBACK_SUCCESS';
export const DELETE_FEEDBACK_SUCCESS = 'DELETE_FEEDBACK_SUCCESS';

export function loadCompany(url_id) {
    return (dispatch) => {

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
                payload: json,
                isFetching: false
            });
        });

    }
}

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

    }
}

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

    }
}