import React from 'react';
import {connect} from 'react-redux';

import CompaniesOverviewComponent from '../../scenes/companies/companiesOverview/CompaniesOverview';
import {loadCompaniesTypes} from "../../actionCreators/common";

const CompaniesOverview = connect(
	state => {
		return {
			main: state.companiesOverview,
			common: {
				companiesTypes: state.common.companiesTypes
			}
		};
	},
	{
		loadCompaniesTypes
	}
)(CompaniesOverviewComponent);

export default CompaniesOverview;