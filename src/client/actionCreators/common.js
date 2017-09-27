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



export const LOAD_COMPANIES_TYPES_START = 'LOAD_COMPANIES_TYPES_START';
export const LOAD_COMPANIES_TYPES_SUCCESS = 'LOAD_COMPANIES_TYPES_SUCCESS';
export const LOAD_COMPANIES_TYPES_ERROR = 'LOAD_COMPANIES_TYPES_ERROR';


const loadCompaniesTypesStart = () => {
	return {
		type: LOAD_COMPANIES_TYPES_START,
		isFetching: true
	};
};
const loadCompaniesTypesSuccess = (data) => {
	return {
		type: LOAD_COMPANIES_TYPES_SUCCESS,
		payload: data,
		isFetching: false
	};
};
const loadCompaniesTypesError = (error) => {
	return {
		type: LOAD_COMPANIES_TYPES_ERROR,
		payload: error,
		isFetching: false
	};
};

export function loadCompanyCategories() {
	return (dispatch, getState) => {
		const { common } = getState();

		if (!common.companiesTypesLoaded) {
			dispatch(loadCompaniesTypesStart());

			fetch('/api/v1/codevalue/companyCategories').then(
				response => {
					if (response.ok) {
						return response.json();
					}
				},
				error => {
					dispatch(loadCompaniesTypesError())
				}
			).then(json => {
				dispatch(loadCompaniesTypesSuccess(json));
			});
		}
	}
}


export const LOAD_COMPANIES_CODE_VALUES_START = 'LOAD_COMPANIES_CODE_VALUES_START';
export const LOAD_COMPANIES_CODE_VALUES_SUCCESS = 'LOAD_COMPANIES_CODE_VALUES_SUCCESS';
export const LOAD_COMPANIES_CODE_VALUES_ERROR = 'LOAD_COMPANIES_CODE_VALUES_ERROR';


const loadCompaniesCodeValuesStart = () => {
	return {
		type: LOAD_COMPANIES_CODE_VALUES_START,
		isFetching: true
	};
};
const loadCompaniesCodeValuesSuccess = (data) => {
	return {
		type: LOAD_COMPANIES_CODE_VALUES_SUCCESS,
		payload: data,
		isFetching: false
	};
};
const loadCompaniesCodeValuesError = (error) => {
	return {
		type: LOAD_COMPANIES_CODE_VALUES_ERROR,
		payload: error,
		isFetching: false
	};
};

export function loadCompaniesCodeValues() {
	return (dispatch, getState) => {
		const { common } = getState();

		if (!common.citiesAreLoaded) {
			dispatch(loadCompaniesCodeValuesStart());

			fetch('/api/v1/codevalue?type=CITY').then(
				response => {
					if (response.ok) {
						return response.json();
					}
				},
				error => {
					dispatch(loadCompaniesCodeValuesError())
				}
			).then(json => {
				dispatch(loadCompaniesCodeValuesSuccess({
					cities: json.CITY,
				}));

			});
		}
	}
}