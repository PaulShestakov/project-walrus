import React from 'react';
import { connect } from 'react-redux';

import PromosListComponent from '../../scenes/promos/promosList/PromosList.jsx';
import {loadPromos} from '../../actionCreators/promosList/promosList';
import {loadBreeds} from "../../actionCreators/promosList/filter";
import {loadPromoCodeValues} from "../../actionCreators/common";
import {onFilterChange, onAnimalSelected} from "../../actionCreators/promosList/filter";

const PromosList = connect(
	state => {
		return {
			main: state.promosList.main,
			filter: state.promosList.filter,
			common: state.common.promoCodeValues
		}
	},
	{
		loadPromoCodeValues,
		loadPromos,
		loadBreeds,
		onFilterChange,
		onAnimalSelected
	}
)(PromosListComponent);

export default PromosList;