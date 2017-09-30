import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import { Pets, Extension, ShoppingCart, Healing, Favorite, Assignment } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles';
import Category from "./Type";
import {Paper} from "material-ui";


@translate(['common'])
@withStyles(styles)
export default class CompaniesOverview extends React.Component {
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
        if (category && nextProps.common.companiesCategories) {
        	nextProps.common.companiesCategories.forEach((type, index) => {
        		if (type.value === category) {
                    categoryIndex = index;
				}
			});
		}
		this.setState({ selectedTabIndex: categoryIndex });
	}

	handleTabPress = (event, index) => {
        const params = new URLSearchParams(this.props.location.search);
        params.set('companyCategoryId', this.props.common.companiesCategories[index].value);
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
			<Card className="mt-4">
				<Paper>
					<Tabs indicatorColor="primary"
						textColor="primary"
						value={this.state.selectedTabIndex}
						onChange={this.handleTabPress}
						fullWidth>
                        {
                            common.companiesCategories.map((type, index) => (
								<Tab key={index}
									 className={classes.tab}
									 classes={{label: classes.tabLabel, labelContainer: classes.tabLabelContainer}}
									 label={type.label}
									 icon={icons[index]} />
                            ))
                        }
					</Tabs>
				</Paper>
				<SwipeableViews index={this.state.selectedTabIndex} onChangeIndex={this.handleChangeIndex}>
				{
                    common.companiesCategories && common.companiesCategories.map((type, index) => {
						return (
							<Category key={index} type={type} location={location}/>
						);
                    })
				}
				</SwipeableViews>
			</Card>
		);
	}
}