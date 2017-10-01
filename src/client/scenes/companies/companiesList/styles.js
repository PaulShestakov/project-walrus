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
		zIndex: 0,
		flexGrow: 1,
		position: 'relative',
	},
	suggestionsContainerOpen: {
		position: 'absolute',
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
	}
}