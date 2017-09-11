import React from 'react';
import { translate } from 'react-i18next';
import { Grid, Title, Button, Card, Label, Textarea, TextField, Input } from 'components';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import SideBar from "./sidebar/SideBar";
import Tabs, { Tab } from 'material-ui/Tabs';

import styles from './styles';
import PromoItem from "./promoItem/PromoItem";

const PROMOS_TYPES = [
	'ALL',
	'SELL',
	'BUY',
	'GIVE_GIFT',
	'ACCEPT_GIFT',
	'LOST',
	'FOUND'
];

@translate(['promos', 'common'])
@withStyles(styles)
class Promos extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// selectedTabIndex: 0,
			// selectedPromoType: PROMOS_TYPES[0],
			//
			// currentFilter: {
			//
			// }
		};

        //this.props.history.push({search : buildUrl(null, this.state.filter)});
	}

	componentDidMount() {
		this.props.loadPromoCodeValues();
        // this.props.loadPromos(this.state.filter);
		// this.props.loadBreeds(this.state.filter.animal);
	}

	handleFilterChange = (event) => {
		let target = event.target;
		let filter = this.state.filter;

		let value = event.value;

		this.props.filterChange(target.name, event.value);

		// if (value) {
         //    filter.breeds = [];
         //    filter.animal = value;
		//
         //    this.props.loadBreeds(value);
		//
		// } else if (['cities', 'breeds'].indexOf(target.name) > -1) {
		// 	let checked = target.checked;
		// 	let value = target.value;
		//
		// 	if (checked) {
		// 		filter[target.name].push(value);
		// 	} else {
		// 		let index = filter[target.name].indexOf(value);
		// 		filter[target.name].splice(index, 1);
		// 	}
		// }
		//
		// this.setState({filter});
		// this.props.history.push({search : buildUrl(null, this.state.filter)});
		// this.props.loadPromos(this.state.filter);
	};

	handleTabPress = (event, index) => {
		this.setState({
			selectedTabIndex: index,
			selectedPromoType: PROMOS_TYPES[index]
		});
        this.handleFilterChange(event);
	};

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Grid container className="mt-4" {...other}>
				<Grid item md={9}>
					<Card className={classes.searchHeader}>
						<Input placeholder={t('SECTION_SEARCH')}
							className={classNames(classes.searchInput, 'm-2', 'mt-3')} />

						<Tabs value={this.state.selectedTabIndex}
							onChange={this.handleTabPress}
							indicatorColor="primary"
							textColor="primary"
							classes={{
								root: classes.tabs
							}}
						>
							<Tab label={t('common:ALL')}/>
							<Tab label={t('common:WILL_SELL')} />
							<Tab label={t('common:WILL_BUY')} />
							<Tab label={t('common:WILL_GIVE_GIFT')} />
							<Tab label={t('common:WILL_ACCEPT_GIFT')} />
							<Tab label={t('common:LOST')} />
							<Tab label={t('common:FOUND')} />
						</Tabs>
					</Card>
					{
						this.props.promos &&
						this.props.promos.map(promo => {
							return (
								<Card className="my-3">
									<PromoItem promo={promo} />
								</Card>
							);
						})
					}
				</Grid>

				<Grid item md={3}>
					<SideBar
						animals={this.props.common.animals}
						cities={this.props.common.cities}
						filter={this.props.filter}
						onFilterChange={this.props.onFilterChange}
						onAnimalSelected={this.props.onAnimalSelected}
						loadBreeds={this.props.loadBreeds}

					/>
				</Grid>
			</Grid>
		);
	}
}

export default Promos;