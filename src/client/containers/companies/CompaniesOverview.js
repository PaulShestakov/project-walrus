import React from 'react';
import {connect} from 'react-redux';

import CompaniesOverviewComponent from '../../scenes/companies/companiesOverview/CompaniesOverview';
import {loadCompanyCategories} from "../../actionCreators/common";

const CompaniesOverview = connect(
	state => {
		return {
			main: state.companiesOverview,
			common: {
				companiesCategories: state.common.companiesCategories
			}
		};
	},
	{
		loadCompanyCategories
	}
)(CompaniesOverviewComponent);

export default CompaniesOverview;