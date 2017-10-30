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

	static saveLocations(locations, connection, done) {
		connection.query(Queries.SAVE_LOCATION, [locations], done);
	}
}