import globalStyle from '../../../style';

export default {
	tab: {
		height: 'auto',
		padding: '1rem',
		flexGrow: 1,
		maxWidth: 'none'
	},

	tabLabelContainer: {
		paddingTop: '0.75rem',
		paddingBottom: '0.75rem',
	},

	tabLabel: {
		fontSize: '1.25rem',
		fontFamily: globalStyle.BEBAS_FONT
	},

	tabIcon: {
		width: '3rem',
		height: '3rem'
	},

	h1Style: {
		textTransform: 'uppercase',
		color: globalStyle.ACCENT_RED,
		fontWeight: 'bold',
		fontFamily: globalStyle.BEBAS_FONT,
		fontSize: '2.5rem',
		margin: '5px 0'
	},
}