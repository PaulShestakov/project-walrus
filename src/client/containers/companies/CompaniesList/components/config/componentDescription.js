export default {
    checkbox: {
        subways: {
            name: 'subways',
            title: 'Метро',
            showMoreLabel: 'Все станции метро',
            numberOfItemsToShowDefault: 4,
            getItems: (props) => props.filterValues.subways.getValues(),
            //isVisible: props => props.filterValues.subways.isVisible,
            getSelectedIds: (props) => props.filter.selectedSubwaysIds,
        },
        breeds: {
            name: 'breeds',
            title: 'Породы',
            showMoreLabel: 'Все породы',
            numberOfItemsToShowDefault: 4,
            getItems: (props) => props.filterValues.breeds.getValues(),
            //isVisible: props => props.filterValues.breeds.isVisible,
            getSelectedIds: (props) => props.filter.selectedBreedsIds,
        },
        drugTypes: {
            name: 'drugTypes',
            title: 'Тип препарата',
            showMoreLabel: 'Все типы',
            numberOfItemsToShowDefault: 4,
            getItems: (props) => props.filterValues.drugTypes.getValues(),
            //isVisible: props => props.filterValues.drugTypes.isVisible,
            getSelectedIds: (props) => props.filter.selectedDrugTypesIds,
        },
        clinicsServices: {
            name: 'clinicsServices',
            title: 'Услуги',
            showMoreLabel: 'Все услуги',
            numberOfItemsToShowDefault: 4,
            getItems: (props) => props.filterValues.clinicsServices.getValues(),
            //isVisible: props => props.filterValues.clinicsServices.isVisible,
            getSelectedIds: (props) => props.filter.selectedClinicsServices,
        },
        torgTypes: {
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
            name: 'countries',
            title: 'Выбрать страну',
            //isVisible: props => props.filterValues.countries.isVisible,
            getItems: props => props.filterValues.countries.getValues(),
        },
        cities: {
            name: 'cities',
            title: 'Выбрать город',
            //isVisible: props => props.filterValues.cities.isVisible,
            getItems: props => props.filterValues.cities.getValues(),
        },
        animals: {
            name: 'animals',
            title: 'Выбрать животное',
            //isVisible: props => props.filterValues.countries.isVisible,
            getItems: props => props.filterValues.animals.getValues(),
        }
    },
};