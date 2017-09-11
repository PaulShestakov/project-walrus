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

function loadPromoCodeValues() {
	return (dispatch, getState) => {
		const { common } = getState();

		if (!common.promoCodeValues.dataLoaded) {
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
					cities: json.cities.map(mapCodeValue),
					dataLoaded: true
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

export {loadPromoCodeValues};