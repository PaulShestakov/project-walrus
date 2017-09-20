import React from 'react';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import AppBar from 'material-ui/AppBar';

import LostPromo from './components/LostPromo.jsx';
import FoundPromo from './components/FoundPromo.jsx';
import BuyOrSellPromo from './components/BuyOrSellPromo.jsx';
import GiveOrAcceptGiftPromo from './components/GiveOrAcceptGiftPromo.jsx';

import styles from './styles';

const PROMOS_TYPES = [
	'SELL',
	'BUY',
	'GIVE_GIFT',
	'ACCEPT_GIFT',
	'LOST',
	'FOUND'
];

@translate(['newPromo', 'common'])
@withStyles(styles)
export default class NewPromo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            selectedPromoType: PROMOS_TYPES[0],
			selectedTabIndex: 0,

			selectedAnimalId: null,
			selectedAnimalLabel: null,

			selectedBreedId: null,
			selectedBreedLabel: null,

			selectedCityId: null,
			selectedCityLabel: null,

			imageObjects: []
        };
	}

	componentDidMount() {
        this.props.loadPromoCodeValues();
	}

	handleImageAdd = (imageObject) => {
		this.setState({
			imageObjects: [...this.state.imageObjects, imageObject]
		});
	};
	handleImageDelete = (imageIndex) => {
		this.setState({
			imageObjects: [
				...this.state.imageObjects.slice(0, imageIndex),
				...this.state.imageObjects.slice(imageIndex + 1)
			]
		});
	};

	handleTabPress = (event, index) => {
		this.setState({
			selectedPromoType: PROMOS_TYPES[index],
			selectedTabIndex: index
		});
	};

	handleInputChange = (imageObjects) => {
		this.setState({
			imageObjects
		});
	};

	/**
	 * Dropdown selects handlers
	 */
	handleSelectAnimal = (option) => {
		this.setState({
			selectedAnimalId: option.value,
			selectedAnimalLabel: option.label,

			selectedBreedId: null,
			selectedBreedLabel: null
		});
		this.props.loadBreeds(option.value);
	};
	handleSelectBreed = (option) => {
		this.setState({
			selectedBreedId: option.value,
			selectedBreedLabel: option.label
		});
	};
	handleSelectCity = (option) => {
		this.setState({
			selectedCityId: option.value,
			selectedCityLabel: option.label
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const formElements = e.target.elements;

		const formData = {
			animal: this.state.selectedAnimalId,
            breed: this.state.selectedBreedId,

			address: _.get(formElements.address, 'value', null),
			date: _.get(formElements.date, 'value', null),

			gender: _.get(formElements.gender, 'value', null),
			age: parseInt(_.get(formElements.age, 'value', -1)),

			price: _.get(formElements.price, 'value', null),

			description: _.get(formElements.description, 'value', null),
			title: _.get(formElements.title, 'value', null),
			city: this.state.selectedCityId,
			type: this.state.selectedPromoType,
			status: 'ACTIVE',
			userId: 1,

			images:	this.state.imageObjects.map(imageObject => imageObject.file)
		};

		this.props.handleSubmit(formData);
		this.props.goToPromos();
	};

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<form onSubmit={this.handleSubmit} className="d-flex-column align-items-center">
				<Grid md={9} container>
					<Grid md={12} item>

						<Card className="my-4">
							<AppBar position="static" color="white">
								<Tabs value={this.state.selectedTabIndex}
									onChange={this.handleTabPress}
									indicatorColor="primary"
									textColor="primary"
									fullWidth
									classes={{
										root: classes.tabs
									}}
								>
									<Tab label={t('common:WILL_SELL')} />
									<Tab label={t('common:WILL_BUY')} />
									<Tab label={t('common:WILL_GIVE_GIFT')} />
									<Tab label={t('common:WILL_ACCEPT_GIFT')} />
									<Tab label={t('common:LOST')} />
									<Tab label={t('common:FOUND')} />
								</Tabs>
							</AppBar>


							<div className="m-3 mt-4">
								<Grid md={12} spacing={24} container direction="column" className="m-0">
									<Grid md={12} item>
										<Title>{t('PROMO_NAME')}</Title>
										<Input name="title" placeholder={t('PROMO_NAME')} fullWidth className="mt-2"/>
									</Grid>

									<Grid item md={12}>
										<Title>{t('SELECT_ANIMAL')}</Title>
										<Dropdown name="animal"
											value={this.state.selectedAnimalLabel}
											onChange={this.handleSelectAnimal}
											options={this.props.animals}
											placeholder={t('SELECT_ANIMAL')}
											className="mt-2"/>
									</Grid>

									<Grid item md={12}>
										<Title>{t('SELECT_BREED')}</Title>
										<Dropdown name="breed"
											disabled={!this.props.breeds}
											value={this.state.selectedBreedLabel}
											onChange={this.handleSelectBreed}
											options={this.props.breeds}
											placeholder={t('SELECT_BREED')}
											className="mt-2" />
									</Grid>

									<Grid item md={12}>
										<Title>{t('ENTER_CITY')}</Title>
										<Dropdown name="city"
											value={this.state.selectedCityLabel}
											onChange={this.handleSelectCity}
											options={this.props.cities}
											placeholder={t('SELECT_CITY')}
											className="mt-2"/>
									</Grid>

									<Grid item md={12}>
										{
											(this.state.selectedPromoType === 'LOST' && <LostPromo />)
											||
											(this.state.selectedPromoType === 'FOUND' && <FoundPromo />)
											||
											((this.state.selectedPromoType === 'BUY' || this.state.selectedPromoType === 'SELL') && <BuyOrSellPromo />)
											||
											((this.state.selectedPromoType === 'GIVE_GIFT' || this.state.selectedPromoType === 'ACCEPT_GIFT') && <GiveOrAcceptGiftPromo />)
										}
									</Grid>

									<Grid item md={12}>
										<Title>{t('DESCRIPTION')}</Title>
										<TextField multiline name="description" fullWidth placeholder={t('ENTER_DESCRIPTION')} className="mt-1" />
									</Grid>

									<Grid item md={12}>
										<ImageUploader className="mt-4"
											imageObjects={this.state.imageObjects}
											onImageAdd={this.handleImageAdd}
											onImageDelete={this.handleImageDelete} />
									</Grid>

									<Grid item md={12} className="mb-1">
										<Grid container justify="center">
											<Grid item>
												<Button type="submit" className="my-1 text-white" bsSize="large" accent="blue">
													{t('PUBLISH')}
												</Button>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</div>
						</Card>
					</Grid>
				</Grid>
			</form>
		);
	}
}