import Util from "../../../util/Util";
import Queries from '../sql/Queries';
import async from 'async';

export default class WorkingTimes {
	static mapDayOfWeek = (item) => ({
		dayOfWeek: item.dayOfWeek,
		dayOfWeekName: item.dayOfWeekName,
		open: item.open,
		close: item.close,
	});

	static internalizeTime(workingTime) {
		return [
			workingTime.locationId,
			workingTime.day,
			workingTime.open,
			workingTime.close
		]
	}

	static saveWorkingTimes(allLocations, locationsWithIds) {

		return (connection, done) => {
			const times: Array<any> = allLocations.reduce((acc, item, index) => {
				if (item.workingTimes) {
					item.workingTimes.filter(i => i.open && i.close && i.day)
                        .forEach(time => {
							acc.push(WorkingTimes.internalizeTime({
								locationId: locationsWithIds[index][0],
								day: time.day,
								open: time.open,
								close: time.close,
							}));
						});
				}
				return acc;
			}, []);
			if (times.length > 0) {
				connection.query(Queries.SAVE_WORKING_TIMES, [times], done);
			} else {
				done(null, null);
			}
		};
	}

	static updateWorkingTimes = (workingTimes, locationId) => {

		let internalizedWorkingTimes = [];
		if (workingTimes) {
			internalizedWorkingTimes = workingTimes.map(time => {
				time.locationId = locationId;
				return WorkingTimes.internalizeTime(time);
			});
		}

		const deleteWorkingTimes = (connection, done) => {
			connection.query(Queries.DELETE_WORKING_TIMES_BY_LOCATION, [locationId], done);
		};

		const insertWorkingTimes = (connection, done) => {
			if (internalizedWorkingTimes.length > 0) {
				connection.query(Queries.SAVE_WORKING_TIMES, [internalizedWorkingTimes], done);
			} else {
				done(null, null);
			}
		};

		return (connection, done) => {
			const tasks = [deleteWorkingTimes, insertWorkingTimes].map(f => f.bind(null, connection));
			async.series(tasks, done);
		};
	}
}