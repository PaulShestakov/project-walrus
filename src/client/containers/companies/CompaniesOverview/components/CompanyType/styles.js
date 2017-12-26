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

	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	categoryLabel: {
		fontSize: '1rem',
	},
};
