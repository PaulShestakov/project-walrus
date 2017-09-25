import React from 'react';
import {connect} from 'react-redux';

import NewPromoComponent from '../../scenes/promos/newPromo/NewPromo';

import {savePromo} from '../../actionCreators/newPromo/index';
import {fetchBreed} from "../../actionCreators/promosList/promosList";
import {loadPromoCodeValues} from "../../actionCreators/common";

const NewPromo = connect(
	state => {
		return {
			...state.newPromo,
			...state.common.promoCodeValues
		};
	},
	{
		loadPromoCodeValues,
		loadBreeds: fetchBreed,
		handleSubmit: savePromo,
	}
	// dispatch => {
	// 	return {
	// 		handleSubmit: formData => {
	// 			dispatch(savePromo(formData));
	// 		},
	// 		loadCodeValues : () => {
	// 			dispatch(loadCodeValues());
	// 		},
	// 		goToPromos : () => {
	// 			dispatch(push('/promos'));
	// 		},
     //        loadBreeds : (animal) => {
     //            dispatch(fetchBreed(animal))
     //        }
	// 	}
	// }
)(NewPromoComponent);

export default NewPromo;