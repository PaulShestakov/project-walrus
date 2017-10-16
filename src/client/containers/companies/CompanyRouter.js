import React from 'react';
import {connect} from 'react-redux';

import CompanyRouterComponent from "../../scenes/Companies/index";
import {
	loadCompaniesCodeValues,
	loadUserInfo
} from "../../actionCreators/common";

const CompanyRouter = connect(
	state => {
		return {
			common : state.common
		};
	},
	{
		loadUserInfo,
		loadCompaniesCodeValues
	}
)(CompanyRouterComponent);

export default CompanyRouter;