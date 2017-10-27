export const LOAD_PROMO_CODE_VALUES_START = 'LOAD_PROMO_CODE_VALUES_START';
export const LOAD_PROMO_CODE_VALUES_SUCCESS = 'LOAD_PROMO_CODE_VALUES_SUCCESS';
export const LOAD_PROMO_CODE_VALUES_ERROR = 'LOAD_PROMO_CODE_VALUES_ERROR';
export const UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR';

export const unauthorizedError = () => {
	return {
		type: UNAUTHORIZED_ERROR
	};
};

const loadPromoCodeValuesSuccess = (data) => {
	return {
		type: LOAD_PROMO_CODE_VALUES_SUCCESS,
		payload: data,
		isFetching: false
	};
};

export function loadPromoCodeValues() {
	return (dispatch, getState) => {
		const { common } = getState();

		if (!common.animalsAreLoaded || !common.citiesAreLoaded) {
			dispatch({
				type: LOAD_PROMO_CODE_VALUES_START,
				isFetching: true
			});

			fetch('/api/v1/codevalue?type=ANIMAL&type=CITY').then(
				response => {
					if (response.ok) {
						return response.json();
					}
				},
				error => {
					dispatch({
						type: LOAD_PROMO_CODE_VALUES_ERROR,
						payload: error,
						isFetching: false
					})
				}
			).then(json => {
				dispatch(loadPromoCodeValuesSuccess({
					animals: json.ANIMAL,
					cities: json.CITY,
				}));
			});
		}
	}
}

export const LOAD_COMPANIES_CODE_VALUES_SUCCESS = 'LOAD_COMPANIES_CODE_VALUES_SUCCESS';
export function loadCompaniesCodeValues() {

	function sortCompaniesCategories(categories) {
		const comparator = (a, b) => a.sort - b.sort;

		categories.forEach(category => {
			category.subcategories.sort(comparator)
		});
		categories.sort(comparator);

		return categories;
	}

	return (dispatch, getState) => {
		const { companiesCategories } = getState().common;

		if (!companiesCategories || companiesCategories.length === 0) {
			const generalCodeValues = fetch('/api/v1/codevalue?type=DAY_OF_WEEK');
			const citiesCodeValues = fetch('/api/v1/codevalue/cities');
			const specificCodeValues = fetch('/api/v1/codevalue/companyCategories');

			Promise.all([generalCodeValues, citiesCodeValues, specificCodeValues]).then(results => {
				return results.map(result => {
					if (result.ok) {
						return result.json();
					}
				});
			}).then(results => {
				Promise.all(results).then(values => {
					dispatch({
						type: LOAD_COMPANIES_CODE_VALUES_SUCCESS,
						payload: {
							...values[0],
							cities: values[1],
							categories: sortCompaniesCategories(values[2])
						}
					});
				});
			});
		}
	}
}

export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export function loadUserInfo() {
	return (dispatch, getState) => {
		const { user } = getState();
		if (!user) {
			fetch('/api/v1/user/me',{
				method: 'GET',
				credentials: 'include'
			}).then(
				response => {
					if (response.status > 400) {
						return {
							role: 5
						}
					} else if (response.ok) {
						return response.json();
					}
				},
				error => {
					//user is not authorized or token has expired
				}
			).then(json => {
				dispatch({
					type: LOAD_USER_INFO_SUCCESS,
					payload: json
				});
			});
		}
	};
}

export const CLOSE_UNAUTHORIZED_DIALOG = 'CLOSE_UNAUTHORIZED_DIALOG';
export function closeUnauthorizedDialog() {
	return (dispatch) => {
		dispatch({
			type: CLOSE_UNAUTHORIZED_DIALOG
		});
	};
}