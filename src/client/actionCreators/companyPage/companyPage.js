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
                if (response.ok) {
                    return response.json();
                }
            },
            error => {
                dispatch(loadFeedbacks(feedback.companyId, history));
            }
        ).then(json => {
            //dispatch({});
        });

    }
}

export function loadFeedbacks(companyId, history) {
    return (dispatch) => {

        fetch('/api/v1/company/' + companyId + '/feedback').then(
            response => {
                if (response.ok) {
                    return response.json();
                }
            },
            error => {
                //dispatch(loadPromoError())
            }
        ).then(json => {
			history.push('/company/' + companyId + '/feedbacks');
            dispatch({
                type: LOAD_FEEDBACKS_SUCCESS,
                payload: json
            });
        });

    }
}