import { combineReducers } from 'redux';

import newPromo from './newPromo';
import promos from './promos';
import {routerReducer} from "react-router-redux";

const rootReducer = combineReducers({
	newPromo,
	promos,
    router: routerReducer
});

export default rootReducer;
