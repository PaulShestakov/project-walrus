import React from 'react';
import {connect} from 'react-redux';

import CompanyPageComponent from '../../scenes/Companies/CompanyPage';

import {loadCompany, postFeedback, loadFeedbacks} from "../../actionCreators/companyPage/companyPage";


const CompanyPage = connect(
	state => {
		return {
			...state,
			...state.companyPage
		}
	},
	{
		loadCompany,
		postFeedback,
		loadFeedbacks,
	}
)(CompanyPageComponent);

export default CompanyPage;