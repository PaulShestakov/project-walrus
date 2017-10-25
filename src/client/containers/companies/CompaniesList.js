import React from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect'

import CompaniesListComponent from '../../scenes/companies/CompaniesList';

import {
	loadCompanies,

	fuzzySearchLoadCompanies,
	clearFuzzySearchLoadedCompanies,
	suggestionInputValueChange,
	removeCompany,
} from "../../actionCreators/companiesList/companiesList";

import {
	updateStateWithUrlSource,
	updateUrlWithStateSource,

	addCity,
	removeCity,

	setIsWorkingNow,
} from "../../actionCreators/companiesList/filter";



const getCities = (state) => state.common.cities;

const getFlatCitiesList = createSelector(
	[getCities],
	(cities) => {
		return cities
			.reduce((acc, item) => {
				acc.push({
					value: item.value,
					label: item.label,
					sort: item.sort
				});
				item.subCities.forEach(item => {
					acc.push({
						value: item.value,
						label: item.label,
						sort: item.sort
					});
				});
				return acc;
			}, [])
			.sort((cityA, cityB) => cityA.sort - cityB.sort);
	}
);

const CompaniesList = connect(
	state => {
		return {
			...state,
			main: state.companiesList.main,
			filter: state.companiesList.filter,
			cities: getFlatCitiesList(state)
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
		removeCompany,

		setIsWorkingNow,
	}
)(CompaniesListComponent);

export default CompaniesList;