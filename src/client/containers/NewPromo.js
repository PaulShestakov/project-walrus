import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NewPromoComponent from '../scenes/newPromo/NewPromo.jsx';

import { savePromo } from './../actionCreators/newPromo';


const getFormData = (formElements) => {
	return {
		type:		'275c5e07-63ca-11e7-8224-bc5ff40f7ff3',
		//type:		_.get(formElements.promoType, 'value', null),
		title:		_.get(formElements.promoName, 'value', null),
		city:			_.get(formElements.city, 'value', null),

		animal: 'animal',
		breed: 'breed',
		image: 'image',

		status: "026f16bc-63ca-11e7-8224-bc5ff40f7ff3",

		// lostAddress:	_.get(formElements.lostAddress, 'value', null),
		// lostTime:		_.get(formElements.lostTime, 'value', null),
		//
		// foundAddress:	_.get(formElements.foundAddress, 'value', null),
		// foundTime:		_.get(formElements.foundTime, 'value', null),
		//
		// gender:			_.get(formElements.gender, 'value', null),
		// approximateAge:	_.get(formElements.approximateAge, 'value', null),
		//
		// price:			_.get(formElements.price, 'value', null),
		//
		// personName:		_.get(formElements.personName, 'value', null),
		// personAddress:	_.get(formElements.personAddress, 'value', null),
		// personPhone:	_.get(formElements.personPhone, 'value', null),
		// personEmail:	_.get(formElements.personEmail, 'value', null),

		description:	_.get(formElements.description, 'value', null),
		date: +new Date()
	};
};

const NewPromo = connect(
	state => {
		return state.newPromo
	},
	dispatch => {
		return {
			handleSubmit: formElements => {
				const formData = getFormData(formElements);
				dispatch(savePromo(formData));
			}
		}
	}
)(NewPromoComponent);

export default NewPromo;