export default {
	checkbox: {
		subways: {
			defaultValue: [],
			name: 'subways',
			title: 'Метро',
			showMoreLabel: 'Все станции метро',
			numberOfItemsToShowDefault: 4,
			getItems: (props) => props.filterValues.subways.getValues(),
			//isVisible: props => props.filterValues.subways.isVisible,
			getSelectedIds: (props) => props.filter.selectedSubwaysIds,
		},
		breeds: {
			defaultValue: [],
			name: 'breeds',
			title: 'Породы',
			showMoreLabel: 'Все породы',
			numberOfItemsToShowDefault: 4,
			getItems: (props) => props.filterValues.breeds.getValues(),
			//isVisible: props => props.filterValues.breeds.isVisible,
			getSelectedIds: (props) => props.filter.selectedBreedsIds,
		},
		drugsTypes: {
			defaultValue: [],
			name: 'drugsTypes',
			title: 'Тип препарата',
			showMoreLabel: 'Все типы',
			numberOfItemsToShowDefault: 4,
			getItems: (props) => props.filterValues.drugTypes.getValues(),
			//isVisible: props => props.filterValues.drugTypes.isVisible,
			getSelectedIds: (props) => props.filter.selectedDrugTypesIds,
		},
		clinicsServices: {
			defaultValue: [],
			name: 'clinicsServices',
			title: 'Услуги',
			showMoreLabel: 'Все услуги',
			numberOfItemsToShowDefault: 4,
			getItems: (props) => props.filterValues.clinicsServices.getValues(),
			//isVisible: props => props.filterValues.clinicsServices.isVisible,
			getSelectedIds: (props) => props.filter.selectedClinicsServices,
		},
		torgTypes: {
			defaultValue: [],
			name: 'torgTypes',
			title: 'Торговые площадки',
			showMoreLabel: 'Все торговые площадки',
			numberOfItemsToShowDefault: 2,
			getItems: (props) => props.filterValues.torgTypes.getValues(),
			//isVisible: props => props.filterValues.clinicsServices.isVisible,
			getSelectedIds: (props) => props.filter.selectedTorgTypes,
		}
	},
	suggestion: {
		countries: {
			defaultValue: '',
			name: 'countries',
			title: 'Выбрать страну',
			//isVisible: props => props.filterValues.countries.isVisible,
			getItems: props => props.filterValues.countries.getValues(),
		},
		cities: {
			defaultValue: '',
			name: 'cities',
			title: 'Выбрать город',
			//isVisible: props => props.filterValues.cities.isVisible,
			getItems: props => props.filterValues.cities.getValues(),
		},
		animals: {
			defaultValue: '',
			name: 'animals',
			title: 'Выбрать животное',
			//isVisible: props => props.filterValues.countries.isVisible,
			getItems: props => props.filterValues.animals.getValues(),
		}
	},
	switch: {
		isWorkingNow: {
			defaultValue: false,
			name: 'isWorkingNow',
			title: 'Режим работы',
		}
	}
};