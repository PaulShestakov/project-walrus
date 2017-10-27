import React from 'react';
import {connect} from 'react-redux';

import CompanyPageComponent from '../../../scenes/companies/CompanyPage';

import {loadCompany, postFeedback, loadFeedbacks, deleteFeedback} from "../../../actionCreators/companies/companyPage/companyPage";


const CompanyPage = connect(
	state => {
		return {
			common: state.common,
			company: state.companyPage.company,
			feedbacks: state.companyPage.feedbacks
		}
	},
	{
		loadCompany,
		postFeedback,
		loadFeedbacks,
        deleteFeedback,
	}
)(CompanyPageComponent);

export default CompanyPage;