import globalStyle from '../../../../../style';

export default {

	searchButton: {
		width: '100%',
	},
	searchButtonText: {
		textTransform: 'none',
		fontSize: '1rem',
		marginLeft: '0.5rem'
	},

	appBar: {
		height: '4rem'
	},

	input: {
		color: '#f3e2e2',
		fontSize: '1.25rem'
	},
	inputUnderline: {
		'&:before': {
			backgroundColor: '#a73131'
		},
		'&:hover:before': {
			backgroundColor: '#a73131 !important'
		},
		'&:after': {
			backgroundColor: '#f3e2e2'
		},
	},

	companiesList: {
		marginTop: '4rem'
	},

	companyLogo: {
		width: '4rem',
		height: '4rem'
	},

};
