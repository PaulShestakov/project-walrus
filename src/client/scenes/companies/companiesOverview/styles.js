import globalStyle from '../../../style';

export default {
	exactTypesContainer: {
		padding: "2rem",
		display: "flex",
		flexDirection: 'column'
	},
	exactTypeLink: {
		color: globalStyle.DARK_GREY,
		marginBottom: '0.5rem',

		'&:last-child': {
			marginBottom: '0'
		}
	}
}