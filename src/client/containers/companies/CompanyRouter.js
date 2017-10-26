import React from 'react';
import {connect} from 'react-redux';

import CompanyRouterComponent from "../../scenes/companies";
import {
	loadCompaniesCodeValues,
	loadUserInfo,
	closeUnauthorizedDialog
} from "../../actionCreators/common";

const CompanyRouter = connect(
	state => {
		return {
			common : state.common
		};
	},
	{
		loadUserInfo,
		loadCompaniesCodeValues,
		closeUnauthorizedDialog,
	}
)(CompanyRouterComponent);

export default CompanyRouter;