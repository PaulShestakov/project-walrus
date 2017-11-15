import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect'

import {Link} from 'react-router-dom';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Title, Grid, Card, Label, Text, TextField, Button, ConfirmDialog, InfoDialog } from "components";
import CompanyItem from './components/CompanyItem/index'
import Sidebar from './components/Sidebar/index';
import classNames from 'classnames';
import styles from './styles';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';

import {
	loadCompanies,

	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
	removeCompany,

    componentLeave,
} from "./actionCreators/companiesList";

import {
	updateStateWithUrlSource,
	updateUrlWithStateSource,

	addCity,
	removeCity,
	addSubway,
	removeSubway,
	addAnimal,
	removeAnimal,
	addBreed,
	removeBreed,

	setIsWorkingNow,
} from "./actionCreators/filter";


function renderInput(inputProps) {
	const { classes, autoFocus, value, ref, ...other } = inputProps;

	return (
		<TextField
			autoFocus={autoFocus}
			fullWidth
			value={value}
			inputRef={ref}
			InputProps={{
				classes: {
					input: classes.input,
				},
				...other,
			}}
		/>
	);
}

function renderSuggestionsContainer(options) {
	const { containerProps, children } = options;

	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

function renderSuggestion(classes, match, company, { query, isHighlighted }) {
	return (
		<MenuItem component="div" className="p-3" classes={{root: classes.suggestionMenuItem}}>
			<Link to={`${match.url}/${company.url_id}`} className={classes.suggestionItemLink}>
				<Paper>
					<img src={company.logo} className={classes.suggestionImage}/>
				</Paper>

				<div className="ml-2">
					<Label uppercase bold fontSize="1.5rem">{company.name}</Label>
					<Text className="mt-1" maxLines={2}>{company.description}</Text>
				</div>
			</Link>
		</MenuItem>
	);
}

function getSuggestionValue(suggestion) {
	return suggestion.name;
}


@translate(['companiesList'])
@withStyles(styles)
class CompaniesListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isWorkingTimeDialogOpened: false,
			isConfirmDialogOpened: false,
			isPhonesDialogOpened: false,
			cities: [],
			daysOfWeekWorkingTime: [],
			company: {},
			phones: []
		};
	}

	componentDidMount() {
		const { updateStateWithUrlSource, match, loadCompanies, location } = this.props;
		const searchParams = new URLSearchParams(location.search);
		searchParams.set('companyCategoryId', match.params.categoryId);
		searchParams.set('companySubcategoryId', match.params.subCategoryId);
        updateStateWithUrlSource(searchParams);
        loadCompanies();
	}

	handleSuggestionsFetchRequested = (change) => {
		if (this.props.main.suggestionInputValue !== change.value) {
			this.props.fuzzySearchLoadCompanies(change.value);
		}
	};

	handleSuggestionsClearRequested = () => {
		this.props.clearFuzzySearchLoadedCompanies();
	};

	handleChange = (event, { newValue }) => {
		this.props.suggestionInputValueChange(newValue);
	};

	handleOpenWorkingTimeDialog = (daysOfWeekWorkingTime) => {
		this.setState({
			isWorkingTimeDialogOpened: true,
			daysOfWeekWorkingTime
		})
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

	handleCheckboxPressed = (event) => {
        switch(event.target.name) {
            case 'cities': {
                if (event.target.checked) {
                    this.props.addCity(event.target.value);
                } else {
					const cityId = event.target.value;
					const foundCity = this.props.common.allCities.find(city => city.value === cityId);
					let subwayIds = [];
					if (foundCity.subways) {
						subwayIds = foundCity.subways.map(subway => subway.value);
					}
                    this.props.removeCity(cityId, subwayIds);
                }
                break;
            }
            case 'subways': {
                if (event.target.checked) {
                    this.props.addSubway(event.target.value);
                } else {
                    this.props.removeSubway(event.target.value);
                }
                break;
            }
            case 'animals': {
                if (event.target.checked) {
                    this.props.addAnimal(event.target.value);
                } else {
					const animalId = event.target.value;
					const breedIds = this.props.common.animals
						.find(animal => animal.value === animalId).breeds
						.map(breed => breed.value);
                    this.props.removeAnimal(animalId, breedIds);
                }
                break;
            }
            case 'breeds': {
                if (event.target.checked) {
                    this.props.addBreed(event.target.value);
                } else {
                    this.props.removeBreed(event.target.value);
                }
                break;
            }
        }
        this.props.updateUrlWithStateSource(this.props.history);
        this.props.loadCompanies();
	};

	render() {
		const { t, companies, classes, match, main } = this.props;

		return (
			<Grid container className="my-3">
				<Grid item xs={9} className={classes.companiesListBlock}>
					<Card className={classNames(classes.searchInputWrapper)}>
						<Autosuggest
							theme={{
								container: classNames(classes.container, 'p-3'),
								suggestionsContainerOpen: classes.suggestionsContainerOpen,
								suggestionsList: classes.suggestionsList,
								suggestion: classes.suggestion,
							}}
							renderInputComponent={renderInput}
							suggestions={this.props.main.fuzzySearchCompanies}
							onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
							onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
							renderSuggestionsContainer={renderSuggestionsContainer}
							getSuggestionValue={getSuggestionValue}
							renderSuggestion={renderSuggestion.bind(null, classes, match)}
							inputProps={{
								autoFocus: false,
								classes,
								placeholder: t('SECTION_SEARCH'),
								value: this.props.main.suggestionInputValue,
								onChange: this.handleChange,
							}}
						/>
					</Card>
					<div className={classes.companiesList}>
						{
                            main.isLoading ?

							<CircularProgress className={classes.progressCircle} /> :

							companies.map(company => {
								return (
									<CompanyItem
										key={company.companyId}
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
				</Grid>

				<Grid item xs={3}>
					<Sidebar
						history={this.props.history}
						filter={this.props.filter}
						filterValues={this.props.filterValues}
						handleCheckboxPressed={this.handleCheckboxPressed}
						setIsWorkingNow={this.props.setIsWorkingNow}
						updateUrlWithStateSource={this.props.updateUrlWithStateSource}
						loadCompanies={this.props.loadCompanies}
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
							const open = time.open.substring(0, time.open.lastIndexOf(":"));
							const close = time.close.substring(0, time.close.lastIndexOf(":"));
							return (
								<div key={time.dayOfWeek} className={classNames(classes.flexRow, "mt-2")}>
									<Label>{time.dayOfWeekName}</Label>
									<Label className="ml-3">{`${open} - ${close}`}</Label>
								</div>
							)
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
					}
				}
			}
			const phonesText = mainLocation.phones ? mainLocation.phones.map(p => (p.phone)).join(', ') : "Телефонов нет";

			return {
				...company,
				mainLocation,
				phonesText
			}
		});
	}
);

const getFilterValues = createSelector(
	[getFilter, getCommon],
	(filter, common) => {
		const result = {};

		// Insert cities
		result.cities = common.cities.reduce((acc, item) => {

			acc.push({
				value: item.value,
				label: item.label,
				sort: item.sort
			});

			item.subCities.forEach(item => {
				acc.push({
					value: item.value,
					label: item.label,
					sort: item.sort
				});
			});

			return acc;

		}, []).sort((cityA, cityB) => cityA.sort - cityB.sort);

		// Insert subways
		const subways = [];
		common.cities.forEach(city => {
			if (filter.selectedCitiesIds.includes(city.value)) {
				subways.push(...city.subways);
			}
		});
		result.subways = subways;

		// Insert animals
		let animals = [];
		const categoryId = filter.companyCategoryId ? filter.companyCategoryId.toUpperCase() : null;
		const subCatId = filter.companySubcategoryId ? filter.companySubcategoryId.toUpperCase() : null;
		if (['SERVICES'].includes(categoryId) || ['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(subCatId)) {
			animals = common.animals;
		}
		result.animals = animals;

		// Insert breeds
		const breeds = [];
		if (result.animals) {
			result.animals.forEach(animal => {
				if (['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(subCatId) && filter.selectedAnimalsIds.includes(animal.value)) {
					breeds.push(...animal.breeds);
				}
			});
		}
		result.breeds = breeds;

		return result;
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

const CompaniesList = connect(
	state => {
		return {
			common: extendCodeValues(state),
			main: state.companiesList.main,
			companies: getFlatCompanies(state),
			filter: state.companiesList.filter,
			filterValues: getFilterValues(state),
		};
	},
	{
		loadCompanies,

		fuzzySearchLoadCompanies,
		clearFuzzySearchLoadedCompanies,
		suggestionInputValueChange,

		updateStateWithUrlSource,
		updateUrlWithStateSource,


		addCity,
		removeCity,
		addSubway,
		removeSubway,
		removeCompany,
		addAnimal,
		removeAnimal,
		addBreed,
		removeBreed,

		setIsWorkingNow,

        componentLeave,
	}
)(CompaniesListContainer);

export default CompaniesList;