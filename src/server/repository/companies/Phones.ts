import * as uuid from 'uuid';

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
}