import * as uuid from 'uuid';
import Queries from "./sql/Queries";
import * as _ from 'lodash';
import Util from "../../util/Util";
import Phones from "./Phones";
import WorkingTimes from "./WorkingTimes";

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
			IS_MAIN: !!location.isMain,
			CITY_ID: location.city,
			ADDRESS: location.address || 'Не задано',
			LAT: location.location ? location.location.lat : 0,
			LNG: location.location ? location.location.lng : 0,
		}
	}

	static internalizeLocation(companyId, location) {
		if (location.locationId) {
			return Locations.internalizeLocationToObject(companyId, location);
		} else {
			return Locations.internalizeLocationToArray(companyId, location);
		}
	}

	static saveLocations(locations) {
		return (connection, done) => {
			if (locations.length > 0) {
				connection.query(Queries.SAVE_LOCATION, [locations], done);
			} else {
				done(null, null);
			}
		};
	}

	static updateLocations(locations, companyId) {
		return (connection, done) => {
			connection.query(Queries.SELECT_LOCATIONS_FOR_COMPANY, [companyId], (error, result) => {
				if (error) {
					done(error);
				} else {
					const externalIds = locations.map(item => (item.locationId));
					let selectedIds = [];
					let idsToDelete = [];
					const promisesToExecute = [];

					if (result) {
						selectedIds = result.map(res => (res.locId));
						idsToDelete = _.difference(selectedIds, externalIds);
						if (idsToDelete.length > 0) {
							const deleteLocations = new Promise((resolve, reject) => {
								connection.query(Queries.DELETE_LOCATIONS, idsToDelete, Util.resolvePromise(resolve, reject));
							});
							promisesToExecute.push(deleteLocations);
						}
					}

					const updateLocations = new Promise((resolve, reject) => {
						const internalizedLocations = locations
							.filter(i => !idsToDelete.includes(i.locationId))
							.map(Locations.internalizeLocation.bind(null, companyId));

						const idsToUpdate = _.difference(externalIds, idsToDelete);
						const locUpdater = Locations.getLocationsUpdater(internalizedLocations, idsToUpdate);

						// update/insert locations
						locUpdater(connection, (error) => {
							if (error) {
								reject(error);
							} else {
								// update/insert phones and working times
								locations.forEach((location, index) => {
									const locId = location.locationId || internalizedLocations[index][0];
									Phones.updatePhones(location.phones, locId)(connection, Util.resolvePromise(resolve, reject));
									WorkingTimes.updateWorkingTimes(location.workingTimes, locId)(connection, Util.resolvePromise(resolve, reject));
								});
							}
						});
					});
					if (selectedIds.length !== idsToDelete.length) {
						promisesToExecute.push(updateLocations);
					}
					Promise.all(promisesToExecute).then((results) => done(null, results));
				}
			});
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
								connection.query(Queries.UPDATE_LOCATION, [location, locationId], Util.resolvePromise(resolve, reject));
							} else {
								connection.query(Queries.SAVE_LOCATION, [[location]], Util.resolvePromise(resolve, reject));
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