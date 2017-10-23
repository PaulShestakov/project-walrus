import React from 'react';
import {connect} from 'react-redux';

import CompaniesOverviewComponent from '../../scenes/companies/CompaniesOverview';

const CompaniesOverview = connect(
	state => {
		return {
			...state
		};
	},
	{

	}
)(CompaniesOverviewComponent);

export default CompaniesOverview;