import globalStyles from '../../../style';

export default {
	imagePreview: {
		position: 'relative'
	},

    image: {
        width: '8rem',
        height: '6rem',
    },

    deleteButton: {
		position: 'absolute',
		width: '2rem',
		height: '2rem',
		top: '-0.5rem',
		right: '-0.5rem',

		border: 0,
		borderRadius: '50%',
		backgroundColor: globalStyles.ACCENT_RED,

		outline: 'none',
		boxShadow: 'none',
		cursor: 'pointer',

		'& :focus': {
			outline: 'none',
			boxShadow: 'none',
		}
	},

    deleteButtonCross: {
        color: 'white',
        fontSize: '1rem'
    }
}