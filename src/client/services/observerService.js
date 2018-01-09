export default class ObserverService {
	constructor() {
		// Override in descendant(list of events's used for validation)
		this._events = [];

		this._handlers = {};
	}

	subscribe(event, callback) {
		if (this._handlers[event]) {
			this._handlers[event].push(callback);
		} else {
			this._handlers[event] = [callback];
		}

	}

	unSubscribe(event, callback) {
		const index = this._handlers[event].indexOf(callback);

		if (index > -1) {
			this._handlers[event].slice(index, 1);
		}
	}

	notifyAll(event, ...data) {
		if (this._handlers[event] && this._handlers[event].length > 0) {
			this._handlers[event].forEach(callback => callback.apply(null, data));
		}
	}
}
