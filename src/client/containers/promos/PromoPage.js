import React from 'react';
import { connect } from 'react-redux';

import PromosComponent from '../../scenes/promos/promoPage/PromoPage';
import {loadPromoCodeValues} from "../../actionCreators/common";

const PromoPage = connect(
	state => {
		return state.promo
	},
	{
		loadPromoCodeValues
	}
)(PromosComponent);

export default PromoPage;