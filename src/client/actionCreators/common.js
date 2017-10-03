export const LOAD_PROMO_CODE_VALUES_START = 'LOAD_PROMO_CODE_VALUES_START';
export const LOAD_PROMO_CODE_VALUES_SUCCESS = 'LOAD_PROMO_CODE_VALUES_SUCCESS';
export const LOAD_PROMO_CODE_VALUES_ERROR = 'LOAD_PROMO_CODE_VALUES_ERROR';


const loadPromoCodeValuesStart = () => {
	return {
		type: LOAD_PROMO_CODE_VALUES_START,
		isFetching: true
	};
};
const loadPromoCodeValuesSuccess = (data) => {
	return {
		type: LOAD_PROMO_CODE_VALUES_SUCCESS,
		payload: data,
		isFetching: false
	};
};
const loadPromoCodeValuesError = (error) => {
	return {
		type: LOAD_PROMO_CODE_VALUES_ERROR,
		payload: error,
		isFetching: false
	};
};

export function loadPromoCodeValues() {
	return (dispatch, getState) => {
		const { common } = getState();

		if (!common.animalsAreLoaded || !common.citiesAreLoaded) {
			dispatch(loadPromoCodeValuesStart());

			fetch('/api/v1/codevalue?type=ANIMAL&type=CITY').then(
				response => {
					if (response.ok) {
						return response.json();
					}
				},
				error => {
					dispatch(loadPromoCodeValuesError())
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
			const generalCodeValues = fetch('/api/v1/codevalue?type=CITY&type=SUBWAY.MINSK&type=DAY_OF_WEEK');
			const specificCodeValues = fetch('/api/v1/codevalue/companyCategories');

			Promise.all([generalCodeValues, specificCodeValues]).then(results => {
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
							categories: sortCompaniesCategories(values[1])
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
					if (response.ok) {
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