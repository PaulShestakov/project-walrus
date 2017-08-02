import React from 'react';
import { connect } from 'react-redux';

import NewPromoComponent from '../scenes/newPromo/NewPromo.jsx';

import { savePromo, loadCodeValues } from './../actionCreators/newPromo';
import {push} from "react-router-redux";
import {fetchBreed} from "../actionCreators/promos";


const NewPromo = connect(
	state => {
		return state.newPromo;
	},
	dispatch => {
		return {
			handleSubmit: formData => {
				dispatch(savePromo(formData));
			},
			loadCodeValues : () => {
				dispatch(loadCodeValues());
			},
			goToPromos : () => {
				dispatch(push('/promos'));
			},
            loadBreeds : (animal) => {
                dispatch(fetchBreed(animal))
            }
		}
	}
)(NewPromoComponent);

export default NewPromo;