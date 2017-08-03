import React from 'react';
import { translate } from 'react-i18next';
import _ from 'lodash';

import LostPromo from './components/LostPromo.jsx';
import FoundPromo from './components/FoundPromo.jsx';
import BuyOrSellPromo from './components/BuyOrSellPromo.jsx';
import GiveOrAcceptGiftPromo from './components/GiveOrAcceptGiftPromo.jsx';
import ImageUploader from 'imageUploader/ImageUploader';
import Title from "../../components/title/Title";
import Input from "../../components/input/input/Input";
import Textarea from "../../components/input/textarea/Textarea";
import {Col, Form, FormControl, FormGroup, Grid, Label, Row} from "react-bootstrap";
import Tabs from "../../components/tabs/Tabs";
import Button from "../../components/button/Button";



@translate(['newPromo', 'common'])
class NewPromo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            promoType: 'LOST',
            imageObjects: []
        };
	}

	componentDidMount() {
        this.props.loadCodeValues();
        this.props.loadBreeds('DOG')
	}

	handleImageAdd = (imageObject) => {
		this.setState({imageObjects: [...this.state.imageObjects, imageObject]});
	};

	handleImageDelete = (imageIndex) => {
		this.setState({
			imageObjects: [
				...this.state.imageObjects.slice(0, imageIndex),
				...this.state.imageObjects.slice(imageIndex + 1)
			]
		});
	};

	handlePromoTypeSelected = (promoType) => {
		this.setState({promoType});
	};

	handleInputChange = (imageObjects) => {
		this.setState({imageObjects});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const formElements = e.target.elements;

		const formData = {
			animal:			_.get(formElements.animal, 'value', null),
            breed:			_.get(formElements.breed, 'value', null),

			address:		_.get(formElements.address, 'value', null),
			date:			_.get(formElements.date, 'value', null),

			gender:			_.get(formElements.gender, 'value', null),
			age:			parseInt(_.get(formElements.age, 'value', -1)),

			price:			_.get(formElements.price, 'value', null),

			description:	_.get(formElements.description, 'value', null),
			title:			_.get(formElements.title, 'value', null),
			city:			_.get(formElements.city, 'value', null),
			type:			this.state.promoType,
			status:			'ACTIVE',
			userId:			1,

			images:	this.state.imageObjects.map(imageObject => imageObject.file)
		};

		this.props.handleSubmit(formData);
		this.props.goToPromos();
	};

	render() {
		const t = this.props.t;

		return (
			<Grid>
				<Row>
					<Col md={12}>
						<Form onSubmit={this.handleSubmit}>
							<Tabs activeKey={this.state.promoType}
								onSelect={this.handlePromoTypeSelected}
								className="mt-5"
								options={[
									{
										key: "LOST",
										tabTitle: t('LOST')
									},
									{
										key: "FOUND",
										tabTitle: t('FOUND')
									},
									{
										key: "BUY",
										tabTitle: t('WILL_BUY')
									},
									{
										key: "SELL",
										tabTitle: t('WILL_SELL')
									},
									{
										key: "GIVE_GIFT",
										tabTitle: t('WILL_GIVE_GIFT')
									},
									{
										key: "ACCEPT_GIFT",
										tabTitle: t('WILL_ACCEPT_GIFT')
									}
								]}
							/>

							<Title text={t('PROMO_NAME')} className="mt-5" />
							<Input name="title" placeholder={t('PROMO_NAME')} />

							<Title text={t('SELECT_PET')} className="mt-5"/>
							<FormControl name="animal"
										 onChange={e => this.props.loadBreeds(e.target.value)}
										 componentClass="select">
                                {
                                    this.props.animals && this.props.animals.map((item, index) => (
										<option value={item.animalId} selected={item.animalId === 'DOG'}>{item.name}</option>
                                    ))
                                }
							</FormControl>

							<Title text={t('SELECT_BREED')} className="mt-5"/>
							<FormControl name="breed" componentClass="select">
                                {
                                    this.props.breeds && this.props.breeds.map((item, index) => (
										<option value={item.breedId}>{item.name}</option>
                                    ))
                                }
							</FormControl>

							<Title text={t('CITY')} className="mt-5" />
							<FormControl name="city" componentClass="select" placeholder={t('ENTER_CITY')}>
                                {
                                	this.props.cities && this.props.cities.map((item, index) => (
										<option value={item.cityId} selected={item.cityId === 'Minsk'}>{item.name}</option>
                                	))
                                }
							</FormControl>

							{
								(this.state.promoType === 'LOST'
									&& <LostPromo  />)
								||
								(this.state.promoType === 'FOUND'
									&& <FoundPromo />)
								||
								((this.state.promoType === 'BUY' || this.state.promoType === 'SELL')
									&& <BuyOrSellPromo />)
								||
								((this.state.promoType === 'GIVE_GIFT' || this.state.promoType === 'ACCEPT_GIFT')
									&& <GiveOrAcceptGiftPromo />)
							}

							<Title text={t('DESCRIPTION')} className="mt-4" />
							<Textarea name="description" placeholder={t('ENTER_DESCRIPTION')} />

							<ImageUploader className="mt-5"
										   imageObjects={this.state.imageObjects}
										   onImageAdd={this.handleImageAdd}
										   onImageDelete={this.handleImageDelete} />

							<div className="d-flex justify-content-around">
								<Button type="submit"
									className="my-5 text-white"
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



