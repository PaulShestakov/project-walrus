import globalStyles from '../../style';

// Special css here. Please, have a look:
// https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

export default {
	main: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},

	addImageInput: {
		width: '0.1px',
		height: '0.1px',
		opacity: 0,
		overflow: 'hidden',
		position: 'absolute',
		zIndex: -1,
	},

	addImageLabel: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

		width: '8rem',
		height: '6rem',
		cursor: 'pointer',

		'& span': {
			color: globalStyles.DARK_GREY,
			textAlign: 'center',
		}
	},

	cameraIcon: {
		fontSize: '2rem',
		color: globalStyles.DARK_GREY,
	}
}


