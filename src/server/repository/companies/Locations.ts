import * as uuid from 'uuid';
import Queries from "./sql/Queries";

export default class Locations {
	static mapLocation(item) {
		return {
			locationId: item.locationId,
			url_id: item.locUrlId,
			subwayId: item.subwayId,
			cityId: item.cityId,
			cityName: item.cityName,
			address: item.address,
			isMain: item.isMain,
			position: {
				lat: item.lat,
				lng: item.lng,
			}
		}
	}

	static internalizeLocationToArray(companyId, location) {
		return [
			uuid(),
			location.url_id,
			location.subway,
			companyId,
			location.city,
			location.address || 'Не задано',
			location.location ? location.location.lat : 0,
			location.location ? location.location.lng : 0,
			!!location.isMain,
			null,
			null
		]
	}

	static internalizeLocationToObject(companyId, location) {
		return {
			SUBWAY_ID: location.subway,
			URL_ID: location.url_id,
			COMPANY_ID: companyId,
			CITY_ID: location.city,
			ADDRESS: location.address,
			LAT: location.location.lat,
			LNG: location.location.lng,
		}
	}

	static internalizeLocation(companyId, location) {
		if (location.locationId) {
			return Locations.internalizeLocationToObject(companyId, location);
		} else {
			return Locations.internalizeLocationToArray(companyId, location);
		}
	}

	static getLocationsUpdater(locations, locationsIds) {
		return (connection, done) => {
			if (locations.length > 0) {
				Promise.all(
					locations.map((location, index) => {
						return new Promise((resolve, reject) => {
							const locationId = locationsIds[index];
							if (locationId) {
								connection.query(Queries.UPDATE_LOCATION, [location, locationId], (error, result) => {
									if (error) {
										reject(error);
									} else {
										resolve(result);
									}
								});
							} else {
								connection.query(Queries.SAVE_LOCATION, [[location]], (error, result) => {
									if (error) {
										console.log(error);
										reject(error);
									} else {
										resolve(result);
									}
								});
							}
						})
					})
				).then((results) => {
					done(null, results);
				})
			} else {
				done(null, null);
			}
		}
	}
}