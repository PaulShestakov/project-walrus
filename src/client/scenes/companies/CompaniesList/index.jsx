import React from 'react';
import {Link} from 'react-router-dom';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Title, Grid, Card, Label, Text, TextField, Button, ConfirmDialog} from "components";
import CompanyItem from './CompanyItem'
import Sidebar from './Sidebar';
import classNames from 'classnames';
import styles from './styles';
import Autosuggest from 'react-autosuggest';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';

function renderInput(inputProps) {
	const { classes, autoFocus, value, ref, ...other } = inputProps;

	return (
		<TextField
			autoFocus={autoFocus}
			className={classes.textField}
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
			<Link to={`/company/${company.id}`} className={classes.suggestionItemLink}>
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
export default class CompaniesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isWorkingTimeDialogOpened: false,
			cities: [],
			openConfirm: false,
			daysOfWeekWorkingTime: [],
			company: {}
		};
	}

	componentDidMount() {
		const searchParams = new URLSearchParams(this.props.location.search);
		this.props.updateStateWithUrlSource(searchParams);
		this.props.loadCompanies();
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

    handleAction = (company) => {
		this.setState({ openConfirm: true, company });
	};

	handleCloseWorkingTimeDialog = () => {
		this.setState({
			isWorkingTimeDialogOpened: false
		})
	};

	deleteCompany = () => {
		this.props.removeCompany(this.state.company.companyId);
	};

	blockCompany = () => {
		// action to block company
	};

	render() {
		const {t, classes} = this.props;

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
							this.props.main.companies.map(company => {
								return (
									<CompanyItem 
										key={company.companyId}
										company={company}
										deleteAction={this.deleteCompany}
										blockAction={this.blockCompany}
										handleOpenWorkingTimeDialog={this.handleOpenWorkingTimeDialog}
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
						addCity={this.props.addCity}
						removeCity={this.props.removeCity}

						setIsWorkingNow={this.props.setIsWorkingNow}

						updateUrlWithStateSource={this.props.updateUrlWithStateSource}

						loadCompanies={this.props.loadCompanies}
					/>
				</Grid>


				<Dialog open={this.state.isWorkingTimeDialogOpened} onRequestClose={this.handleCloseWorkingTimeDialog}>
					<DialogTitle>
						<Label fontSize="1.5rem">{t('WORKING_TIME')}</Label>
					</DialogTitle>
					<DialogContent className={classes.flexColumn}>
						{
							this.state.daysOfWeekWorkingTime.map(dayWorkingTime => (
								<div key={dayWorkingTime.dayOfWeek} className={classNames(classes.flexRow, "mt-2")}>
									<Label>{dayWorkingTime.dayOfWeekName}</Label>
									<Label className="ml-3">{`${dayWorkingTime.openTime} - ${dayWorkingTime.closeTime}`}</Label>
								</div>
							))
						}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCloseWorkingTimeDialog} color="primary">
							{t('CLOSE')}
						</Button>
					</DialogActions>
				</Dialog>

				<ConfirmDialog
					open={this.state.openConfirm}
					message={this.state.company.message}
					title={this.state.company.title}
					okCallback={this.state.company.action}
					closeCallback={() => this.setState({ openConfirm: false })}/>
			</Grid>
		);
	}
}