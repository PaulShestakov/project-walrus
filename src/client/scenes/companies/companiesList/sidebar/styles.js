import globalStyles from '../../../../style';


export default {
	card: {
		// Collapsing margin fix
		// TODO: Check again this thing
		paddingTop: '1px'
	},
	checkboxesContainer: {
		display: 'flex',
		flexDirection: 'column'
	},

	checkboxWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0',

		'& > span': {
			order: 2
		},

		'& p': {
			order: 1,
			fontSize: '1.25rem',
			fontFamily: globalStyles.BEBAS_FONT
		}
	},

	separator: {
		width: '100%'
	},

	timeSelectionContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}