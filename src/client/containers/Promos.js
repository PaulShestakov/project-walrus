import React from 'react';
import { connect } from 'react-redux';

import PromosComponent from '../scenes/promos/Promos.jsx';
import { loadPromos } from './../actionCreators/promos';

const Promos = connect(
	state => {
		return state.promos
	},
	dispatch => {
		return {
			loadPromos: () => {
				dispatch(loadPromos());
			}
		}
	}
)(PromosComponent);

export default Promos;