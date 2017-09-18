import React from 'react';
import {connect} from 'react-redux';

import CompanyPageComponent from '../../scenes/companies/companyPage/CompanyPage';


const CompanyPage = connect(
	state => {
		return state.companyPage
	},
	{

	}
)(CompanyPageComponent);

export default CompanyPage;