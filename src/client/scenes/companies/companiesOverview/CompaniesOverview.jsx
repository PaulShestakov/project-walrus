import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';


@translate(['common'])
@withStyles(styles)
export default class CompaniesOverview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabIndex: 0
		}
	}

	componentDidMount() {
		this.props.loadCompaniesTypes();
	}

	handleTabPress = (event, index) => {
		this.setState({
			selectedTabIndex: index
		});
	};

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Card className="mt-4">
				<AppBar position="static" color="white">
					<Tabs
						value={this.state.selectedTabIndex}
						onChange={this.handleTabPress}
						indicatorColor="primary"
						textColor="primary"
						fullWidth
					>
					{
						this.props.common.companiesTypes.map(type => {
							return (
								<Tab label={type.companyTypeName} />
							);
						})
					}
					</Tabs>
				</AppBar>
				<SwipeableViews index={this.state.selectedTabIndex} onChangeIndex={this.handleChangeIndex}>
				{
					this.props.common.companiesTypes.map(type => {
						return (
							<div className={classes.exactTypesContainer}>
								{
									type.exactTypes.map(exactType => {
										return (
											<Link className={classes.exactTypeLink} to="/kek">{exactType.companyExactTypeName}</Link>
										);
									})
								}
							</div>
						);
					})
				}
				</SwipeableViews>
			</Card>
		);
	}
}