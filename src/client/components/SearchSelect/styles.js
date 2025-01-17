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
		padding: '.5rem',
		boxShadow: 'none',
		borderBottom: `1px solid ${globalStyles.LIGHT_GREY}`,
		borderRadius: '0',
		backgroundColor: 'white !important',
	},

	buttonLabel: {
		alignSelf: 'flex-end',
		fontSize: '1.25rem',
		fontFamily: globalStyles.BEBAS_FONT,
		color: globalStyles.DARK_GREY
	},

	buttonDisabled: {
		'& svg': {
			color: globalStyles.LIGHT_GREY
		},
		'& span': {
			color: globalStyles.LIGHT_GREY
		}
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

	dropdownInput: {
		flexGrow: '1',
		flexShrink: '0',
		display: 'flex',
		alignItems: 'center',
		margin: '.5rem'
	},

	dropdownSuggestions: {
		display: 'flex',
		flexDirection: 'column',
		maxHeight: '300px',
		overflowY: 'auto',
		overflowX: 'hidden',
	},

	inputAdornment: {
		display: 'flex',
		alignItems: 'flex-end',

		'& svg': {
			marginBottom: '.25rem'
		}
	},

	suggestionItem: {
		flexShrink: '0',
		padding: '.5rem 1rem'
	},
};

