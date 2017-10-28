import React from 'react';
import {connect} from 'react-redux';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import { Pets, Extension, ShoppingCart, Healing, Favorite, Assignment } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';
import Category from "./components/CompanyType/index";
import {Paper} from "material-ui";


@translate(['common'])
@withStyles(styles)
class CompaniesOverviewContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabIndex: 0
		}
	}

	componentWillReceiveProps(nextProps) {
		const params = new URLSearchParams(nextProps.location.search);
		const category = params.get('companyCategoryId');
		let categoryIndex = 0;
		const { companiesCategories } = nextProps.common;
		if (!category && companiesCategories.length > 0) {
			return this.changeUrl(companiesCategories[categoryIndex].value);
		}
		if (category) {
			companiesCategories.forEach((type, index) => {
				if (type.value === category) {
					categoryIndex = index;
				}
			});
		}
		this.setState({ selectedTabIndex: categoryIndex });
	}

	handleTabPress = (event, index) => {
		this.changeUrl(this.props.common.companiesCategories[index].value);
	};

	changeUrl = (companyCategoryId) => {
		const params = new URLSearchParams(this.props.location.search);
		params.set('companyCategoryId', companyCategoryId);
		this.props.history.push({
			pathname: this.props.location.pathname,
			search: params.toString()
		});
	};

	render() {
		const {t, classes, match, common, ...other} = this.props;

		const icons = [
			<Healing className={classes.tabIcon} />,
			<Favorite className={classes.tabIcon} />,
			<ShoppingCart className={classes.tabIcon} />,
			<Pets className={classes.tabIcon} />,
			<Assignment className={classes.tabIcon} />,
			<Extension className={classes.tabIcon} />
		];

		return (
			<Card className="my-4">
				<Paper>
					<Tabs indicatorColor="primary"
						  textColor="primary"
						  value={this.state.selectedTabIndex}
						  onChange={this.handleTabPress}
						  fullWidth>
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
				<SwipeableViews index={this.state.selectedTabIndex} onChangeIndex={this.handleTabPress}>
					{
						common.companiesCategories.map(category => {
							return (
								<Category key={category.value} type={category} location={location}/>
							);
						})
					}
				</SwipeableViews>
			</Card>
		);
	}
}

const CompaniesOverview = connect(
	state => {
		return {
			...state
		};
	},
	{

	}
)(CompaniesOverviewContainer);

export default CompaniesOverview;