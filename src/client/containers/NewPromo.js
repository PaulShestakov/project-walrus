import React from 'react';
import { connect } from 'react-redux';

import NewPromoComponent from '../scenes/newPromo/NewPromo.jsx';

import { savePromo } from './../actionCreators/newPromo';


const NewPromo = connect(
	state => {
		return state.newPromo
	},
	dispatch => {
		return {
			handleSubmit: formData => {
				dispatch(savePromo(formData));
			}
		}
	}
)(NewPromoComponent);

export default NewPromo;