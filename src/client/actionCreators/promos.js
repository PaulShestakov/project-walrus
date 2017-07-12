import fetch from 'isomorphic-fetch';

export const REQUEST_PROMOS = 'REQUEST_PROMOS';

const baseUrl = '/api/v1';

export const requestPromos = () => {
	return {
		type: REQUEST_PROMOS,
	};
};
