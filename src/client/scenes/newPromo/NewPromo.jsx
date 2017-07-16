import React from 'react';
import { translate } from 'react-i18next';

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

	handleSubmit = (e) => {
		e.preventDefault();
		const formElements = e.target.elements;

		this.props.handleSubmit(formElements);
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



