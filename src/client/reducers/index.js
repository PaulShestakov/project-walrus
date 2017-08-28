import { combineReducers } from 'redux';

import newPromo from './newPromo';
import promos from './promos';

const rootReducer = combineReducers({
	newPromo,
	promos
});

export default rootReducer;
