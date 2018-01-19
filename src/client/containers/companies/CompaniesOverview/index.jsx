import React from 'react';
import {connect} from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import {
	Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Text, Finder
} from 'components';
import defaultImage from '../../../assets/img/company-default.png';
import { Pets, ShoppingCart, Healing, Favorite, Work, Assignment } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';
import SubcategoriesView from './components/SubcategoriesView';
import {Paper, Typography} from 'material-ui';

import {
	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
} from '../CompaniesList/actions';
import Util from '../../util/index';
import { USER_ROLES, PAGES } from '../../util/constants';


@translate(['common'])
@withStyles(styles)
class CompaniesOverviewContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCategory: {},
			selectedTabIndex: 0,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { match, common: { companiesCategories } } = nextProps;
		const category = match.params.companyCategoryId;
		let categoryIndex = 0;
		let foundCategory = this.state.selectedCategory;
		if (category) {
			companiesCategories.forEach((type, index) => {
				if (type.value.toUpperCase() === category.toUpperCase()) {
					categoryIndex = index;
					foundCategory = type;
				}
			});
		}
		this.setState({
			selectedTabIndex: categoryIndex,
			selectedCategory: foundCategory
		});
	}

    handleSuggestionsFetchRequested = (change) => {
    	if (this.props.main.suggestionInputValue !== change.value) {
    		this.props.fuzzySearchLoadCompanies({
    			searchQuery: change.value,
    		});
    	}
    };
	
	handleAddNewCompany = () => {
		if (this.props.common.user.role === USER_ROLES.ROLE_ADMIN) {
			this.props.history.push('/company/new');
		} else {
			window.location = PAGES.ADD_CATALOGS;
		}
	};

    handleChange = (event, { newValue }) => {
    	this.props.suggestionInputValueChange(newValue);
    };

	handleTabPress = (event, index) => {
		const { history, common: { companiesCategories } } = this.props;
		const category = companiesCategories[index];
		this.setState({ selectedCategory: category });
		history.push('/company/' + category.value.toLowerCase());
	};

	render() {
		const { classes, common, match, clearFuzzySearchLoadedCompanies } = this.props;

		const icons = [
			<Healing key={1} className={classes.tabIcon} />,
			<ShoppingCart key={2} className={classes.tabIcon} />,
			<Favorite key={3} className={classes.tabIcon} />,
			<Pets key={4} className={classes.tabIcon} />,
			<Work key={5} className={classes.tabIcon} />,
			<Assignment key={6} className={classes.tabIcon} />,
		];

		return (
			<div className="my-3 mb-5">
				<Typography component="h1" className={classes.h1Style}>
					{this.state.selectedCategory.label}
				</Typography>
				<Text className="my-3">
					{this.state.selectedCategory.description}
				</Text>
				<Grid container={true} spacing={8} className="my-3">
					<Grid item={true} xs={9} className={classes.searchInputWrapper}>
						<Card>
							<Finder
								values={this.props.main.fuzzySearchCompanies}
								placeholder="Поиск компании"
								value={this.props.main.suggestionInputValue}
								onChange={this.handleChange}
								handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
								handleSuggestionsClearRequested={clearFuzzySearchLoadedCompanies}
								suggestionData={{
									getLink: company => `/company/${company.categoryId.toLowerCase()}/${company.subcategoryId.toLowerCase()}/company/${company.url_id}`,
									getLogo: company => Util.encodeUrl(company.logo, defaultImage),
									getTitle: company => company.name,
									getDescription: company => company.description
								}} />
						</Card>
					</Grid>
					<Grid item={true} xs={3}>
						<Button
							accent="red"
							disableRipple={true}
							onClick={this.handleAddNewCompany}
							className="w-100 h-100 mb-2">

							<FontAwesome name="plus" className="mr-1" /> Добавить компанию

						</Button>
					</Grid>
				</Grid>
				<Card>
					<Paper>
						<Tabs indicatorColor="primary"
							textColor="primary"
							scrollable={true}
							value={this.state.selectedTabIndex}
							onChange={this.handleTabPress}
							fullWidth={true}>
							{
								common.companiesCategories.map((category, index) => (
									<Tab key={category.value}
										className={classes.tab}
										classes={{label: classes.tabLabel, labelContainer: classes.tabLabelContainer}}
										label={category.label}
										icon={icons[index]} />
								))
							}
						</Tabs>
					</Paper>
					<SwipeableViews
						animateHeight={true}
						index={this.state.selectedTabIndex}
						onChangeIndex={this.handleTabPress}>
						{
							common.companiesCategories.map(category => {
								return (
									<SubcategoriesView key={category.value}
										subcategories={category.subcategories}
										match={match} />
								);
							})
						}
					</SwipeableViews>
				</Card>
			</div>
		);
	}
}

const CompaniesOverview = connect(
	state => {
		return {
			common: state.common,
			main: state.companiesList,
		};
	},
	{
		suggestionInputValueChange,
		fuzzySearchLoadCompanies,
		clearFuzzySearchLoadedCompanies,
	}
)(CompaniesOverviewContainer);

export default CompaniesOverview;
