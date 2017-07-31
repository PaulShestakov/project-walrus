import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';

import { Grid, Row, Col, Form, OverlayTrigger, Popover, Button as BootstrapButton, FormGroup, Checkbox, Overlay } from 'react-bootstrap';
import { Title, Button, Card, Label, Textarea } from 'components';

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


		if (['cities', 'breeds'].indexOf(target.name) > 0) {
			let checked = target.checked;
			let value = target.value;

			if (checked) {
				filter[target.name].push(value);
			} else {
				let index = filter[target.name].indexOf(value);
				filter[target.name].splice(index, 1);
			}
		}
		else if (target.name === 'animal') {
			filter.breeds = [];
			filter.animal = target.value;

			this.props.loadBreeds(target.value);
		}

		this.setState({filter});
		this.props.history.push({search : buildUrl(null, this.state.filter)});
		this.props.loadPromos(this.state.filter);
	};

	render() {
		const t = this.props.t;

		return (
			<Grid className="my-3">
				<Row>
					<Col md={9}>
						<Row>
							<Col md={12} className="d-flex">
								<SearchInput placeholder={t('promos:ENTER_REQUEST')} />
								<Button accent="blue" className="ml-2 text-white">
									{t('promos:FIND')}
								</Button>
							</Col>
						</Row>
						{
							<Row className="my-3">
								<Col md={12}>
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
								</Col>
							</Row>
						}
					</Col>

					<Col md={3}>
						<SideBar onFilterChanged={this.handleFilterChanged}
							 animals={this.props.animals}
							 cities={this.props.cities}
							 breeds={this.props.breeds}
							 filter={this.state.filter} />
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Promos;

