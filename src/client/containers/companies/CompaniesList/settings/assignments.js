const FILTERS = {
	COUNTRY: {
		name: 'countryId',
		component: 'suggestion',
		sort: 0
	},
	CITY: {
		name: 'cityId',
		component: 'suggestion',
		sort: 0
	},
	SUBWAYS: {
		name: 'subways',
		component: 'checkbox',
		sort: 0
	},
	TORG_TYPES: {
		name: 'torgTypes',
		component: 'checkbox',
		sort: 0
	},
	DRUGS_TYPES: {
		name: 'drugsTypes',
		component: 'checkbox',
		sort: 0
	},
	CLINICS_SERVICES: {
		name: 'clinicsServices',
		component: 'checkbox',
		sort: 0
	},
	ANIMALS: {
		name: 'animals',
		component: 'suggestion',
		sort: 0
	},
	BREEDS: {
		name: 'breeds',
		component: 'checkbox',
		sort: 0
	},
	JOB_TYPES: {
		name: 'jobTypes',
		component: 'checkbox',
		sort: 0
	},
	OWNER_TYPES: {
		name: 'ownerTypes',
		component: 'checkbox',
		sort: 0
	},
	WORKING_NOW: {
		name: 'isWorkingNow',
		component: 'switch',
		sort: 100
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
			'services_behaviour_correction',
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
			'other_poisk_raboty'
		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
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
			'goods_acsessuary',
			'services_fitness',
			'services_usyplenie',
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
			FILTERS.ANIMALS,
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
			FILTERS.ANIMALS,
			FILTERS.WORKING_NOW
		]
	},

	{
		categories: [],
		subcategories: [
			'pets_dog_nurseries',
			'pets_cat_nurseries',
			'pets_horse_nurseries',
			'pets_rodent_nurseries',

		],
		filters: [
			FILTERS.COUNTRY,
			FILTERS.CITY,
			FILTERS.BREEDS, // SELECT CONTROL!!!
			FILTERS.OWNER_TYPES
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
			FILTERS.ANIMALS,
			FILTERS.BREEDS,
		]
	}
];


export function findFilters(category, subCategory) {
	const filterByCategory = filters.find(filter => filter.categories.includes(category.toLowerCase()));
	const filterBySubCat = filters.find(filter => filter.subcategories.includes(subCategory.toLowerCase()));
	const result =
		filterBySubCat ?
			filterBySubCat.filters :
			filterByCategory ?
				filterByCategory.filters :
				[];

	return result.sort((filterA, filterB) => filterA.sort - filterB.sort);
}