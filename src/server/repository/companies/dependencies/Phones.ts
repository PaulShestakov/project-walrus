import * as uuid from 'uuid';
import Queries from '../sql/Queries';
import async from 'async';

export default class Phones {
	static mapPhone = (item) => ({
		phoneId: item.phoneId,
		phone: item.phone
	});

	static internalizePhone(phone) {
		return [
			uuid(),
			phone.locationId,
			phone.phone
		];
	}

	static savePhones(allLocations, locationsWithIds) {
		const phones: Array<object> = allLocations.reduce((acc, item: any, index) => {
			if (item.phones) {
				item.phones.forEach(phone => {
					acc.push(Phones.internalizePhone({
						locationId: locationsWithIds[index][0],
						phone: phone.phone,
					}));
				});
			}
			return acc;
		}, []);

		return (connection, done) => {
			if (phones.length > 0) {
				connection.query(Queries.SAVE_PHONES, [phones], done);
			} else {
				done(null, null);
			}
		}
	}

	static updatePhones = (phones, locationId) => {

		let internalizedPhones = [];
		if (phones) {
			internalizedPhones = phones.map(phone => {
				phone.locationId = locationId;
				return Phones.internalizePhone(phone);
			});
		}

		const deletePhones = (connection, done) => {
			connection.query(Queries.DELETE_PHONES_BY_LOCATION, [locationId], done);
		};

		const insertPhones = (connection, done) => {
			if (internalizedPhones.length > 0) {
				connection.query(Queries.SAVE_PHONES, [internalizedPhones], done);
			} else {
				done(null, null);
			}
		};

		return (connection, done) => {
			const tasks = [deletePhones, insertPhones].map(f => f.bind(null, connection));
			async.series(tasks, done);
		};
	}
}