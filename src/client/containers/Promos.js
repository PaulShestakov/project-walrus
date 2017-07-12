import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import PromosComponent from '../scenes/promos/Promos.jsx';
// import { savePromo } from './../actionCreators/newPromo';

const Promos = connect(
	state => {
		return state.promos
	},
	dispatch => {
		return {
			requestPromos: () => {

			}
		}
	}
)(PromosComponent);

export default Promos;