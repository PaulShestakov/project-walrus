export const FILTERS = {
	COUNTRY: {
		name: 'countryId',
		sort: 0
	},
	CITY: {
		name: 'cityId',
		sort: 0
	},
	SUBWAYS: {
		name: 'subways',
		sort: 0
	},
	TORG_TYPES: {
		name: 'torgTypes',
		sort: 0
	},
	DRUGS_TYPES: {
		name: 'drugsTypes',
		sort: 0
	},
	CLINICS_SERVICES: {
		name: 'clinicsServices',
		sort: 0
	},
	ANIMAL: {
		name: 'animalId',
		sort: 0
	},
	BREED: {
		name: 'breedId',
		sort: 0
	},
	JOB_TYPES: {
		name: 'jobTypes',
		sort: 0
	},
	OWNER_TYPES: {
		name: 'ownerTypes',
		sort: 0
	},
	WORKING_NOW: {
		name: 'isWorkingNow',
		sort: 100
	},

	_INVISIBLE_APPLIED_ANIMAL_DOG: {
		name: '_invisibleAppliedAnimalDog',
	},
	_INVISIBLE_APPLIED_ANIMAL_CAT: {
		name: '_invisibleAppliedAnimalCat',
	},
	_INVISIBLE_APPLIED_ANIMAL_HORSE: {
		name: '_invisibleAppliedAnimalHorse',
	},
	_INVISIBLE_APPLIED_ANIMAL_RODENT: {
		name: '_invisibleAppliedAnimalRodent',
	},
};


const filters = [
	{
		categories: [],
		subcategories: [],
		filters: [
			FILTERS.COUNTRY
		]
	},

	{
		categories: [],
		subcategories: [
			'goods_kulinaria',

			'services_sportivnaua_dressirovka',
			'services_zoo_photography',

			'pets_clubs_dogs',
			'pets_clubs_cats',
			'pets_clubs_other',
			'pets_communities',

			'other_international_organisations',
			'other_training'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
		]
	},

	{
		categories: [],
		subcategories: [
			'health_specialists',
			'goods_ruchnie_tovary',
			'services_walking',
			'services_training',
			'services_handling'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS
		]
	},

	{
		categories: [],
		subcategories: [
			'services_zoo_taxi',
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.WORKING_NOW
		]
	},

	{
		categories: [],
		subcategories: [
			'health_drugs'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.DRUGS_TYPES
		]
	},

	{
		categories: [],
		subcategories: [
			'other_work'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS,
			FILTERS.JOB_TYPES
		]
	},

	{
		categories: [],
		subcategories: [
			'health_clinics'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS,
			FILTERS.WORKING_NOW,
			FILTERS.CLINICS_SERVICES
		]
	},

	{
		categories: [
			'opt'
		],
		subcategories: [
			'health_stations',
			'health_emergency_help',
			'services_fitness',
			'services_ritualnie_uslugi',
			'services_photostudii',
			'services_zoo_studio',
			'services_pets_friendly_institutions'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS,
			FILTERS.WORKING_NOW
		]
	},

	{
		categories: [],
		subcategories: [
			'health_vet_pharmacies',
			'goods_zoo_shops',
			'goods_clothing_shops',
			'goods_furniture_and_acsessuary',
			'goods_oborudovanie_fitness',
			'goods_pitanie_dobavki',
			'goods_professional_sredstva',

		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS,
			FILTERS.WORKING_NOW,
			FILTERS.TORG_TYPES
		]
	},

	{
		categories: [],
		subcategories: [
			'services_grooming',

		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS,
			FILTERS.ANIMAL,
			FILTERS.WORKING_NOW
		]
	},

	{
		categories: [],
		subcategories: [
			'services_zoo_hotels',

		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.SUBWAYS,
			FILTERS.ANIMAL,
			FILTERS.WORKING_NOW
		]
	},

	{
		categories: [],
		subcategories: [
			'pets_dog_nurseries',
		],
		filters: [
			FILTERS.COUNTRY, FILTERS.CITY, FILTERS.BREED, FILTERS._INVISIBLE_APPLIED_ANIMAL_DOG
		]
	},
	{
		categories: [],
		subcategories: [
			'pets_cat_nurseries',
		],
		filters: [
			FILTERS.COUNTRY, FILTERS.CITY, FILTERS.BREED, FILTERS._INVISIBLE_APPLIED_ANIMAL_CAT
		]
	},
	{
		categories: [],
		subcategories: [
			'pets_horse_nurseries',
		],
		filters: [
			FILTERS.COUNTRY, FILTERS.CITY, FILTERS.BREED, FILTERS._INVISIBLE_APPLIED_ANIMAL_HORSE
		]
	},
	{
		categories: [],
		subcategories: [
			'pets_rodent_nurseries',
		],
		filters: [
			FILTERS.COUNTRY, FILTERS.CITY, FILTERS.BREED, FILTERS._INVISIBLE_APPLIED_ANIMAL_RODENT
		]
	},

	{
		categories: [],
		subcategories: [
			'pets_zoo_binding',
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.ANIMAL,
			FILTERS.BREED,
		]
	}
];


export function findFilters(category, subCategory) {
	let result;
	let filterBySubCat = {};
	if (subCategory) {
		filterBySubCat = filters.find(filter => filter.subcategories.includes(subCategory.toLowerCase()));
	}

	if (filterBySubCat && filterBySubCat.filters) {
		result = filterBySubCat.filters;
	} else {
		let filterByCategory = {};
		if (category) {
			filterByCategory = filters.find(filter => filter.categories.includes(category.toLowerCase()));
		}

		if (filterByCategory && filterByCategory.filters) {
			result = filterByCategory.filters;
		} else {
			result = [];
		}
	}

	return result.sort((filterA, filterB) => filterA.sort - filterB.sort);
}
