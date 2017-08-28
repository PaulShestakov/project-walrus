import React from 'react';
import { connect } from 'react-redux';

import PromosComponent from '../scenes/promos/Promos.jsx';
import {loadPromos} from './../actionCreators/promos';
import {loadCodeValues} from "../actionCreators/newPromo";
import {fetchBreed} from "../actionCreators/promos";

const Promos = connect(
	state => {
		return state.promos
	},
	{
		loadPromos,
		loadCodeValues,
		loadBreeds: fetchBreed
	}
)(PromosComponent);

export default Promos;