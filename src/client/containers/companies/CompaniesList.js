import React from 'react';
import {connect} from 'react-redux';

import CompaniesListComponent from '../../scenes/Companies/СompaniesList';

import {
	loadCompanies,

	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange
} from "../../actionCreators/companiesList/companiesList";

import {
	updateStateWithUrlSource,
	updateUrlWithStateSource,

	addCity,
	removeCity,

	setIsWorkingNow,
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

		fuzzySearchLoadCompanies,
		clearFuzzySearchLoadedCompanies,
		suggestionInputValueChange,

		updateStateWithUrlSource,
		updateUrlWithStateSource,


		addCity,
		removeCity,

		setIsWorkingNow,
	}
)(CompaniesListComponent);

export default CompaniesList;