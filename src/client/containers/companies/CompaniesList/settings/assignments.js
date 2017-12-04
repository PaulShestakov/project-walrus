const defaultFilters = [
	{
		name: 'countryId',
		component: 'suggestion'
	},
	{
		name: 'cityId',
		component: 'suggestion'
	},
	{
		name: 'subways',
		component: 'checkbox'
	},
];

const defaultWithWorking = [
	...defaultFilters,
	{
		name: 'isWorkingNow',
		component: 'workingNow'
	},
];

const defaultWithWorkingAndTorg = [
	...defaultWithWorking,
	{
		name: 'torgTypes',
		component: 'checkbox'
	}
];

const filters = [
	{
		categories: [],
		subcategories: [
			'health_stations',
			'health_emergency_help',
			'goods_acsessuary',
			'goods_acsessuary',
			'services_zoo_taxi',
			'services_pets_friendly_institutions'
		],
		filters: defaultWithWorking
	},
	{
		categories: [
			'opt',
			'other'
		],
		subcategories: [
			'goods_kulinaria',
			'services_walking',
			'services_training',
			'services_behaviour_correction',
			'services_fitness',
			'services_handling',
			'services_usyplenie',
			'services_zoo_photography',
			'services_zoo_studio',
		],
		filters: defaultFilters
	},
	{
		categories: [],
		subcategories: [
			'health_vet_pharmacies',
			'goods_zoo_shops',
			'goods_clothing_shops',
			'goods_furniture_and_acsessuary',
			'goods_pitanie_dobavki',
			'goods_oborudovanie_fitness',
			'goods_professional_sredstva',
			'goods_ruchnie_tovary',
		],
		filters: defaultWithWorkingAndTorg
	},
	{
		categories: [],
		subcategories: [
			'health_drugs'
		],
		filters: [
			...defaultFilters,
			{
				name: 'drugsTypes',
				component: 'checkbox'
			}
		],
	},
	{
		categories: [],
		subcategories: [
			'health_clinics'
		],
		filters: [
			...defaultFilters,
			{
				name: 'clinicsServices',
				component: 'checkbox'
			}
		]
	},
	{
		categories: [],
		subcategories: [
			'services_grooming',
			'services_zoo_hotels'
		],
		filters: [
			...defaultFilters,
			{
				name: 'animals',
				component: 'suggestion'
			},
			{
				name: 'breeds',
				component: 'checkbox'
			},
		]
	},
	{
		categories: [
			'pets'
		],
		subcategories: [],
		filters: [
			...defaultFilters,
			{
				name: 'breeds',
				component: 'checkbox'
			},
		]
	},
];

export default filters;

export function findFilters(category, subCategory) {
	const filterByCategory = filters.find(filter => filter.categories.includes(category.toLowerCase()));
	const filterBySubCat = filters.find(filter => filter.subcategories.includes(subCategory.toLowerCase()));
	return filterBySubCat ? filterBySubCat.filters : filterByCategory ? filterByCategory.filters : [];
}