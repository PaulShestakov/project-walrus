import globalStyle from '../../../style';

export default {

	flexRow: {
		display: 'flex',
		justifyContent: 'space-between',
	},

	flexColumn: {
		display: 'flex',
		flexDirection: 'column',
	},

	companiesListBlock: {
		display: 'flex',
		flexDirection: 'column',
	},

	companiesList: {
		position: 'relative',
		flexGrow: '1',
	},

	h1Style: {
		textTransform: 'uppercase',
		color: globalStyle.ACCENT_RED,
		fontWeight: 'bold',
		fontFamily: globalStyle.BEBAS_FONT,
		fontSize: '2.5rem',
		margin: '5px 0'
	},
};