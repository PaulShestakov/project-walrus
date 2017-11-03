import * as uuid from 'uuid';
import Queries from "./sql/Queries";


export default class Locations {
	static mapLocation(item) {
		return {
			locationId: item.locationId,
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

	static internalizeLocation(companyId, location) {
		return [
			uuid(),
			location.subway,
			companyId,
			location.city,
			location.address || 'Не задано',
			location.location ? location.location.lat : 0,
			location.location ? location.location.lng : 0,
			!!location.isMain,
			null,
			null,
		]
	}

	static internalizeLocationToObject(companyId, location) {
		return {
			SUBWAY_ID: location.subway,
			COMPANY_ID: companyId,
			CITY_ID: location.city,
			ADDRESS: location.address,
			LAT: location.location.lat,
			LNG: location.location.lng,
		}
	}

	static getLocationsUpdater(locations, locationsIds) {
		return (connection, done) => {
			if (locations.length > 0) {
				Promise.all(
					locations.map((location, index) => {
						return new Promise((resolve, reject) => {
							connection.query(Queries.UPDATE_LOCATION, [location, locationsIds[index]], (error, result) => {
								if (error) {
									reject(error);
								} else {
									resolve(result);
								}

							});
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