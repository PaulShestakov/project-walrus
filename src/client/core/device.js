class Device {
	constructor() {

		this.ua = navigator.userAgent.toLowerCase();
		this.np = navigator.platform.toLowerCase();

		this.touch  = typeof(window.ontouchstart) != 'undefined';
		this.mobile  = typeof(window.orientation) != 'undefined';

		this.desktop = !this.mobile;

		this.iphone = ( /ip(hone|od)/.test(this.np) );
		this.ipad   = ( /ipad/.test(this.np) );
		this.ios    = ( this.ipad || this.iphone || this.np.indexOf('mac') > -1 );

		this.firefox = this.ua.indexOf('firefox') > -1;
		this.chrome  = this.ua.indexOf('chrome') > -1;
		this.safari = this.ua.indexOf('safari') > -1;
		this.ie = ( /(msie|trident)/.test(this.ua) );
		this.edge = (/edge/.test(this.ua));
	}
}

export default new Device();
