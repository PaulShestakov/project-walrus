import React from 'react';
import {connect} from 'react-redux';

import EditCompanyComponent from '../../scenes/companies/EditCompany/index';
import {
	loadCompany
} from "../../actionCreators/editCompany";


const EditCompany = connect(
	state => ({
		common: state.common,
		editCompany: state.editCompany
	}),
	{
		loadCompany
	}
)(EditCompanyComponent);

export default EditCompany;