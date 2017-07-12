import { REQUEST_PROMOS } from '../actionCreators/promos';

const mockData = {
	promos:
		[...new Array(10)].map(x => ({
			title: 'Title',
			type: 'SELL',
			imageSrc: '',
			date: new Date(),
			description: 'Descr',
			price: 100
		}))
};


const promos = (state = mockData, action) => {
	switch (action.type) {

		case REQUEST_PROMOS:
			return {
				...state,
				isFetching: true
			};

		default:
			return state;
	}
};

export default promos;