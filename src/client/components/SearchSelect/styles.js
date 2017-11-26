import globalStyles from './../../style';


export default {
	main: {
		display: 'flex',
		position: 'relative'
	},

	button: {
		flexGrow: '1',
		display: 'flex',
		justifyContent: 'space-between',
		padding: '.5rem 0',
		boxShadow: 'none',
		borderBottom: `1px solid ${globalStyles.DARK_GREY}`,
		borderRadius: '0',
	},

	buttonLabel: {
		fontSize: '1.25rem',
		fontFamily: globalStyles.BEBAS_FONT,
	},

	dropdown: {
		position: 'absolute',
		left: '0',
		top: '0',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		boxSizing: 'border-box',
		zIndex: '9999'
	},

	input: {
		flexGrow: '1',
		display: 'flex',
		alignItems: 'center',
		margin: '.5rem'
	},

	inputAdornment: {
		display: 'flex',
		alignItems: 'flex-end',

		'& svg': {
			marginBottom: '.25rem'
		}
	},

	suggestionItem: {
		padding: '.5rem 1rem'
	},
};

