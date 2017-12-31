import globalStyles from './../../style';

export default {
	pageContainer: {
		display: 'flex',
		justifyContent: 'center'
	},
	page: {
		width: '3rem',
		height: '3rem',

		lineHeight: '3rem',
		textAlign: 'center'
	},
	activeButton: {
		backgroundColor: globalStyles.ACCENT_RED,
		color: 'white',

		'&:hover': {
			backgroundColor: globalStyles.ACCENT_RED,
		}
	},
};
