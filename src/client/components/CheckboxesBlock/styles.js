import globalStyles from '../../style';


export default {
	disabled: {
		pointerEvents: 'none',

		'& *': {
			color: `${globalStyles.LIGHT_GREY} !important`,
		}
	},

	checkboxesContainer: {
		display: 'flex',
		flexDirection: 'column',
	},

	checkboxWrapper: {
		display: 'flex',
		//justifyContent: 'space-between',
		margin: '0',

		'& > span': {
			marginRight: '0.5rem'
		},

		'& p': {
			paddingTop: '.25rem',
			fontSize: '1.25rem',
			fontFamily: globalStyles.BEBAS_FONT,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap'
		},
	},

	popoverCard: {
		maxHeight: '32rem',
		maxWidth: '44rem',
		padding: '1.5rem',

		// TODO: bad staff here
		'& li': {
			padding: '0px 8px !important'
		}
	},
};
