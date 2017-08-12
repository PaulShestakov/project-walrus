
// Special css here. Please, have a look:
// https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/

export default {
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

	width: '10rem',
	height: '10rem',
	border: '2px solid $accent-blue',
	borderRadius: '1rem',
	cursor: 'pointer',

	'& span': {
		color: 'blue',
		textAlign: 'center',
	}
  },

  cameraIcon: {
	fontSize: '3rem',
    color: 'blue',
  }
}


