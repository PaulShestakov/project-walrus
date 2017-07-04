import React from 'react';
import { translate } from 'react-i18next';

import { Checkbox, Grid, Row, FormControl, FormGroup, Radio, Form, Button } from 'react-bootstrap';
import Title from '../../components/title/Title.jsx';
import RadioGroup from '../../components/radioGroup/RadioGroup.jsx';

import LostPromo from './detailedViews/LostPromo.jsx';
import BuyPromo from './detailedViews/BuyPromo.jsx';

import Text from '../../components/text/Text';
import Separator from '../../components/separator/Separator';



@translate(['newPromo'])
class NewPromo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handlePromoTypeSelected = (promoTypeId) => {
		this.setState({promoTypeId});
		switch(promoTypeId) {
			case 'LOST':
				this.setState({
					city: null,
					foundAddress: null,
					foundTime: null,
					gender: null,
					approximateAge: null,
					description: null,
					personName: null,
					personPhone: null
				});
				break;
		}
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
	};

	handleInputChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		this.setState({
			[name]: value
		});
	};

	render() {
		const t = this.props.t;

		return (
			<Grid>
				<Row><Title tag='h4' text={t('PROMO_TYPE')} className="mediumMarginTop" /></Row>

				<Row>
					<RadioGroup
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
				</Row>

				<Row>
					<Separator className="mediumMarginBottom"/>
				</Row>

				<Row>
					<Title text={t('PROMO_NAME')} />
					<FormControl type='text'
						 name="promoName"
						 placeholder={t('ENTER_PROMO_NAME')}
						 onChange={this.handleInputChange} />
				</Row>

				{
					(this.state.promoTypeId === 'LOST' && <LostPromo handleInputChange={this.handleInputChange}/>)
					||
					(this.state.promoTypeId === 'BUY' && <BuyPromo />)
				}

				{
					(this.state.promoTypeId && <Row><Button type="submit" onClick={this.handleFormSubmit}>Submit</Button></Row>)
				}


			</Grid>

		);
	}
}

export default NewPromo



