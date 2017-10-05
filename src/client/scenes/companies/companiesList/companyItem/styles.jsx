import globalStyles from '../../../../style';

export default {
	card: {
		display: 'flex'
	},
	cardImage: {
		width: '12rem',
		height: '12rem',
		backgroundSize: 'contain'
	},
	icon: {
		fontSize: '1.25rem',
		color: globalStyles.ACCENT_BLUE,
		marginRight: '0.5rem'
	},

	flexRow: {
		display: 'flex',
		alignItems: 'center'
	},
	flexColumn: {
		display: 'flex',
		flexDirection: 'column'
	},

	buttonsBlock: {
		flexGrow: '1',
		display: 'flex',
		alignItems: 'flex-end'
	}
}