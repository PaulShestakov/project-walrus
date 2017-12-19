import { FILTER_TYPE, URL_PARAM_TYPES } from './constants';


const filterDescriptions = {
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
	ownerTypes: {
		type: FILTER_TYPE.CHECKBOX_BLOCK,
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
		type: FILTER_TYPE.CHECKBOX_BLOCK,
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
		type: FILTER_TYPE.SUGGESTION,
		defaultValue: '',
		name: 'breedId',
		title: 'Выбрать породу',
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 0
		}
	},
	countryId: {
		type: FILTER_TYPE.SUGGESTION,
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
		type: FILTER_TYPE.SUGGESTION,
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
		type: FILTER_TYPE.SUGGESTION,
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



	isWorkingNow: {
		type: FILTER_TYPE.SWITCH,
		defaultValue: false,
		name: 'isWorkingNow',
		title: 'Работает сейчас',
		urlParamConfig: {
			type: URL_PARAM_TYPES.QUERY,
			sort: 100
		}
	}
};

export default filterDescriptions;

const filterNamesToExclude = [
	'breeds',
	'cities',
	'subways'
];

export function findDescriptions(filtersName) {
	return Object.values(filterDescriptions)
			.filter(description => filtersName.includes(description.name) && !filterNamesToExclude.includes(description.name));
}