import globalStyle from '../../../../../style';

export default {
	exactTypesContainer: {
		padding: '2rem',
		display: 'flex',
		flexDirection: 'column'
	},

	cardImage: {
		width: '100%',
		height: '200px',
		backgroundSize: 'contain',
	},

	exactTypeLinkWrapper: {
		marginBottom: '1rem',

		'&:last-child': {
			marginBottom: '0'
		}
	},

	exactTypeLink: {
		color: globalStyle.DARK_GREY,
	},

	numberWrapper: {
		borderRadius: '50%',
		backgroundColor: 'grey',
		color: 'white',
		width: '2rem',
		height: '2rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0
	},

	categoryLabel: {
		fontSize: '1rem',
	},
};
