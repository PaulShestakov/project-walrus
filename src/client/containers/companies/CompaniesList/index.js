import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Title, Grid, Card, Label, Text, TextField, Button, ConfirmDialog, InfoDialog, Finder, Pagination } from 'components';
import CompanyItem from './components/CompanyItem/index';
import Sidebar from './components/Sidebar/index';
import classNames from 'classnames';
import styles from './styles';
import {Typography } from 'material-ui';
import { extendCodeValues } from '../selectors';
import { findFilters } from './settings/assignments';
import FILTERS_CONFIGURATIONS from './settings/filtersConfigurations';
import {CircularProgress} from 'components';
import Util from '../../util/index';

import {
	loadCompanies,
	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
	removeCompany,
	componentLeave,

	updateStateWithUrlSource,
	updateUrlWithStateSource,
	addSubway,
	removeSubway,
	addBreed,
	removeBreed,
	setIsWorkingNow,

	setDefaultFiltersValues,

	suggestionFilterChange,
	checkboxesBlockFilterChange,
	handleSuggestionSearch,
	switchFilterChange,

	updatePaginationData
} from './actions';
import {DEFAULT_PATH_PARAMS_TYPES} from './constants';
import withScrollToTop from '../../../hocs/WithScrollToTop';
import WindowScrollService from '../../../services/windowScrollService';


@withScrollToTop()
@translate(['companiesList'])
@withStyles(styles)
class CompaniesListContainer extends React.Component {
	constructor(props) {
		super(props);
		const { companyCategoryId, companySubcategoryId } = props.match.params;

		const filters = findFilters(companyCategoryId, companySubcategoryId);

		const filtersConfigurations = filters
			.map(filter => FILTERS_CONFIGURATIONS[filter.name])
			.filter(filterConfiguration => !!filterConfiguration.component);

		const defaultFiltersValues = filters.map(filter => FILTERS_CONFIGURATIONS[filter.name])
			.reduce((acc, filterConfiguration) => {
				acc[filterConfiguration.name] = filterConfiguration.defaultValue;
				return acc;
			}, {});

		this.state = {
			isWorkingTimeDialogOpened: false,
			isConfirmDialogOpened: false,
			isPhonesDialogOpened: false,
			daysOfWeekWorkingTime: [],
			company: {},
			phones: [],

			filtersConfigurations
		};

		props.setDefaultFiltersValues(defaultFiltersValues);

		WindowScrollService.scrollToTop(false);
	}

	componentDidMount() {
		this.updateAndLoad(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match !== this.props.match && nextProps.location !== this.props.location) {
			this.updateAndLoad(nextProps);
		}
	}

	updateAndLoad(props) {
		const { updateStateWithUrlSource, match, loadCompanies, location } = props;
		const { companyCategoryId, companySubcategoryId, countryId, cityId } = match.params;

		const staticPathParams = {companyCategoryId, companySubcategoryId};
		const dynamicPathParams = {
			countryId: countryId || DEFAULT_PATH_PARAMS_TYPES.COUNTRY_ID,
			cityId: cityId || DEFAULT_PATH_PARAMS_TYPES.CITY_ID
		};
		const searchParams = Util.searchParamsToObject(new URLSearchParams(location.search));

		updateStateWithUrlSource(staticPathParams, dynamicPathParams, searchParams);
		loadCompanies();
	}

	componentWillUnmount() {
		this.props.componentLeave();
	}

	handleSuggestionsFetchRequested = (change) => {
		if (this.props.suggestionInputValue !== change.value) {
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

	handlePageChange = (nextPage) => {
		WindowScrollService.scrollToTop(false);
		this.props.updatePaginationData(nextPage);
		this.props.updateUrlWithStateSource(this.props.history);
	};

	render() {
		const { t, companies, classes, match, clearFuzzySearchLoadedCompanies, seoInfo,

			fuzzySearchCompanies, suggestionInputValue, isLoading, companiesMetadata } = this.props;


		return (
			<Grid container={true} className="mt-2 mb-4">
				<Grid item={true} xs={9} className={classes.companiesListBlock}>
					<Card className={classNames(classes.searchInputWrapper)}>

						{/*<Finder*/}
							{/*values={fuzzySearchCompanies}*/}
							{/*placeholder={t('SECTION_SEARCH')}*/}
							{/*value={suggestionInputValue}*/}
							{/*onChange={this.handleChange}*/}
							{/*handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}*/}
							{/*handleSuggestionsClearRequested={clearFuzzySearchLoadedCompanies}*/}
							{/*suggestionData={{*/}
								{/*getLink: company => `/company/${company.categoryId.toLowerCase()}/${company.subcategoryId.toLowerCase()}/company/${company.url_id}`,*/}
								{/*getLogo: company => company.logo,*/}
								{/*getTitle: company => company.name,*/}
								{/*getDescription: company => company.description*/}
							{/*}} />*/}
					</Card>
					<div>
						<Typography component="h1" className={classNames(classes.h1Style, 'mt-3')}>
							{seoInfo.title}
						</Typography>
						<Text className="my-3">
							{seoInfo.description}
						</Text>
					</div>
					<div className={classes.companiesList}>
						{
							isLoading ?
								<CircularProgress /> :
								(
									<div>
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
														handleAction={this.handleAction} />
												);
											})
										}

										{
											companiesMetadata ?
												<Pagination
													className="mt-4"
													pagesCount={companiesMetadata.pagesCount}
													currentPage={companiesMetadata.page}
													onChange={this.handlePageChange} />
												: null
										}


									</div>
								)
						}
					</div>
				</Grid>

				<Grid item={true} xs={3}>
					<Sidebar
						history={this.props.history}
						user={this.props.common.user}
						filtersConfigurations={this.state.filtersConfigurations}
						filters={this.props.filters}
						filterValues={this.props.filterValues}
						setIsWorkingNow={this.props.setIsWorkingNow}
						updateUrlWithStateSource={this.props.updateUrlWithStateSource}
						loadCompanies={this.props.loadCompanies}
						category={this.props.match.params.companyCategoryId}
						subcategory={this.props.match.params.companySubcategoryId}

						suggestionFilterChange={this.props.suggestionFilterChange}
						checkboxesBlockFilterChange={this.props.checkboxesBlockFilterChange}

						handleSuggestionSearch={this.props.handleSuggestionSearch}

						switchFilterChange={this.props.switchFilterChange}

						updatePaginationData={this.props.updatePaginationData} />
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
const getState = (state) => state.companiesList;
const getFilter = (state) => state.companiesList.filters;
const getSuggestionQueries = (state) => state.companiesList.suggestionQueries;
const getCompanies = (state) => state.companiesList.companies;


const getFlatCompanies = createSelector(
	[getCompanies],
	(companies) => {
		return companies.map(company => {
			let mainLocation = company.locations.find(location => (location.isMain === 1));
			if (!mainLocation) {
				if (company.locations && company.locations.length > 0) {
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

const getCountries = createSelector(
	[getCommon], (common) => common.countries
);
const getQueriedCountries = searchConnectedSelector('countryId', getCountries);

const getCities = createSelector(
	[getCommon, getFilter], (common, filters) => {
		const selectedCountry = filters.countryId;

		const foundCountry = common.countries.find(country => country.value === selectedCountry);

		if (foundCountry) {
			return foundCountry.cities
				.reduce((acc, item) => acc.concat(item, item.subCities), [])
				.sort((a, b) => a.label.localeCompare(b.label));
		}
		return [];
	}
);
const getQueriedCities = searchConnectedSelector('cityId', getCities);

const getCitiesEnabled = createSelector(
	[getFilter], (filters) => {
		return !!filters.countryId;
	}
);

const getSubways = createSelector(
	[getCities, getFilter], (cities, filters) => {
		const selectedCity = filters.cityId;
		const foundCity = cities.find(city => city.value === selectedCity);

		return foundCity ? foundCity.subways : [];
	}
);
const getSubwaysEnabled = createSelector(
	[getFilter], (filters) => {
		return !!filters.cityId;
	}
);



const getAnimals = createSelector(
	[getCommon], (common) => common.animals
);
const getQueriedAnimals = searchConnectedSelector('animalId', getAnimals);


const getBreeds = createSelector(
	[getAnimals, getFilter], (animals, filters) => {
		const selectedAnimalId = filters.animalId;
		const animal = animals.find(animal => animal.value === selectedAnimalId);

		if (animal) {
			return animal.breeds;
		}
		return [];
	}
);
const getQueriedBreeds = searchConnectedSelector('breedId', getBreeds);
const getBreedsEnabled = createSelector(
	[getFilter], (filters) => {
		return !!filters.animalId;
	}
);

const getSEOInfo = createSelector(
	[getCommon, getState],
	(common, state) => {
		let information = {
			title: '',
			description: '',
		};
		common.companiesCategories.forEach(type => {
			if (state.companyCategoryId && type.value.toUpperCase() === state.companyCategoryId.toUpperCase()) {
				for (let i = 0; i < type.subcategories.length; i++) {
					let subCat = type.subcategories[i];
					if (subCat.value.toUpperCase() === state.companySubcategoryId.toUpperCase()) {
						information.title = subCat.label;
						information.description = subCat.description;
						break;
					}
				}
			}
		});
		
		if (state.filters.countryId) {
			const foundCountry = common.countries.find(c => c.value === state.filters.countryId);
			if (foundCountry) {
				if (state.filters.cityId) {
					const foundCity = foundCountry.allCities.find(city => city.value === state.filters.cityId);
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

export default connect(
	state => {
		return {
			...state.companiesList,

			common: extendCodeValues()(state),

			companies: getFlatCompanies(state),
			seoInfo: getSEOInfo(state),

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
				animalId: {
					values: getQueriedAnimals(state),
					enabled: true
				},
				breedId: {
					values: getQueriedBreeds(state),
					enabled: getBreedsEnabled(state)
				},


				drugsTypes: {
					values: state.common.drugsTypes,
					enabled: true
				},
				torgTypes: {
					values: state.common.torgTypes,
					enabled: true
				},
				directions: {
					values: state.common.specialistDirections,
					enabled: true
				},
				clinicsServices: {
					values: state.common.clinicsServices,
					enabled: true
				},
				ownerTypes: {
					values: state.common.ownerTypes,
					enabled: true
				},
				jobTypes: {
					values: state.common.jobTypes,
					enabled: true
				},
				isWorkingNow: {
					enabled: true
				}
			},
		};
	},
	{
		setDefaultFiltersValues,

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


		suggestionFilterChange,
		checkboxesBlockFilterChange,

		handleSuggestionSearch,

		switchFilterChange,

		updatePaginationData
	}
)(CompaniesListContainer);
