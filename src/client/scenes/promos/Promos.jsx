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


@translate(['promos'])
class Promos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
        this.props.requestPromos();
	}

	handleClick = e => {
		this.setState({ target: e.target, show: !this.state.show });
	};

	render() {
		const t = this.props.t;

		const petTypesPopover = (
			<Popover id="petType" title="Select pet">
				<FormGroup>
					<Checkbox inline>
						1
					</Checkbox>
					{' '}
					<Checkbox inline>
						2
					</Checkbox>
					{' '}
					<Checkbox inline>
						3
					</Checkbox>
				</FormGroup>
			</Popover>
		);

		return (
			<Grid className="my-3">
				<Row>
					<Col md={10}>
						<Row>
							<Col md={12} className="d-flex">
								<SearchInput placeholder={t('ENTER_REQUEST')} />
								<Button accent="blue" className="ml-2">
									{t('FIND')}
								</Button>
							</Col>
						</Row>
						<Row className="my-3">
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
						</Row>
					</Col>

					<Col md={2} className="pl-2">
						<Link to="/newPromo" className="mt-2">
							<Button accent="red">
								<FontAwesome name="plus" />
								{t('CREATE_PROMO')}
							</Button>
						</Link>

						<Card className="mt-2">
							<Label accent="blue" className="py-2 px-3">{t('FILTERS')}</Label>


							<OverlayTrigger trigger="click" placement="left" overlay={petTypesPopover} container={this}>
								<BootstrapButton>Select pet type</BootstrapButton>
							</OverlayTrigger>


							<Button onClick={this.handleClick}>
								Holy guacamole!
							</Button>

							<Overlay
								show={this.state.show}
								target={this.state.target}
								placement="bottom"
								container={this}
								containerPadding={20}
							>
								<Popover id="popover-contained" title="Popover bottom">
									<strong>Holy guacamole!</strong> Check this info.
								</Popover>
							</Overlay>
						</Card>
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default Promos;

