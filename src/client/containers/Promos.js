import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PromosComponent from '../scenes/promos/Promos.jsx';
import { fetchPromos } from './../actionCreators/promos';
import {loadCodeValues} from "../actionCreators/newPromo";
import {fetchBreed} from "../actionCreators/promos";

const Promos = connect(
	state => {
		return state.promos
	},
	dispatch => {
		return {
			requestPromos: () => {
				dispatch(fetchPromos());
			},
            loadCodeValues : () => {
                dispatch(loadCodeValues())
            },
			loadBreeds : (animal) => {
				dispatch(fetchBreed(animal))
			}
		}
	}
)(PromosComponent);

export default Promos;