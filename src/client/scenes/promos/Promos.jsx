import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';

import { Grid, Row, Col, Form, OverlayTrigger, Popover, Button as BootstrapButton, FormGroup, Checkbox, Overlay } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import RadioGroup from '../../components/radioGroup/RadioGroup.jsx';
import Button from 'button/Button';
import Card from 'card/Card';
import Label from 'label/Label';
import Separator from 'separator/Separator';


import PromoItem from './components/promoItem/PromoItem';
import SearchInput from './components/searchInput/SearchInput';
import SideBar from "./components/sidebar/SideBar";


@translate(['promos'])
class Promos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
        this.props.requestPromos();
        if (!this.props.animals) {
            console.log('Load code values');
            this.props.loadCodeValues();
        }
	}

	animalChanged = e => {
		console.log(e.target);
		this.props.loadBreeds('DOG');
	};

	handleClick = e => {
		this.setState({ target: e.target, show: !this.state.show });
	};

	render() {
		const t = this.props.t;

		return (
			<Grid className="my-3">
				<Row>
					<Col md={9}>
						<Row>
							<Col md={12} className="d-flex">
								<SearchInput placeholder={t('ENTER_REQUEST')} />
								<Button accent="blue" className="ml-2">
									{t('FIND')}
								</Button>
							</Col>
						</Row>
						{/*<Row className="my-3">
							<Col md={12}>
								{
									this.props.promos.map(promo => {
										return (
											<PromoItem item={promo}
											   className="my-3"/>
										);
									})
								}
							</Col>
						</Row>*/}
					</Col>

					<Col md={3}>
						<SideBar onAnimalChange={this.animalChanged.bind(this)} animals={this.props.animals} cities={this.props.cities} />
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Promos;

