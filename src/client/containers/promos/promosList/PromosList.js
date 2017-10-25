import React from 'react';
import { connect } from 'react-redux';
import PromosListComponent from '../../../scenes/promos/PromosList';
import {loadPromos} from '../../../actionCreators/promos/promosList/promosList';
import {loadBreeds} from "../../../actionCreators/promos/promosList/filter";
import {loadPromoCodeValues} from "../../../actionCreators/common/common";
import {
	onFilterChange,
	onAnimalSelected,

	setAnimal,
	setPromoType,
	addBreed,
	removeBreed,
	addCity,
	removeCity,

	updateUrlWithStateSource,

	updateFilterStateWithUrlSource
} from "../../../actionCreators/promos/promosList/filter";

const PromosList = connect(
	state => {
		return {
			main: state.promosList.main,
			filter: state.promosList.filter,
			common: state.common
		}
	},
	{
		loadPromoCodeValues,
		loadPromos,
		loadBreeds,
		onFilterChange,
		onAnimalSelected,

		setAnimal,
		setPromoType,
		addBreed,
		removeBreed,
		addCity,
		removeCity,

		updateUrlWithStateSource,

		updateFilterStateWithUrlSource
	}
)(PromosListComponent);

export default PromosList;