import React from 'react';
import {connect} from 'react-redux';

import CompaniesListComponent from '../../scenes/companies/companiesList/CompaniesList';


const CompaniesList = connect(
	state => {
		return state.companiesList
	},
	{

	}
)(CompaniesListComponent);

export default CompaniesList;