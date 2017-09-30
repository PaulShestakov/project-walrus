import React from 'react';
import {connect} from 'react-redux';

import CompaniesListComponent from '../../scenes/companies/companiesList/CompaniesList';
import {loadCompanies} from "../../actionCreators/companiesList/companiesList";
import {
	updateStateWithUrlSource,
	updateUrlWithStateSource,

	addCity,
	removeCity,

	addDayOfWeek,
	removeDayOfWeek,
} from "../../actionCreators/companiesList/filter";

const CompaniesList = connect(
	state => {
		return {
			...state,
			main: state.companiesList.main,
			filter: state.companiesList.filter,
			common: state.common
		};
	},
	{
		loadCompanies,

		updateStateWithUrlSource,
		updateUrlWithStateSource,


		addCity,
		removeCity,

		addDayOfWeek,
		removeDayOfWeek,
	}
)(CompaniesListComponent);

export default CompaniesList;