
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
			`${workingTime.from}:00:00`,
			`${workingTime.to}:00:00`
		]
	}
}