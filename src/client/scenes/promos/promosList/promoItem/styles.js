import globalStyles from './../../../../style';


export default {

	card: {
		display: 'flex'
	},

	cardImage: {
		width: '12rem',
		height: '12rem'
	},

	button: {
		width: '100%',
		height: '3rem',
		background: 'white',
		color: `${globalStyles.DARK_GREY}`,

		borderTop: `1px solid ${globalStyles.LIGHT_GREY}`,
		borderBottom: `1px solid ${globalStyles.LIGHT_GREY}`
	},
	disabled: {
		background: 'white',
		color: `${globalStyles.LIGHT_GREY}`
	},
	image: {
		width: '100%',
		height: '100%',

	}
}


