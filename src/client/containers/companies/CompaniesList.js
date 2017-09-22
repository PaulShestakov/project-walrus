import React from 'react';
import {connect} from 'react-redux';

import CompaniesListComponent from '../../scenes/companies/companiesList/CompaniesList';
import {loadCompanies} from "../../actionCreators/companiesList/companiesList";


const CompaniesList = connect(
	state => {
		return state.companiesList;
	},
	{
		loadCompanies
	}
)(CompaniesListComponent);

export default CompaniesList;