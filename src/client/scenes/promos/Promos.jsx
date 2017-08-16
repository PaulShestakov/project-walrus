import React from 'react';
import { translate } from 'react-i18next';
import { Grid, Title, Button, Card, Label, Textarea, TextField, Input } from 'components';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';

import SideBar from "./components/sidebar/SideBar";

import Tabs, { Tab } from 'material-ui/Tabs';

import {buildUrl} from "../../actionCreators/promos";

import styleSheet from './style';

@translate(['promos', 'common'])
@withStyles(styleSheet)
class Promos extends React.Component {
	constructor(props) {
		super(props);
		this.types = [
			'ALL',
            'SELL',
            'BUY',
            'GIVE_GIFT',
			'ACCEPT_GIFT',
            'LOST',
			'FOUND'
		];

		this.state = {
			filter: {
                type: this.types[0],
				animal: 'ALL',
				breeds: [],
				cities: []
			}
		};

        this.props.history.push({search : buildUrl(null, this.state.filter)});
	}

	componentDidMount() {
        this.props.loadPromos(this.state.filter);
		this.props.loadCodeValues();
		this.props.loadBreeds(this.state.filter.animal);
	}

	handleFilterChanged = (event) => {
		let target = event.target;
		let filter = this.state.filter;

		let value = event.value;

		if (value) {
            filter.breeds = [];
            filter.animal = value;

            this.props.loadBreeds(value);

		} else if (['cities', 'breeds'].indexOf(target.name) > -1) {
			let checked = target.checked;
			let value = target.value;

			if (checked) {
				filter[target.name].push(value);
			} else {
				let index = filter[target.name].indexOf(value);
				filter[target.name].splice(index, 1);
			}
		}

		this.setState({filter});
		this.props.history.push({search : buildUrl(null, this.state.filter)});
		this.props.loadPromos(this.state.filter);
	};

	handleTabPress = (event, index) => {
		this.state.filter.type = this.types[index];
        this.handleFilterChanged(event);
	};

	render() {
		const { t, theme, classes, ...other } = this.props;

		return (
			<Grid container className="my-2" { ...other }>
				<Grid item md={9}>
					<Card>
						<Grid container direction="column">
							<Grid item>
								<div className="m-2">
									<Input placeholder={t('SECTION_SEARCH')} className={classNames(classes.searchInput, 'w-100')} />
								</div>
							</Grid>

							<Grid item>
								<Tabs
									index={this.types.indexOf(this.state.filter.type)}
									onChange={this.handleTabPress}
									indicatorColor="primary"
									textColor="primary"
									classes={{
										root: classes.tabs
									}}
								>
									<Tab label={t('common:ALL')} />
									<Tab label={t('common:WILL_SELL')} />
									<Tab label={t('common:WILL_BUY')} />
									<Tab label={t('common:WILL_GIVE_GIFT')} />
									<Tab label={t('common:WILL_ACCEPT_GIFT')} />
									<Tab label={t('common:LOST')} />
									<Tab label={t('common:FOUND')} />
								</Tabs>
							</Grid>
						</Grid>
					</Card>

				</Grid>

				<Grid item md={3}>
					<SideBar onFilterChanged={this.handleFilterChanged}
						animals={this.props.animals}
						cities={this.props.cities}
						breeds={this.props.breeds}
						filter={this.state.filter} />
				</Grid>
			</Grid>
		);
	}
}

export default Promos;