import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Title, Grid, Card, Label, Text, TextField, Button, ConfirmDialog, InfoDialog, Finder } from 'components';
import CompanyItem from './components/CompanyItem/index';
import Sidebar from './components/Sidebar/index';
import classNames from 'classnames';
import styles from './styles';
import {Typography } from 'material-ui';
import { extendCodeValues } from '../selectors';
import { findFilters } from './settings/assignments';
import filterDescriptions from './settings/filtersDescription';
import {CircularProgress} from 'components';

import Util from '../../util/index';

import {
	loadCompanies,
	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
	removeCompany,
	componentLeave,
} from './actionCreators/companiesList';

import {
	updateStateWithUrlSource,
	updateUrlWithStateSource,
	addSubway,
	removeSubway,
	addBreed,
	removeBreed,
	setIsWorkingNow,

	setupInitialFilterState,

	suggestionFilterChange,
	checkboxesBlockFilterChange,
	handleSuggestionSearch,
	switchFilterChange,
} from './actionCreators/filter';


@translate(['companiesList'])
@withStyles(styles)
class CompaniesListContainer extends React.Component {
	constructor(props) {
		super(props);

		const { companyCategoryId, companySubcategoryId } = props.match.params;
		let filters = findFilters(companyCategoryId, companySubcategoryId);

		this.state = {
			isWorkingTimeDialogOpened: false,
			isConfirmDialogOpened: false,
			isPhonesDialogOpened: false,
			cities: [],
			daysOfWeekWorkingTime: [],
			company: {},
			phones: [],
			currentSubCategory: {},

			componentFilters: filters
		};

		this.props.setupInitialFilterState(filters.map(filter => filterDescriptions[filter.name]));
	}

	componentDidMount() {
		const { updateStateWithUrlSource, match, loadCompanies, location, common: { companiesCategories } } = this.props;
		const { companyCategoryId, companySubcategoryId, countryId, cityId } = match.params;

		const searchParams = Util.searchParamsToObject(new URLSearchParams(location.search));
		const staticPathParams = {companyCategoryId, companySubcategoryId};
		const dynamicPathParams = {
			countryId,
			cityId
		};

		updateStateWithUrlSource(staticPathParams, dynamicPathParams, searchParams);
		loadCompanies();
	}

	handleSuggestionsFetchRequested = (change) => {
		if (this.props.main.suggestionInputValue !== change.value) {
			this.props.fuzzySearchLoadCompanies({
				searchQuery: change.value,
				subcategoryId: this.props.match.params.companySubcategoryId,
			});
		}
	};

	handleChange = (event, { newValue }) => {
		this.props.suggestionInputValueChange(newValue);
	};

	handleOpenWorkingTimeDialog = (daysOfWeekWorkingTime) => {
		this.setState({
			isWorkingTimeDialogOpened: true,
			daysOfWeekWorkingTime
		});
	};

	handleOpenPhonesDialog = (phones) => {
		this.setState({
			isPhonesDialogOpened: true,
			phones
		});
	};

	handleAction = (company) => {
		this.setState({ isConfirmDialogOpened: true, company });
	};

	deleteCompany = () => {
		this.setState({ isConfirmDialogOpened: false });
		this.props.removeCompany(this.state.company.companyId);
	};

	blockCompany = () => {
		// action to block company
	};

	componentWillUnmount() {
		this.props.componentLeave();
	}

	render() {
		const { t, companies, classes, match, main, clearFuzzySearchLoadedCompanies, seoInfo } = this.props;

		return (
			<Grid container className="mt-2 mb-4">
				<Grid item xs={9} className={classes.companiesListBlock}>
					<Card className={classNames(classes.searchInputWrapper)}>
						<Finder
							values={main.fuzzySearchCompanies}
							placeholder={t('SECTION_SEARCH')}
							value={main.suggestionInputValue}
							onChange={this.handleChange}
							handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
							handleSuggestionsClearRequested={clearFuzzySearchLoadedCompanies}
							suggestionData={{
								getLink: company => `/company/${company.categoryId.toLowerCase()}/${company.subcategoryId.toLowerCase()}/company/${company.url_id}`,
								getLogo: company => company.logo,
								getTitle: company => company.name,
								getDescription: company => company.description
							}}
						/>
					</Card>
					<div className={classes.companiesList}>
						{
							main.isLoading ?

								<CircularProgress /> :
								(
									<div>
										<Typography component="h1" className={classNames(classes.h1Style, 'mt-3')}>
											{seoInfo.title}
										</Typography>
										<Text className="my-3">
											{seoInfo.description}
										</Text>
										{
											companies.map(company => {
												return (
													<CompanyItem
														key={company.companyId}
														companyBaseUrl={`/company/${company.categoryId.toLowerCase()}/${company.subcategoryId.toLowerCase()}`}
														company={company}
														match={match}
														deleteAction={this.deleteCompany}
														blockAction={this.blockCompany}
														handleOpenWorkingTimeDialog={this.handleOpenWorkingTimeDialog}
														handleOpenPhonesDialog={this.handleOpenPhonesDialog}
														handleAction={this.handleAction}/>
												);
											})
										}
									</div>
								)
						}
					</div>
				</Grid>

				<Grid item xs={3}>
					<Sidebar
						history={this.props.history}
						user={this.props.common.user}
						componentFilters={this.state.componentFilters}
						filter={this.props.filter}
						filterValues={this.props.filterValues}
						setIsWorkingNow={this.props.setIsWorkingNow}
						updateUrlWithStateSource={this.props.updateUrlWithStateSource}
						loadCompanies={this.props.loadCompanies}
						category={this.props.match.params.companyCategoryId}
						subcategory={this.props.match.params.companySubcategoryId}

						suggestionFilterChange={this.props.suggestionFilterChange}
						checkboxesBlockFilterChange={this.props.checkboxesBlockFilterChange}

						handleSuggestionSearch={this.props.handleSuggestionSearch}

						switchFilterChange = {this.props.switchFilterChange}
					/>
				</Grid>

				<InfoDialog
					open={this.state.isPhonesDialogOpened}
					title="Телефоны"
					message="Message"
					closeCallback={() => this.setState({ isPhonesDialogOpened: false })}>
					{
						this.state.phones && this.state.phones.map(item => (
							<div key={item.phoneId} className="mt-2">
								<Label>{item.phone}</Label>
							</div>
						))
					}
				</InfoDialog>
				<InfoDialog
					open={this.state.isWorkingTimeDialogOpened}
					title="Время работы"
					closeCallback={() => this.setState({ isWorkingTimeDialogOpened: false })}>
					{
						this.state.daysOfWeekWorkingTime.map(time => {
							const open = time.open.substring(0, time.open.lastIndexOf(':'));
							const close = time.close.substring(0, time.close.lastIndexOf(':'));
							return (
								<div key={time.dayOfWeek} className={classNames(classes.flexRow, 'mt-2')}>
									<Label>{time.dayOfWeekName}</Label>
									<Label className="ml-3">{`${open} - ${close}`}</Label>
								</div>
							);
						})
					}
				</InfoDialog>

				<ConfirmDialog
					open={this.state.isConfirmDialogOpened}
					message={this.state.company.message}
					title={this.state.company.title}
					okCallback={this.state.company.action}
					closeCallback={() => this.setState({ isConfirmDialogOpened: false })}/>
			</Grid>
		);
	}
}

const getCommon = (state) => state.common;
const getFilter = (state) => state.companiesList.filter;
const getSuggestionQueries = (state) => state.companiesList.filter.suggestionQueries;
const getCompanies = (state) => state.companiesList.main.companies;

const getFlatCompanies = createSelector(
	[getCompanies],
	(companies) => {
		return companies.map(company => {
			let mainLocation = company.locations.find(location => (location.isMain === 1));
			if (!mainLocation) {
				if (company.locations.length > 0) {
					mainLocation = company.locations[0];
				} else {
					mainLocation = {
						workingTimes: [],
						phones: []
					};
				}
			}
			const phonesText = mainLocation.phones ? mainLocation.phones.map(p => (p.phone)).join(', ') : 'Телефонов нет';

			return {
				...company,
				mainLocation,
				phonesText
			};
		});
	}
);

const mapCodeValue = (item) => ({
	value: item.value,
	label: item.label,
	sort: item.sort
});

const getCountries = createSelector(
	[getCommon], (common) => common.countries
);
const getQueriedCountries = searchConnectedSelector('countryId', getCountries);

const getCities = createSelector(
	[getCommon, getFilter], (common, filter) => {
		const selectedCountry = filter.sidebarFilters.countryId;

		const foundCountry = common.countries.find(country => country.value === selectedCountry);

		if (foundCountry) {
			return foundCountry.cities
				.reduce((acc, item) => acc.concat(item, item.subCities), [])
				.sort((a, b) => a.sort - b.sort);
		}
		return [];
	}
);
const getQueriedCities = searchConnectedSelector('cityId', getCities);

const getCitiesEnabled = createSelector(
	[getFilter], (filter) => {
		return !!filter.sidebarFilters.countryId;
	}
);

const getSubways = createSelector(
	[getCities, getFilter], (cities, filter) => {
		const selectedCity = filter.sidebarFilters.cityId;
		const foundCity = cities.find(city => city.value === selectedCity);

		return foundCity ? foundCity.subways : [];
	}
);
const getSubwaysEnabled = createSelector(
	[getFilter], (filter) => {
		return !!filter.sidebarFilters.cityId;
	}
);

const getDrugsTypes = createSelector(
	[getCommon], (common) => common.drugsTypes
);

const getTorgTypes = createSelector(
	[getCommon], (common) => common.torgTypes
);

const getDirections = createSelector(
	[getCommon], (common) => common.specialistDirections
);

const getClinicsServices = createSelector(
	[getCommon], (common) => common.clinicsServices
);

const getOwnerTypes = createSelector(
	[getCommon], common => common.ownerTypes
);

const getJobTypes = createSelector(
	[getCommon], common => common.jobTypes
);

const getAnimals = createSelector(
	[getCommon], (common) => common.animals
);
const getQueriedAnimals = searchConnectedSelector('animals', getAnimals);

function containsFilter(substring, option) {
	return option.label.search(new RegExp(substring, 'i')) !== -1;
}

function searchConnectedSelector(name, getAllValuesSelector) {
	return createSelector(
		[getAllValuesSelector, getSuggestionQueries], (allValues, suggestionQueries) => {
			const searchQuery = suggestionQueries[name];

			if (searchQuery) {
				return allValues.filter(containsFilter.bind(null, searchQuery));
			}
			return allValues;
		}
	);
}

const getBreeds = createSelector(
	[getCommon, getFilter], (common, filter) => {
		const selectedAnimal = common.animals.find(animal => animal.value === filter.selectedAnimalId);
		if (selectedAnimal) {
			return selectedAnimal.breeds;
		}
		return [];
	}
);
const getBreedsEnabled = createSelector(
	[getFilter], (filter) => {
		return !!filter.animals;
	}
);

const getSEOInfo = createSelector(
	[getCommon, getFilter],
	(common, filter) => {
		let information = {
			title: '',
			description: '',
		};
		common.companiesCategories.forEach((type, index) => {
			if (filter.companyCategoryId && type.value.toUpperCase() === filter.companyCategoryId.toUpperCase()) {
				for (let i = 0; i < type.subcategories.length; i++) {
					let subCat = type.subcategories[i];
					if (subCat.value.toUpperCase() === filter.companySubcategoryId.toUpperCase()) {
						information.title = subCat.label;
						information.description = subCat.description;
						break;
					}
				}
			}
		});
		
		if (filter.sidebarFilters.countryId) {
			const foundCountry = common.countries.find(c => c.value === filter.sidebarFilters.countryId);
			if (foundCountry) {
				if (filter.sidebarFilters.cityId) {
					const foundCity = foundCountry.allCities.find(city => city.value === filter.sidebarFilters.cityId);
					if (foundCity) {
						information.title += ' ' + foundCity.label;
					}
				} else {
					information.title += ' ' + foundCountry.label;
				}
			}
		}
		return information;
	}
);

const CompaniesList = connect(
	state => {
		return {
			common: extendCodeValues()(state),
			main: state.companiesList.main,
			companies: getFlatCompanies(state),
			seoInfo: getSEOInfo(state),
			filter: getFilter(state),
			filterValues: {
				countryId: {
					values: getQueriedCountries(state),
					enabled: true
				},
				cityId: {
					values: getQueriedCities(state),
					enabled: getCitiesEnabled(state)
				},
				subways: {
					values: getSubways(state),
					enabled: getSubwaysEnabled(state)
				},
				animals: {
					values: getQueriedAnimals(state),
					enabled: true
				},
				breeds: {
					values: getBreeds(state),
					enabled: getBreedsEnabled(state)
				},
				drugsTypes: {
					values: getDrugsTypes(state),
					enabled: true
				},
				torgTypes: {
					values: getTorgTypes(state),
					enabled: true
				},
				directions: {
					values: getDirections(state),
					enabled: true
				},
				clinicsServices: {
					values: getClinicsServices(state),
					enabled: true
				},
				ownerTypes: {
					values: getOwnerTypes(state),
					enabled: true
				},
				jobTypes: {
					values: getJobTypes(state),
					enabled: true
				},
				isWorkingNow: {
					enabled: true
				}
			},
		};
	},
	{
		loadCompanies,

		fuzzySearchLoadCompanies,
		clearFuzzySearchLoadedCompanies,
		suggestionInputValueChange,

		updateStateWithUrlSource,
		updateUrlWithStateSource,

		addSubway,
		removeSubway,
		removeCompany,
		addBreed,
		removeBreed,

		setIsWorkingNow,

		componentLeave,

		setupInitialFilterState,


		suggestionFilterChange,
		checkboxesBlockFilterChange,

		handleSuggestionSearch,

		switchFilterChange
	}
)(CompaniesListContainer);

export default CompaniesList;