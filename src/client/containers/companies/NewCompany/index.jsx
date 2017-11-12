import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect'

import withErrorHandling from '../../../components/decorators/withErrorHandling';

import {postCompany, updateCompany, loadCompany, resetFormState, removeLocation} from "./actions";

import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';

import { Dropdown, Button, Title, Input, Grid, ReduxFormsImageUploader, TextField, Tabs, Tab, Card, Map, ConfirmDialog } from "components";

import styles from './styles';
import {Typography} from "material-ui";

import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form'
import Location from "./components/Location/index";
import Animals from "./components/Animals/index";

import {getFormValues} from 'redux-form';


@translate(['common'])
@withStyles(styles)
@reduxForm({form: 'company', enableReinitialize: true})
@withErrorHandling()
class NewCompanyContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subcategories: [],
			renderAnimals: false,
			renderBreeds: false,
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
            renderAnimals: this.isAnimalAvailable(nextProps),
            renderBreeds: this.isBreedAvailable(nextProps)
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
		this.setState({
			subcategories: category.subcategories,
		});
	};

	handleSubcategoryChange = () => {
        this.props.change('animals', []);
    };

	onCancelPressed = () => {
		this.props.history.goBack();
	};

	openConfirmDialog = () => {
		this.setState({ showConfirm: true });
	};

	saveAction = (values) => {
		const { history, editMode, match, updateCompany, postCompany, initialValues } = this.props;
        console.log('g');
		if (editMode) {
            values.companyId = initialValues.companyId;
			updateCompany(match.params.url_id, values, history);
		} else {
			postCompany(values, history);
		}
	};

	isAnimalAvailable = (props) => {
	    return ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(props.selectedSubCategory)
            || ['SERVICES'].includes(props.selectedCategory);
    };

	isBreedAvailable = (props) => {
	    return ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(props.selectedSubCategory);
    };

	render() {
		const { t, common, handleSubmit, workingTimes, subcategories, formLocations } = this.props;

		return (
            <form className="d-flex-column align-items-center my-4">
                <Card raised>
                    <Grid container justify="center" spacing={24}>

                        <Grid item xs={11}>
                            <Typography type="headline" component="h1" className="mt-4">
                                Основная информация
                            </Typography>
                        </Grid>

                        <Grid item xs={11}>
                            <Title>Название</Title>
                            <Field name="name"
                                   component={Input}
                                   fullWidth
                                   validate={this.state.required}
                                   placeholder="Название компании"/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Имя в поисковой строке</Title>
                            <Field name="url_id"
                                   component={Input}
                                   fullWidth
                                   validate={this.state.required}
                                   placeholder="Имя компании в поисковой строке (транслитом)"/>
                        </Grid>

                        <Grid item xs={11}>
                            <Title>Категория</Title>
                            <Field name="categoryId"
                                   component={Dropdown}
                                   options={common.companiesCategories}
                                   onChange={this.handleCategoryChange}
                                   validate={this.state.required}
                                   format={value => common.companiesCategories.find(x => x.value === value)}
                                   normalize={value => value.value}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Подкатегория</Title>
                            <Field name="subcategoryId"
                                   component={Dropdown}
                                   options={subcategories}
                                   onChange={this.handleSubcategoryChange}
                                   validate={this.state.required}
                                   format={value => subcategories.find(x => x.value === value)}
                                   normalize={value => value.value}
                            />
                        </Grid>
                        <Grid item xs={11}>
                            <FieldArray
                                name="animals"
                                animals={common.animals}
                                renderAnimals={this.state.renderAnimals}
                                renderBreeds={this.state.renderBreeds}
                                component={Animals}/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Картинка лого</Title>
                            <Field name="imageObjects"
                                   type="file"
								   imageObjectsMaxLimit={1}
                                   component={ReduxFormsImageUploader} />
                        </Grid>

                        <Grid item xs={11}>
                            <Title>Описание</Title>
                            <Field name="description"
                                   component={Input}
                                   multiline
                                   rowsMax="20"
                                   placeholder="Специализация, ассортимент"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Сайт компании</Title>
                            <Field name="url"
                                   component={Input}
                                   placeholder="Сайт"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={11}>
                            <Title>Email</Title>
                            <Field name="email"
                                   component={Input}
                                   placeholder="Email"
                                   fullWidth/>
                        </Grid>

                        <Grid item xs={11}>
                            <FieldArray
                                name="locations"
                                {...common}
                                workingTimes={workingTimes}
                                change={this.props.change}
                                formLocations={formLocations}
                                removeLocation={this.props.removeLocation}
                                component={Location}/>
                        </Grid>

                        <Grid container justify="center" className="my-3">
                            <Grid item xs={4} className="text-center">
                                <Button type="button"
                                        onClick={this.openConfirmDialog}
                                        className="my-4 text-white w-100"
                                        accent="blue">
									{t('Сохранить')}
								</Button>
							</Grid>
							<Grid item xs={4} className="text-center">
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
					closeCallback={() => this.setState({ showConfirm: false })}/>
			</form>
		);
	}
}


const getSelectedCategory = createSelector(
	[getFormValues('company')],
	formValues => {
		return formValues && formValues.categoryId;
	}
);

const getCategories = (state) => state.common.companiesCategories;

const getSubcategories = createSelector(
	[getSelectedCategory, getCategories],
	(selectedCategory, categories) => {
        selectedCategory = categories.find(category => category.value === selectedCategory);
        return selectedCategory ? selectedCategory.subcategories : [];
	}
);

const extendCodeValues = createSelector(
    [state => state.common],
    (common) => {
        const allCities = common.cities.reduce((acc, item) => {
            acc.push({
                value: item.value,
                label: item.label,
                subways: item.subways
            });
            acc.push(...item.subCities);
            return acc;
        }, []);
        allCities.sort((a, b) => a.label.localeCompare(b.label));
        return {
            ...common,
            allCities
        };
    }
);

const internalizeCompany = createSelector(
    [(state) => state.newCompany.company, extendCodeValues],
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
                       breeds: foundAnimal.breeds || []
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
                    const city = common.allCities.find(city => city.value === location.cityId);
                    let subway = undefined;
                    if (city && city.subways) {
                        subway = city.subways.find(subway => subway.value === location.subwayId)
                    }

                    const workingTimes = common.daysOfWeek.map(day => ({
                        dayOfWeek: {...day}
                    }));
                    
                    // Create new base array and write working times
                    location.workingTimes.forEach(day => {
                        workingTimes[day.dayOfWeek].open = day.open;
                        workingTimes[day.dayOfWeek].close = day.close;
                    });

                    const result = {
                        ...location,
                        subways: city.subways || [],
                        markers: [{
                            position: location.position
                        }],
                        workingTimes
                    };
                    if (city) {
                        result.cityId = {
                            value: city.value,
                            label: city.label,
                        };
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
            }
        }
        return company;
    }
);

const NewCompany = connect(
    state => ({
		common: extendCodeValues(state),
		initialValues: internalizeCompany(state),
		selectedCategory: formValueSelector('company')(state, 'categoryId'),
		selectedSubCategory: formValueSelector('company')(state, 'subcategoryId'),
        formLocations: formValueSelector('company')(state, 'locations'),
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