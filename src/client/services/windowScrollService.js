import ObserverService from './observerService';

export const SCROLL_EVENT = 'SCROLL_EVENT';

class WindowScrollService extends ObserverService {
	constructor(props) {
		super(props);

		this._events = [SCROLL_EVENT];

		window.addEventListener('scroll', (event) => {
			this.notifyAll(SCROLL_EVENT, event);
		}, {
			passive: true
		});
	}

	// Public methods
	scrollToTop(useAnimation = true) {
		const config = {
			top: 0
		};

		if (useAnimation) {
			config.behavior = 'smooth';
		}

		window.scroll(config);
	}
}

export default new WindowScrollService();
