const defaultFilters = [
	{
		name: 'countryId',
		component: 'suggestion',
		sort: 0
	},
	{
		name: 'cityId',
		component: 'suggestion',
		sort: 0
	},
	{
		name: 'subways',
		component: 'checkbox',
		sort: 0
	},
];

const defaultWithWorking = [
	...defaultFilters,
	{
		name: 'isWorkingNow',
		component: 'switch',
		sort: 100
	},
];

const defaultWithWorkingAndTorg = [
	...defaultWithWorking,
	{
		name: 'torgTypes',
		component: 'checkbox',
		sort: 0
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
				component: 'checkbox',
				sort: 0
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
				component: 'checkbox',
				sort: 0
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
				component: 'suggestion',
				sort: 0
			},
			{
				name: 'breeds',
				component: 'checkbox',
				sort: 0
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
				component: 'checkbox',
				sort: 0
			},
		]
	},
];

export default filters;

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