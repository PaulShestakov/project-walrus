import React from 'react';
import {connect} from 'react-redux';

import CompaniesListComponent from '../../scenes/companies/companiesList/CompaniesList';
import {loadCompanies} from "../../actionCreators/companiesList/companiesList";
import {
	updateStateWithUrlSource,
	updateUrlWithStateSource
} from "../../actionCreators/companiesList/filter";
import {loadCompaniesCodeValues} from "../../actionCreators/common";

const CompaniesList = connect(
	state => {
		return {
			main: state.companiesList.main,
			filter: state.companiesList.filter,
			common: state.common
		};
	},
	{
		loadCompaniesCodeValues,

		loadCompanies,

		updateStateWithUrlSource,
		updateUrlWithStateSource
	}
)(CompaniesListComponent);

export default CompaniesList;