import React from 'react';
import {connect} from 'react-redux';

import EditCompanyComponent from '../../scenes/Companies/EditCompany';
import {
	loadCompany
} from "../../actionCreators/companyPage/companyPage";


const EditCompany = connect(
	state => state.editCompany,
	{
		loadCompany
	}
)(EditCompanyComponent);

export default EditCompany;