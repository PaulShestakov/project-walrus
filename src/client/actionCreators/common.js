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

		if (!common.promoCodeValuesLoaded) {
			dispatch(loadPromoCodeValuesStart());

			fetch('/api/v1/codevalue/promo').then(
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
					animals: json.animals.map(mapCodeValue),
					cities: json.cities.map(mapCodeValue)
				}));
			});
		}
	}
}

function mapCodeValue(codevalue) {
	return {
		value: codevalue.id,
		label: codevalue.name
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

			fetch('/api/v1/codevalue/companiesCategories').then(
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