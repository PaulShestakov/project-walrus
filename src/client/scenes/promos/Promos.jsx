import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesome from 'react-fontawesome';

import { Grid, Row, Col, Form, OverlayTrigger, Popover, Button as BootstrapButton, FormGroup, Checkbox, Overlay } from 'react-bootstrap';
import { Title, Button, Card, Label, Textarea } from 'components';

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
        this.props.loadPromos();
        if (!this.props.animals) {
            console.log('Load code values');
            this.props.loadCodeValues();
        }
	}

	animalChanged = e => {
		this.props.loadBreeds(e.target.value);
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
								<Button accent="blue" className="ml-2 text-white">
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
						<SideBar onAnimalChange={this.animalChanged.bind(this)}
								 animals={this.props.animals}
								 cities={this.props.cities}
								 breeds={this.props.breeds} />
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Promos;

