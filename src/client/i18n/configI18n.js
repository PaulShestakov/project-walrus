import i18n from 'i18next';

export default function configI18n() {
	// Config i18n, keep in mind, that using this loader we
	// load all locales, regardless of whether we need them or not
	i18n.init({
		lng: 'ru',
		fallbackLng: false,
		// Have a common namespace used around the full app
		ns: ['common'],
		defaultNS: 'common',
		resources: require('i18next-resource-store-loader!./index.js')
	});

	return i18n;
};