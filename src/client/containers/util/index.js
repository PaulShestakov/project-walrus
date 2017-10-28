export default class Util {
	static objectToUrlQuery(object) {
		const wrapQueryParam = (name, param) => `${name}=${param}&`;

		const baseUrl = '?';

		const urlQuery = Object.keys(object).reduce((acc, key) => {

			const property = object[key];

			if (property === null || property === undefined) {
				// Skip
			}
			else if (Array.isArray(property)) {

				if (property.length > 0) {
					acc += property.map(wrapQueryParam.bind(null, key + '[]')).join('');
				}
				else {
					// Skip
				}
			}
			else {
				acc += wrapQueryParam(key, property);
			}
			return acc;

		}, '');

		return (baseUrl + urlQuery).slice(0, -1);
	}


	static searchParamsToObject(searchParams) {
		let object = {};

		for (let param of searchParams) {
			let key = param[0];
			let value = param[1];

			const arrayItemMatch = key.match(/(.*)\[.*\]/);

			// Test for array item
			if (arrayItemMatch) {
				const arrayName = arrayItemMatch[1];

				if (object[arrayName]) {
					object[arrayName].push(value);
				} else {
					object[arrayName] = [value];
				}
			} else {

				object[key] = value;
			}
		}
		return object;
	}

	static ensureArray(item) {
		return Array.isArray(item) ? item : (item ? [item] : []);
	}
}