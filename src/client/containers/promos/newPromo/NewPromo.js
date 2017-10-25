import React from 'react';
import {connect} from 'react-redux';

import NewPromoComponent from '../../../scenes/promos/NewPromo';

import {savePromo} from '../../../actionCreators/promos/newPromo';
import {fetchBreed} from "../../../actionCreators/promos/promosList/promosList";
import {loadPromoCodeValues} from "../../../actionCreators/common/common";

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