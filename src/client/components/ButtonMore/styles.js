import globalStyles from './../../style';


export default {
	button: {
		width: '100%',
		background: 'white',
		color: `${globalStyles.DARK_GREY}`,

		'& span': {
			justifyContent: 'start',
			alignItems: 'baseline'
		}
	},

	disabled: {
		background: 'white',
		color: `${globalStyles.LIGHT_GREY}`,
		border: `1px solid ${globalStyles.LIGHT_GREY}`,
	},

	arrowIcon: {
		fontSize: '1.5rem'
	}
}


