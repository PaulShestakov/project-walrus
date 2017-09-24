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
	},

	tab: {
		height: 'auto',
		padding: '1rem'
	},

	tabLabelContainer: {
		paddingTop: '0.75rem',
		paddingBottom: '0.75rem',
	},

	tabLabel: {
		fontSize: '1.25rem',
		fontFamily: globalStyle.BEBAS_FONT
	},

	tabIcon: {
		width: '3rem',
		height: '3rem'
	}
}