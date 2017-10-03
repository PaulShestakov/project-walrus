import React from 'react';
import {connect} from 'react-redux';

import CompanyRoute from "../../scenes/companies/CompanyRoute";
import {loadCompaniesCodeValues, loadUserInfo} from "../../actionCreators/common";

const CompanyContainer = connect(
	state => {
		return {
			common : state.common
		};
	},
	{
		loadUserInfo,
		loadCompaniesCodeValues
	}
)(CompanyRoute);

export default CompanyContainer;