import React from 'react';
import { connect } from 'react-redux';
import {loadPromos} from './actionCreators/promosList';
import {loadBreeds} from "./actionCreators/filter";
import {loadPromoCodeValues} from "../../common/actions";
import {
	onFilterChange,
	onAnimalSelected,

	setAnimal,
	setPromoType,
	addBreed,
	removeBreed,
	addCity,
	removeCity,

	updateUrlWithStateSource,

	updateFilterStateWithUrlSource
} from "./actionCreators/filter";

import { translate } from 'react-i18next';
import { Grid, Title, Button, Card, Label, Textarea, TextField, Input } from 'components';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import SideBar from "./components/sidebar/index";
import Tabs, { Tab } from 'material-ui/Tabs';

import styles from './styles';
import PromoItem from "./components/promoItem/index";

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
class PromosListContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const searchParams = new URLSearchParams(this.props.location.search);

		this.props.loadPromoCodeValues();

		if ([...searchParams.keys()].length > 0) {
			this.props.updateFilterStateWithUrlSource(searchParams);

			if (searchParams.get('animalId')) {
				this.props.loadBreeds(searchParams.get('animalId'));
			}
		}
		else {
			this.props.updateUrlWithStateSource(this.props.history);
		}

		this.props.loadPromos();
	}

	handleTabPress = (event, index) => {
		this.props.setPromoType(PROMOS_TYPES[index]);

		this.props.updateUrlWithStateSource(this.props.history);

		this.props.loadPromos();
	};

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Grid container className="my-4" {...other}>
				<Grid item md={9}>
					<Card className={classes.searchHeader}>
						<Input placeholder={t('SECTION_SEARCH')}
							className={classNames(classes.searchInput, 'm-2', 'mt-3')} />

						<Tabs value={PROMOS_TYPES.indexOf(this.props.filter.selectedPromoTypeId)}
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
						this.props.main.promos &&
						this.props.main.promos.map(promo => {
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

						setAnimal={this.props.setAnimal}
						addBreed={this.props.addBreed}
						removeBreed={this.props.removeBreed}
						addCity={this.props.addCity}
						removeCity={this.props.removeCity}

						updateUrlWithStateSource={this.props.updateUrlWithStateSource}

						history={this.props.history}

						loadPromos={this.props.loadPromos}
					/>
				</Grid>
			</Grid>
		);
	}
}

const PromosList = connect(
	state => {
		return {
			main: state.promosList.main,
			filter: state.promosList.filter,
			common: state.common
		}
	},
	{
		loadPromoCodeValues,
		loadPromos,
		loadBreeds,
		onFilterChange,
		onAnimalSelected,

		setAnimal,
		setPromoType,
		addBreed,
		removeBreed,
		addCity,
		removeCity,

		updateUrlWithStateSource,

		updateFilterStateWithUrlSource
	}
)(PromosListContainer);

export default PromosList;