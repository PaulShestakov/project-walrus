import React from 'react';
import {connect} from 'react-redux';

import CompanyPageComponent from '../../scenes/companies/companyPage/CompanyPage';
import {loadPromo} from "../../actionCreators/companyPage/promoPage";

const CompanyPage = connect(
	state => {
		return state.promo
	},
	{
		loadPromo
	}
)(PromosComponent);

export default PromoPage;