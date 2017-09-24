


export default {
	imagePreview: {
		position: 'relative'
	},

    image: {
        width: '10rem',
        height: '10rem',
        borderRadius: '1rem'
    },

    deleteButton: {
		position: 'absolute',
		width: '2rem',
		height: '2rem',
		top: '-0.5rem',
		right: '-0.5rem',

		border: 0,
		borderRadius: '50%',
		backgroundColor: 'red',

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