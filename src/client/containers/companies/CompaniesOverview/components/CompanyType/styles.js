import globalStyle from '../../../../../style';

export default {
	exactTypesContainer: {
		padding: "2rem",
		display: "flex",
		flexDirection: 'column'
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
}