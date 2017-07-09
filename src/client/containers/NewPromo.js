import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { NewPromo as NewPromoComponent } from './../components/newPromo/NewPromo.jsx';

import { savePromo } from './../actionCreators/newPromo';


const getFormData = (formElements) => {
	return {
		promoType:		_.get(formElements.promoType, 'value', null),
		promoName:		_.get(formElements.promoName, 'value', null),
		city:			_.get(formElements.city, 'value', null),

		lostAddress:	_.get(formElements.lostAddress, 'value', null),
		lostTime:		_.get(formElements.lostTime, 'value', null),

		foundAddress:	_.get(formElements.foundAddress, 'value', null),
		foundTime:		_.get(formElements.foundTime, 'value', null),

		gender:			_.get(formElements.gender, 'value', null),
		approximateAge:	_.get(formElements.approximateAge, 'value', null),

		price:			_.get(formElements.price, 'value', null),

		personName:		_.get(formElements.personName, 'value', null),
		personAddress:	_.get(formElements.personAddress, 'value', null),
		personPhone:	_.get(formElements.personPhone, 'value', null),
		personEmail:	_.get(formElements.personEmail, 'value', null),

		description:	_.get(formElements.description, 'value', null),
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