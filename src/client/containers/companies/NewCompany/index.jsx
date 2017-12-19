import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import withErrorHandling from '../../../components/decorators/withErrorHandling';

import {postCompany, updateCompany, loadCompany, resetFormState, removeLocation} from './actions';

import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';

import { Dropdown, Button, Title, Input, Grid, ReduxFormsImageUploader, TextField, Tabs, Tab, Card, Map, ConfirmDialog } from 'components';

import styles from './styles';
import {Typography} from 'material-ui';

import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import Location from './components/Location';
import Animals from './components/Animals';
import { extendCodeValues } from '../selectors';

import {getFormValues} from 'redux-form';
import Extensions from './components/Extensions';

import { findFilters, FILTERS } from '../CompaniesList/settings/assignments';
import { findDescriptions } from '../CompaniesList/settings/filtersDescription';
import { FILTER_TYPE } from '../CompaniesList/settings/constants';


@translate(['common'])
@withStyles(styles)
@reduxForm({form: 'company', enableReinitialize: true})
@withErrorHandling()
class NewCompanyContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subcategories: [],
			selectedAddress: 0,
			showConfirm: false,
			required: value => (value ? undefined : 'Поле обязательно для заполнения')
		};
	}

	componentDidMount() {
	    const { editMode, match, loadCompany } = this.props;
		if (editMode) {
			loadCompany(match.params.url_id);
		}
	}
    
	componentWillReceiveProps(nextProps) {
		this.setState({
			categories: nextProps.common.companiesCategories,
			cities: nextProps.common.cities,
		});
	}

	componentWillUnmount() {
		this.props.resetFormState();
	}

	handleCategoryChange = (selectedCategory) => {
		const category = this.props.common.companiesCategories.find((category) => {
			return category.value === selectedCategory.value;
		});
		this.props.change('subcategoryId', null);
		this.props.change('animals', []);
		this.props.change('extensions', calculateExtensions(selectedCategory, null));
		this.setState({
			subcategories: category.subcategories,
		});
	};

	handleSubcategoryChange = (subCategory) => {
		this.props.change('animals', []);
		this.props.change('extensions', calculateExtensions(this.props.selectedCategory, subCategory.value));
	};

	onCancelPressed = () => {
		this.props.history.goBack();
	};

	openConfirmDialog = () => {
		this.setState({ showConfirm: true });
	};

	saveAction = (values) => {
		const { history, editMode, match, updateCompany, postCompany, initialValues } = this.props;
		if (editMode) {
			values.companyId = initialValues.companyId;
			updateCompany(match.params.url_id, values, history);
		} else {
			postCompany(values, history);
		}
	};

	render() {
		const { t, common, handleSubmit, workingTimes, subcategories, formLocations, extensions,
			selectedCategory, selectedSubCategory } = this.props;

		return (
			<form className="d-flex-column align-items-center my-3">
				<Card raised={true}>
					<Grid container={true} justify="center" spacing={24}>

						<Grid item={true} xs={11}>
							<Typography type="headline" component="h1" className="mt-4">
                                Основная информация
							</Typography>
						</Grid>

						<Grid item={true} xs={11}>
							<Title>Название</Title>
							<Field name="name"
								component={Input}
								fullWidth={true}
								validate={this.state.required}
								placeholder="Название компании" />
						</Grid>
						<Grid item={true} xs={11}>
							<Title>Имя в поисковой строке</Title>
							<Field name="url_id"
								component={Input}
								fullWidth={true}
								validate={this.state.required}
								placeholder="Имя компании в поисковой строке (транслитом)" />
						</Grid>

						<Grid item={true} xs={11}>
							<Title>Категория</Title>
							<Field name="categoryId"
								component={Dropdown}
								options={common.companiesCategories}
								onChange={this.handleCategoryChange}
								validate={this.state.required}
								format={value => common.companiesCategories.find(x => x.value === value)}
								normalize={value => value.value} />
						</Grid>
						<Grid item={true} xs={11}>
							<Title>Подкатегория</Title>
							<Field name="subcategoryId"
								component={Dropdown}
								options={subcategories}
								onChange={this.handleSubcategoryChange}
								validate={this.state.required}
								format={value => subcategories.find(x => x.value === value)}
								normalize={value => value.value} />
						</Grid>
						<Grid item={true} xs={11}>
							<FieldArray
								codeValues={{...common}}
								name="extensions"
								change={this.props.change}
								extensions={this.props.extensions}
								component={Extensions} />
						</Grid>
						<Grid item={true} xs={11}>
							<FieldArray
								name="animals"
								animals={common.animals}
								renderAnimals={findFilters(selectedCategory, selectedSubCategory).includes(FILTERS.ANIMAL)}
								renderBreeds={findFilters(selectedCategory, selectedSubCategory).includes(FILTERS.BREED)}
								component={Animals} />
						</Grid>
						<Grid item={true} xs={11}>
							<Title>Картинка лого</Title>
							<Field name="imageObjects"
								type="file"
								imageObjectsMaxLimit={1}
								component={ReduxFormsImageUploader} />
						</Grid>

						<Grid item={true} xs={11}>
							<Title>Социальные сети</Title>
							<Field name="vk"
								className="my-1"
								component={Input}
								placeholder="Vk"
								fullWidth={true} />
							<Field name="facebook"
								className="my-1"
								component={Input}
								placeholder="Facebook"
								fullWidth={true} />
							<Field name="instagram"
								className="my-1"
								component={Input}
								placeholder="Instagram"
								fullWidth={true} />
						</Grid>

						<Grid item={true} xs={11}>
							<Title>Описание</Title>
							<Field name="description"
								component={Input}
								multiline={true}
								rowsMax="20"
								placeholder="Специализация, ассортимент"
								fullWidth={true} />
						</Grid>
						<Grid item={true} xs={11}>
							<Title>Сайт компании</Title>
							<Field name="url"
								component={Input}
								placeholder="Сайт"
								fullWidth={true} />
						</Grid>
						<Grid item={true} xs={11}>
							<Title>Email</Title>
							<Field name="email"
								component={Input}
								placeholder="Email"
								fullWidth={true} />
						</Grid>

						<Grid item={true} xs={11}>
							<FieldArray
								name="locations"
								{...common}
								workingTimes={workingTimes}
								change={this.props.change}
								formLocations={formLocations}
								removeLocation={this.props.removeLocation}
								component={Location} />
						</Grid>

						<Grid container={true} justify="center" className="my-3">
							<Grid item={true} xs={4} className="text-center">
								<Button type="button"
									onClick={this.openConfirmDialog}
									className="my-4 text-white w-100"
									accent="blue">
									{t('Сохранить')}
								</Button>
							</Grid>
							<Grid item={true} xs={4} className="text-center">
								<Button className="my-4 text-white w-100"
									onClick={this.onCancelPressed}
									accent="red">
									{t('Отмена')}
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Card>
				<ConfirmDialog
					open={this.state.showConfirm}
					message="Вы действительно хотите сохранить введенные данные?"
					title="Сохранение компании"
					okCallback={() => this.setState({ showConfirm: false }, handleSubmit(this.saveAction))}
					closeCallback={() => this.setState({ showConfirm: false })} />
			</form>
		);
	}
}


const getCategories = state => state.common.companiesCategories;
const getSelectedCategory = state => formValueSelector('company')(state, 'categoryId');
const getSelectedSubCategory = state => formValueSelector('company')(state, 'subcategoryId');
const getLocations = state => formValueSelector('company')(state, 'locations');
const calculateExtensions = (category, subCategory) => {
	if (category && subCategory) {
		const mapper = (item) => ({
			title: item.title,
			name: item.name,
			childs: []
		});
		const filters = findFilters(category, subCategory).map(filter => filter.name);
		return findDescriptions(filters).filter(i => i.type === FILTER_TYPE.CHECKBOX_BLOCK).map(mapper);
	}
	return [];
};

const getSubcategories = createSelector(
	[getSelectedCategory, getCategories],
	(selectedCategory, categories) => {
		selectedCategory = categories.find(category => category.value === selectedCategory);
		return selectedCategory ? selectedCategory.subcategories : [];
	}
);

const internalizeCompany = createSelector(
	[state => state.newCompany.company, extendCodeValues()],
	(company, common) => {
		if (company.companyId) {
			company = {
				...company,
				animals: company.animals.map(animal => {
					const foundAnimal = common.animals.find(a => a.value === animal.animalId);
					let breed = undefined;
					if (foundAnimal && foundAnimal.breeds) {
						breed = foundAnimal.breeds.find(b => b.value === animal.breedId);
					}
					const result = {
						...animal,
						animals: common.animals,
						breeds: foundAnimal ? foundAnimal.breeds : []
					};
					if (foundAnimal) {
						result.animalId = {
							value: foundAnimal.value,
							label: foundAnimal.label
						};
					}
					if (breed) {
						result.breedId = {
							value: breed.value,
							label: breed.label
						};
					}
					return result;
				}),
				locations: company.locations.map(location => {
					const country = common.countries.find(country => country.value === location.countryId);
					let city, subway;
					if (country) {
						city = country.allCities.find(city => city.value === location.cityId);
						if (city && city.subways) {
							subway = city.subways.find(subway => subway.value === location.subwayId);
						}
					}

					const workingTimes = common.daysOfWeek.map(day => ({
						dayOfWeek: {...day}
					}));
                    
					// Create new base array and write working times
					location.workingTimes.forEach(day => {
						const foundWorkingTime = workingTimes.find(time => time.dayOfWeek.value === day.dayOfWeek);
						foundWorkingTime.open = day.open;
						foundWorkingTime.close = day.close;
					});

					const result = {
						...location,
						markers: [{
							position: location.position
						}],
						workingTimes
					};
					if (country) {
						result.countryId = {
							value: country.value,
							label: country.label
						};
						result.cities = country.allCities || [];
					}
					if (city) {
						result.cityId = {
							value: city.value,
							label: city.label,
						};
						result.subways = city.subways || [];
					}
					if (subway) {
						result.subwayId = {
							value: subway.value,
							label: subway.label,
						};
					}
					return result;
				}),
				imageObjects: [
					{
						imageUrl: company.logo
					}
				]
			};
			if (company.categoryId && company.subcategoryId) {
				const extensions = calculateExtensions(company.categoryId, company.subcategoryId);
				company.extensions = extensions.map(ext => {
					return {
						name: ext.name,
						title: ext.title,
						childs: company[ext.name] && company[ext.name].map(i => ({
							item: {
								value: i.id,
								label: i.name
							},
							values: common[ext.name]
						}))
					};
				});
			}
		}
		return company;
	}
);

const NewCompany = connect(
	state => ({
		common: extendCodeValues()(state),
		initialValues: internalizeCompany(state),
		selectedCategory: getSelectedCategory(state),
		selectedSubCategory: getSelectedSubCategory(state),
		formLocations: getLocations(state),
		subcategories: getSubcategories(state),
	}),
	{
		postCompany,
		updateCompany,
		loadCompany,
		resetFormState,
		removeLocation
	}
)(NewCompanyContainer);

export default NewCompany;
