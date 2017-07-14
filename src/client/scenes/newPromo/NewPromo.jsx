import React from 'react';
import { translate } from 'react-i18next';

import { Grid, Row, Col, Form } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import RadioGroup from '../../components/radioGroup/RadioGroup.jsx';
import Button from '../../components/button/Button';

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
		this.setState({promoTypeId: promoTypeId});
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
							<Title tag='h4' text={t('PROMO_TYPE')} className="mt-4"/>
							<RadioGroup
								name="promoType"
								onChange={this.handlePromoTypeSelected}
								options={[
									{
										id: 'SELL',
										labelText: t('WILL_SELL')
									},
									{
										id: 'BUY',
										labelText: t('WILL_BUY')
									},
									{
										id: 'GIVE_GIFT',
										labelText: t('WILL_GIVE_GIFT')
									},
									{
										id: 'ACCEPT_GIFT',
										labelText: t('WILL_ACCEPT_GIFT')
									},
									{
										id: 'LOST',
										labelText: t('LOST')
									},
									{
										id: 'FOUND',
										labelText: t('FOUND')
									}
								]}
							/>

							{
								(this.state.promoTypeId === 'LOST'
								&& <LostPromo />)
								||
								(this.state.promoTypeId === 'FOUND'
								&& <FoundPromo />)
								||
								((this.state.promoTypeId === 'BUY' || this.state.promoTypeId === 'SELL')
								&& <BuyOrSellPromo />)
								||
								((this.state.promoTypeId === 'GIVE_GIFT' || this.state.promoTypeId === 'ACCEPT_GIFT')
								&& <GiveOrAcceptGiftPromo />)
							}

							{
								(this.state.promoTypeId &&
								<div className="d-flex justify-content-around">
									<Button type="submit"
										className="my-5"
										bsSize="large"
										accent="blue">
										{t('PUBLISH')}
									</Button>
								</div>)
							}
						</Form>
					</Col>
				</Row>
			</Grid>

		);
	}
}

export default NewPromo;



