import React from 'react';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import RadioGroup from '../../components/radioGroup/RadioGroup.jsx';
import Button from '../../components/button/Button';
import Tabs from '../../components/tabs/Tabs';

import LostPromo from './components/LostPromo.jsx';
import FoundPromo from './components/FoundPromo.jsx';
import BuyOrSellPromo from './components/BuyOrSellPromo.jsx';
import GiveOrAcceptGiftPromo from './components/GiveOrAcceptGiftPromo.jsx';


@translate(['newPromo'])
class NewPromo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handlePromoTypeSelected = (promoTypeId) => {
		this.setState({promoTypeId});
	};

	handleImagesChange = (imageObjects) => {
		this.setState({imageObjects});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const formElements = e.target.elements;

		const formData = {
			// type:		'275c5e07-63ca-11e7-8224-bc5ff40f7ff3',
			// //type:		_.get(formElements.promoType, 'value', null),
			// title:		_.get(formElements.promoName, 'value', null),
			// city:			_.get(formElements.city, 'value', null),
			//
			// animal: 'animal',
			// breed: 'breed',
			// image: 'image',
			//
			// status: "026f16bc-63ca-11e7-8224-bc5ff40f7ff3",

			lostAddress:	_.get(formElements.lostAddress, 'value', null),
			lostTime:		_.get(formElements.lostTime, 'value', null),

			foundAddress:	_.get(formElements.foundAddress, 'value', null),
			foundTime:		_.get(formElements.foundTime, 'value', null),

			gender:			_.get(formElements.gender, 'value', null),
			approximateAge:	_.get(formElements.approximateAge, 'value', null),

			price:			_.get(formElements.price, 'value', null),

			personName:		_.get(formElements.personName, 'value', null),
			personAddress:	_.get(formElements.personAddress, 'value', null),
			personPhone:	_.get(formElements.personPhone, 'value', null),
			personEmail:	_.get(formElements.personEmail, 'value', null),

			description:	_.get(formElements.description, 'value', null),
			date: +new Date(),

			imageObjects: this.state.imageObjects
		};

		this.props.handleSubmit(formData);
	};

	render() {
		const t = this.props.t;

		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Form onSubmit={this.handleSubmit}>

							<Tabs defaultActiveKey="LOST"
								onSelect={this.handlePromoTypeSelected}
								className="mt-5"
								options={[
									{
										key: "LOST",
										tabTitle: t('LOST'),
										component: <LostPromo />
									},
									{
										key: "FOUND",
										tabTitle: t('FOUND'),
										component: <FoundPromo />
									},
									{
										key: "BUY",
										tabTitle: t('WILL_BUY'),
										component: <BuyOrSellPromo />
									},
									{
										key: "SELL",
										tabTitle: t('WILL_SELL'),
										component: <BuyOrSellPromo />
									},
									{
										key: "GIVE_GIFT",
										tabTitle: t('WILL_GIVE_GIFT'),
										component: <GiveOrAcceptGiftPromo />
									},
									{
										key: "ACCEPT_GIFT",
										tabTitle: t('WILL_ACCEPT_GIFT'),
										component: <GiveOrAcceptGiftPromo />
									}
								]}
							/>

							<div className="d-flex justify-content-around">
								<Button type="submit"
									className="my-5"
									bsSize="large"
									accent="blue">
									{t('PUBLISH')}
								</Button>
							</div>
						</Form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default NewPromo;



