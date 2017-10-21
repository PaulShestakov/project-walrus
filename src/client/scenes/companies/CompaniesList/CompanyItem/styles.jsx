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
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		flexGrow: '1',
	},
	editButton: {
		width: '3rem',
		height: '3rem'
	},
	editIcon: {
		color: 'white'
	},
	icon: {
		fontSize: '1.25rem',
		color: globalStyles.ACCENT_BLUE,
		marginRight: '0.5rem'
	},
	buttonsBlock: {
		flexGrow: '1',
		display: 'flex',
		alignItems: 'flex-end'
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
	}
}