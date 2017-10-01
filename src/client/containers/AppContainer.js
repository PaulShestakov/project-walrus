import React from 'react';
import {connect} from 'react-redux';

import Router from '../scenes/router/Router';
import { loadUserInfo } from "../actionCreators/common";

export default connect(
	state => {
		return {
			...state
		}
	},
	{
		loadUserInfo
	}
)(Router);