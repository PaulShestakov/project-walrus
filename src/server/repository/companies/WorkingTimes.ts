import Util from "../../util/Util";
import Queries from './sql/Queries';

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

	static updateWorkingTimes(workingTimes, locationId) {
		return (connection, done) => {
			const deleteWorkingTimes = new Promise((resolve, reject) => {
				connection.query(Queries.DELETE_WORKING_TIMES_BY_LOCATION, [locationId], Util.resolvePromise(resolve, reject));
			});
			const insertWorkingTimes = new Promise((resolve, reject) => {
				if (workingTimes && workingTimes.length > 0) {
					const internalizedWorkingTimes = workingTimes.map(time => {
						time.locationId = locationId;
						return WorkingTimes.internalizeTime(time);
					});
					connection.query(Queries.SAVE_WORKING_TIMES, [internalizedWorkingTimes], Util.resolvePromise(resolve, reject));
				} else {
					resolve(null);
				}
			});
			Promise.all([deleteWorkingTimes, insertWorkingTimes]).then((results) => done(null, results));
		};
	}
}