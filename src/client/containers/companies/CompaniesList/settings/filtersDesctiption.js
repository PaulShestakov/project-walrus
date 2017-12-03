const URL_PARAM_TYPES = {
	PATH: 1,
	QUERY: 2
};

const FILTER_TYPE = {
	CHECKBOX_BLOCK: 1,
	SUGGESTION: 2,
	SWITCH: 3
};

export default {

	subways: {
		type: FILTER_TYPE.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'subways',
		title: 'Метро',
		showMoreLabel: 'Все станции метро',
		numberOfItemsToShowDefault: 4,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	breeds: {
		type: FILTER_TYPE.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'breeds',
		title: 'Породы',
		showMoreLabel: 'Все породы',
		numberOfItemsToShowDefault: 4,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	drugsTypes: {
		type: FILTER_TYPE.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'drugsTypes',
		title: 'Тип препарата',
		showMoreLabel: 'Все типы',
		numberOfItemsToShowDefault: 4,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	clinicsServices: {
		type: FILTER_TYPE.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'clinicsServices',
		title: 'Услуги',
		showMoreLabel: 'Все услуги',
		numberOfItemsToShowDefault: 4,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	torgTypes: {
		type: FILTER_TYPE.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'torgTypes',
		title: 'Торговые площадки',
		showMoreLabel: 'Все торговые площадки',
		numberOfItemsToShowDefault: 2,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},



	country: {
		type: FILTER_TYPE.SUGGESTION,
		defaultValue: '',
		name: 'country',
		title: 'Выбрать страну',
		urlParamConfig: {
			type: URL_PARAM_TYPES.PATH,
			sort: 1
		},
		dependentFiltersNames: [
			'city', 'subways'
		]
	},
	city: {
		type: FILTER_TYPE.SUGGESTION,
		defaultValue: '',
		name: 'city',
		title: 'Выбрать город',
		urlParamConfig: {
			type: URL_PARAM_TYPES.PATH,
			sort: 2
		},
		dependentFiltersNames: [
			'subways'
		]
	},
	animals: {
		type: FILTER_TYPE.SUGGESTION,
		defaultValue: '',
		name: 'animals',
		title: 'Выбрать животное',
		urlParamConfig: {
			type: URL_PARAM_TYPES.PATH,
			sort: 3
		}
	},



	isWorkingNow: {
		type: FILTER_TYPE.SWITCH,
		defaultValue: false,
		name: 'isWorkingNow',
		title: 'Режим работы',
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	}
}