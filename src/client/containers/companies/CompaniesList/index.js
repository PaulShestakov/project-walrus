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

import {
	loadCompanies,

	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
	removeCompany,
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

function renderSuggestion(classes, company, { query, isHighlighted }) {
	return (
		<MenuItem component="div" className="p-3" classes={{root: classes.suggestionMenuItem}}>
			<Link to={`/company/${company.companyId}`} className={classes.suggestionItemLink}>
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
		const { updateStateWithUrlSource, match, loadCompanies } = this.props;
        updateStateWithUrlSource({
            companyCategoryId: match.params.categoryId,
            companySubcategoryId: match.params.subCategoryId,
		});
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

	handleCheckboxPressed = (event) => {
        switch(event.target.name) {
            case 'cities': {
                if (event.target.checked) {
                    this.props.addCity(event.target.value);
                } else {
                    this.props.removeCity(event.target.value);
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
                    this.props.removeAnimal(event.target.value);
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
		const { t, companies, classes, match } = this.props;

		return (
			<Grid container className="my-4">
				<Grid item md={9}>
					<Card className={classNames(classes.inputWrapper)}>
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
							renderSuggestion={renderSuggestion.bind(null, classes)}
							inputProps={{
								autoFocus: false,
								classes,
								placeholder: t('SECTION_SEARCH'),
								value: this.props.main.suggestionInputValue,
								onChange: this.handleChange,
							}}
						/>
					</Card>
					<div>
						{
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

				<Grid item md={3}>
					<Sidebar
						history={this.props.history}
						filter={this.props.filter}
						cities={this.props.cities}
						subways={this.props.subways}
						animals={this.props.animals}
						breeds={this.props.breeds}
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
						this.state.daysOfWeekWorkingTime.map(dayWorkingTime => (
							<div key={dayWorkingTime.dayOfWeek} className={classNames(classes.flexRow, "mt-2")}>
								<Label>{dayWorkingTime.dayOfWeekName}</Label>
								<Label className="ml-3">{`${dayWorkingTime.open} - ${dayWorkingTime.close}`}</Label>
							</div>
						))
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

const getCities = (state) => state.common.cities;
const getFilter = (state) => state.companiesList.filter;
const getAnimals = (state) => state.common.animals;

const getFlatCitiesList = createSelector(
	[getCities],
	(cities) => {
		return cities
			.reduce((acc, item) => {
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
			}, [])
			.sort((cityA, cityB) => cityA.sort - cityB.sort);
	}
);

const getSubways = createSelector(
	[getFilter, getCities],
	(filter, cities) => {
		const subways = [];
		cities.forEach(city => {
			if (filter.selectedCitiesIds.includes(city.value)) {
				subways.push(...city.subways);
			}
		});
		return subways;
	}
);

const getFlatAnimals = createSelector(
	[getFilter, getAnimals],
	(filter, animals) => {
		let result = [];
		if (['SERVICES'].includes(filter.companyCategoryId) ||
			['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(filter.companySubcategoryId)) {
            result = animals;
		}
		return result;
	}
);

const getBreeds = createSelector(
	[getFilter, getFlatAnimals],
	(filter, animals) => {
		const breeds = [];
        animals.forEach(animal => {
            if (['ZOO_NURSERIES', 'ZOO_SHOPS'].includes(filter.companySubcategoryId) && filter.selectedAnimalsIds.includes(animal.value)) {
                breeds.push(...animal.breeds);
            }
        });
		return breeds;
	}
);

const getCompanies = createSelector(
	[state => state.companiesList.main.companies],
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

const CompaniesList = connect(
	state => {
		return {
			main: state.companiesList.main,
			companies: getCompanies(state),
			filter: state.companiesList.filter,
			cities: getFlatCitiesList(state),
			subways: getSubways(state),
			animals: getFlatAnimals(state),
			breeds: getBreeds(state),
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
	}
)(CompaniesListContainer);

export default CompaniesList;