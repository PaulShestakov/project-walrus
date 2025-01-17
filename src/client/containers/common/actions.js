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
					});
				}
			).then(json => {
				dispatch(loadPromoCodeValuesSuccess({
					animals: json.ANIMAL,
					cities: json.CITY,
				}));
			});
		}
	};
}

export const LOAD_COMPANIES_CODE_VALUES_SUCCESS = 'LOAD_COMPANIES_CODE_VALUES_SUCCESS';
export function loadCompaniesCodeValues() {

	function sortCompaniesCategories(categories) {
		const comparator = (a, b) => a.sort - b.sort;

		categories.forEach(category => {
			category.subcategories.sort(comparator);
		});
		categories.sort(comparator);

		return categories;
	}

	return (dispatch, getState) => {
		const { companiesCategories } = getState().common;

		if (!companiesCategories || companiesCategories.length === 0) {
			let codeValuesUrl = '/api/v1/codevalue?';
			['DAY_OF_WEEK', 'DRUGS_TYPE', 'CLINICS_SERVICES', 'TORG_TYPE', 'SPECIALIST_DIRECTION'].forEach(i => {
				codeValuesUrl += '&type[]=' + i;
			});
			const generalCodeValues = fetch(codeValuesUrl);
			const countiresCodeValues = fetch('/api/v1/codevalue/countries');
			const animalsCodeValues = fetch('/api/v1/codevalue/animals');
			const specificCodeValues = fetch('/api/v1/codevalue/companyCategories');

			Promise.all([generalCodeValues, animalsCodeValues, countiresCodeValues, specificCodeValues]).then(results => {
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
							animals: values[1],
							countries: values[2],
							categories: sortCompaniesCategories(values[3])
						}
					});
				});
			});
		}
	};
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
						};
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