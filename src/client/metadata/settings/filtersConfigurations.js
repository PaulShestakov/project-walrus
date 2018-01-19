import { FILTER_COMPONENT, URL_PARAM_TYPES } from './constants';


const FILTERS_CONFIGURATIONS = {
	subways: {
		component: FILTER_COMPONENT.CHECKBOX_BLOCK,
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
	drugsTypes: {
		component: FILTER_COMPONENT.CHECKBOX_BLOCK,
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
		component: FILTER_COMPONENT.CHECKBOX_BLOCK,
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
		component: FILTER_COMPONENT.CHECKBOX_BLOCK,
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
	ownerTypes: {
		component: FILTER_COMPONENT.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'ownerTypes',
		title: 'Тип владельца',
		showMoreLabel: 'Все типы',
		numberOfItemsToShowDefault: 2,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	jobTypes: {
		component: FILTER_COMPONENT.CHECKBOX_BLOCK,
		defaultValue: [],
		name: 'jobTypes',
		title: 'Виды объявлений',
		showMoreLabel: 'Все виды',
		numberOfItemsToShowDefault: 2,
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},


	breedId: {
		component: FILTER_COMPONENT.SUGGESTION,
		defaultValue: '',
		name: 'breedId',
		title: 'Выбрать породу',
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	countryId: {
		component: FILTER_COMPONENT.SUGGESTION,
		defaultValue: '',
		name: 'countryId',
		title: 'Выбрать страну',
		urlParamConfig: {
			type: URL_PARAM_TYPES.PATH,
			sort: 1
		},
		dependentFiltersNames: [
			'cityId', 'subways'
		]
	},
	cityId: {
		component: FILTER_COMPONENT.SUGGESTION,
		defaultValue: '',
		name: 'cityId',
		title: 'Выбрать город',
		urlParamConfig: {
			type: URL_PARAM_TYPES.PATH,
			sort: 2
		},
		dependentFiltersNames: [
			'subways'
		]
	},
	animalId: {
		component: FILTER_COMPONENT.SUGGESTION,
		defaultValue: '',
		name: 'animalId',
		title: 'Выбрать животное',
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		},
		dependentFiltersNames: [
			'breeds'
		]
	},


	_invisibleAppliedAnimalDog: {
		defaultValue: 'DOG',
		name: 'animalId',
	},
	_invisibleAppliedAnimalCat: {
		defaultValue: 'CAT',
		name: 'animalId',
	},
	_invisibleAppliedAnimalHorse: {
		defaultValue: 'HORSE',
		name: 'animalId',
	},
	_invisibleAppliedAnimalRodent: {
		defaultValue: 'RODENT',
		name: 'animalId',
	},


	isWorkingNow: {
		component: FILTER_COMPONENT.SWITCH,
		defaultValue: false,
		name: 'isWorkingNow',
		title: 'Работает сейчас',
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 100
		}
	}
};

export default FILTERS_CONFIGURATIONS;
