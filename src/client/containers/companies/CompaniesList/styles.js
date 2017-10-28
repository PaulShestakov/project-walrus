export default {
	inputWrapper: {
		display: 'flex'
	},
	searchInput: {
		flexGrow: '1',

		'& input': {
			textAlign: 'center'
		}
	},

	container: {
		flexGrow: 1,
		position: 'relative'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		left: 0,
		right: 0,
	},
	suggestion: {
		display: 'block',
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none',
	},
	textField: {
		width: '100%',
	},
	makeStackingContext: {
		position: 'relative',
		zIndex: 1
	},


	suggestionMenuItem: {
		height: 'auto'
	},
	suggestionImage: {
		width: '6rem',
		height: '6rem'
	},

	suggestionItemLink: {
		display: 'flex',
		flexDirection: 'row',
		textDecoration: 'none'
	},

	flexRow: {
		display: 'flex',
		justifyContent: 'space-between',
	},

	flexColumn: {
		display: 'flex',
		flexDirection: 'column'
	}

}