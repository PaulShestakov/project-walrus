import React from 'react';
import { translate } from 'react-i18next';
import _ from 'lodash';

import LostPromo from './components/LostPromo.jsx';
import FoundPromo from './components/FoundPromo.jsx';
import BuyOrSellPromo from './components/BuyOrSellPromo.jsx';
import GiveOrAcceptGiftPromo from './components/GiveOrAcceptGiftPromo.jsx';

import { Dropdown, Button, Title, Input, Grid, ImageUploader } from "components";



@translate(['newPromo', 'common'])
class NewPromo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            promoType: 'LOST',
            imageObjects: [],
			animal : _.get(this.props.animals[0], 'id', null),
			city : _.get(this.props.cities[0], 'id', null)
        };
	}

	componentDidMount() {
        this.props.loadCodeValues();
        if (!this.state.breed) {
            this.props.loadBreeds(this.state.animal);
		}
	}

    componentWillReceiveProps(nextProps) {
		if (nextProps.breeds && !this.state.breed) {
			this.setState({  breed : _.get(nextProps.breeds[0], 'id', null) });
		}
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
			animal:			this.state.animal,
            breed:			this.state.breed,

			address:		_.get(formElements.address, 'value', null),
			date:			_.get(formElements.date, 'value', null),

			gender:			_.get(formElements.gender, 'value', null),
			age:			parseInt(_.get(formElements.age, 'value', -1)),

			price:			_.get(formElements.price, 'value', null),

			description:	_.get(formElements.description, 'value', null),
			title:			_.get(formElements.title, 'value', null),
			city:			this.state.city,
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
			<form onSubmit={this.handleSubmit}>
				<Grid container>
					<Grid item xs={12}>
						{/*<Tabs activeKey={this.state.promoType}*/}
							  {/*onSelect={this.handlePromoTypeSelected}*/}
							  {/*className="mt-5"*/}
							  {/*options={[*/}
								  {/*{*/}
									  {/*key: "LOST",*/}
									  {/*tabTitle: t('LOST')*/}
								  {/*},*/}
								  {/*{*/}
									  {/*key: "FOUND",*/}
									  {/*tabTitle: t('FOUND')*/}
								  {/*},*/}
								  {/*{*/}
									  {/*key: "BUY",*/}
									  {/*tabTitle: t('WILL_BUY')*/}
								  {/*},*/}
								  {/*{*/}
									  {/*key: "SELL",*/}
									  {/*tabTitle: t('WILL_SELL')*/}
								  {/*},*/}
								  {/*{*/}
									  {/*key: "GIVE_GIFT",*/}
									  {/*tabTitle: t('WILL_GIVE_GIFT')*/}
								  {/*},*/}
								  {/*{*/}
									  {/*key: "ACCEPT_GIFT",*/}
									  {/*tabTitle: t('WILL_ACCEPT_GIFT')*/}
								  {/*}*/}
							  {/*]}*/}
						{/*/>*/}
					</Grid>
					<Grid item xs={12}>
						<Title text={t('PROMO_NAME')} className="mt-5" />
						<Input name="title" placeholder={t('PROMO_NAME')} />
					</Grid>
					<Grid item xs={12}>
						<Title text={t('SELECT_PET')} className="mt-3"/>
						<Dropdown name="animal"
								  onChange={e => {
									  this.setState({ animal : e.value, breed : null });
									  this.props.loadBreeds(e.value);
								  }
								  }
								  options={this.props.animals}/>
					</Grid>
					<Grid item xs={12}>
						<Title text={t('SELECT_BREED')} className="mt-3"/>
						<Dropdown name="breed"
								  selectedOption={null}
								  onChange={e => this.setState({ breed : e.value })}
								  options={this.props.breeds}/>
					</Grid>
					<Grid item xs={12}>
						<Title text={t('ENTER_CITY')} className="mt-3"/>
						<Dropdown name="city"
								  onChange={e => this.setState({ city : e.value })}
								  options={this.props.cities}/>
					</Grid>
					<Grid item xs={12}>
						{
							(this.state.promoType === 'LOST' && <LostPromo  />)
							||
							(this.state.promoType === 'FOUND' && <FoundPromo />)
							||
							((this.state.promoType === 'BUY' || this.state.promoType === 'SELL') && <BuyOrSellPromo />)
							||
							(
								(this.state.promoType === 'GIVE_GIFT' || this.state.promoType === 'ACCEPT_GIFT') && <GiveOrAcceptGiftPromo />
							)
						}
					</Grid>
					<Grid item xs={12}>
						<Title text={t('DESCRIPTION')} className="mt-3"/>
						{/*<Textarea name="description" fullWidth placeholder={t('ENTER_DESCRIPTION')} />*/}
					</Grid>
					<Grid item xs={12}>
						<ImageUploader className="mt-5"
									   imageObjects={this.state.imageObjects}
									   onImageAdd={this.handleImageAdd}
									   onImageDelete={this.handleImageDelete} />
					</Grid>
					<Grid item xs={12}>
						<div className="d-flex justify-content-around">
							<Button type="submit"
									className="my-5 text-white"
									bsSize="large"
									accent="blue">
								{t('PUBLISH')}
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		);
	}
}

export default NewPromo;



