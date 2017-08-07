import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';

import { Form, OverlayTrigger, Popover, Button as BootstrapButton, FormGroup, Checkbox, Overlay } from 'react-bootstrap';
import { Grid, Title, Button, Card, Label, Textarea } from 'components';

import PromoItem from './components/promoItem/PromoItem';
import SearchInput from './components/searchInput/SearchInput';
import SideBar from "./components/sidebar/SideBar";
import {buildUrl} from "../../actionCreators/promos";


@translate(['common', 'promos'])
class Promos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter : {
				animal : 'DOG',
				breeds : [],
				cities : ['MINSK']
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

	render() {
		const t = this.props.t;

		return (
			<Grid container md="12">
				<Grid item md="9">
					<SearchInput placeholder={t('promos:ENTER_REQUEST')} />
					<Button accent="blue" className="ml-2 text-white">
						{t('promos:FIND')}
					</Button>

					{
						this.props.promos && this.props.promos.map(promo => {
							return (
								<Row>
									<PromoItem title={promo.title}
									   type={t(promo.type)}
									   imageSrc={promo.imageSrc}
									   date={promo.date}
									   description={promo.description}
									   price={promo.price}
									   className="my-3"/>
								</Row>

							);
						})
					}
				</Grid>

				<Grid item md="3">
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