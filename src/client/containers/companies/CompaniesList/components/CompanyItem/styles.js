import globalStyles from '../../../../../style';

export default {
	card: {
		display: 'flex'
	},
	cardImage: {
		width: '100%',
		height: '100%',
		backgroundSize: 'contain',
		margin: 'auto'
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: '1',
	},

	headerWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start'
	},
	editButtonsBlock: {
		flexShrink: 0,
		display: 'flex',
	},

	editButton: {
		flexShrink: 0,
		alignSelf: 'flex-start',
		width: '2.5rem',
		height: '2.5rem',
		margin: '0 0.25rem',
		// padding: '0.5rem'
	},
	editIcon: {
		color: 'white'
	},
	icon: {
        fontSize: '1.25rem',
        color: globalStyles.ACCENT_BLUE,
        marginRight: '0.5rem'
    },
    greyIcon: {
        fontSize: '1.25rem',
        color: 'grey',
        marginRight: '0.5rem'
	},
	buttonsBlock: {
		// flexGrow: '1',
		display: 'block',
		// alignItems: 'flex-end'
	},

	noShrink: {
		flexShrink: 0,
	},
	flexRow: {
		display: 'flex',
		alignItems: 'center'
	},
	flexColumn: {
		display: 'flex',
		flexDirection: 'column'
	},
	spaceBetween: {
		justifyContent: 'space-between'
	},
}