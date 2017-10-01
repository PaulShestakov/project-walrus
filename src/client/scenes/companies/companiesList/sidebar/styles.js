import globalStyles from '../../../../style';


export default {
	card: {
		// Collapsing margin fix
		// TODO: Check again this thing
		paddingTop: '1px'
	},

	separator: {
		width: '100%'
	},

	timeSelectionContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	link: {
		flexGrow: '1',
		color: 'white',
		textDecoration: 'none'
	},

	flexColumn: {
		display: 'flex',
		flexDirection: 'column'
	},


	switchFormControlWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0',

		'& > div': {
			order: 2
		},

		'& p': {
			order: 1,
			fontSize: '1.25rem',
			fontFamily: globalStyles.BEBAS_FONT
		}
	},
}