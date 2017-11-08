import * as uuid from 'uuid';
import Queries from "./sql/Queries";
import * as _ from 'lodash';
import Util from "../../util/Util";
import Phones from "./Phones";
import WorkingTimes from "./WorkingTimes";
import async from 'async';

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

	internalizeLocation(companyId, location)


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

					const externalIds = [];
					if (locations) {
						externalIds = locations.map(item => item.locationId);
					}

					let selectedIds = [];
					if (result) {
						selectedIds = result.map(res => (res.locId));
					}

					let idsToDelete = _.difference(selectedIds, externalIds);
					let locationsToUpdate = [];
					let locationsToCreate = [];

					locations.forEach(location => {
						if (location.locationId) {
							locationsToUpdate.push({
								updateBody: Locations.internalizeLocationToObject(companyId, location),
								locationId: location.locationId
							});
						} else {
							locationsToCreate.push(Locations.internalizeLocationToArray(companyId, location));
						}
					});


					const tasks = [];

					if (idsToDelete.length > 0) {
						const deleteLocations = (connection, done) => {
							connection.query(Queries.DELETE_LOCATIONS, idsToDelete, done);
						};
						tasks.push(deleteLocations);
					}

					if (locationsToUpdate.length > 0) {
						const tasksForUpdate = locationsToUpdate.map(location => {
							return (connection, done) => {
								connection.query(Queries.UPDATE_LOCATION, [location.updateBody, location.locationId], done);
							};
						});

						tasks.push(...tasksForUpdate);
					}


					if (locationsToCreate.length > 0) {
						const tasksForCreate = locationsToCreate.map(location => {
							return (connection, done) => {
								connection.query(Queries.SAVE_LOCATION, [[location]], done);
							};
						});

						tasks.push(...tasksForCreate);
					}

					if (locations.length > 0) {

						const updateDependenciesTasks = [];
						locations.forEach(location => {
							if (location.phones && location.phones.length > 0) {
								updateDependenciesTasks.push(
									Phones.updatePhones(location.phones, location.locationId)
								);
							}

							if (location.workingTimes && location.workingTimes.length > 0) {
								updateDependenciesTasks.push(
									WorkingTimes.updateWorkingTimes(location.workingTimes, location.locationId)
								);
							}
						});

						tasks.push(...updateDependenciesTasks);
					}

					async.series(tasks.map(task => task.bind(null, connection)), done);
				}
			});
		}
	}
}