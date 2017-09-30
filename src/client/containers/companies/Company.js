import React from 'react';
import {connect} from 'react-redux';

import CompanyRoute from "../../scenes/companies/CompanyRoute";
import {loadCompaniesCodeValues} from "../../actionCreators/common";

const CompanyContainer = connect(
	state => {
		return {
			common : state.common
		};
	},
	{
		loadCompaniesCodeValues
	}
)(CompanyRoute);

export default CompanyContainer;