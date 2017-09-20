import React from 'react';
import {connect} from 'react-redux';

import CompanyPageComponent from '../../scenes/companies/companyPage/CompanyPage';

import {loadCompany} from "../../actionCreators/companyPage/companyPage";


const CompanyPage = connect(
	state => {
		return state.companyPage
	},
	{
		loadCompany
	}
)(CompanyPageComponent);

export default CompanyPage;