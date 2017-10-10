import React from 'react';
import {connect} from 'react-redux';

import PromosComponent from '../../scenes/promos/PromoPage';
import {loadPromo} from "../../actionCreators/promoPage/promoPage";

const PromoPage = connect(
	state => {
		return state.promoPage;
	},
	{
		loadPromo
	}
)(PromosComponent);

export default PromoPage;