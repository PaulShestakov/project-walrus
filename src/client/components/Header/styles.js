import globalStyle from '../../style';

const linkStyle = {
	color: globalStyle.DARK_GREY,
	textDecoration: 'none',

	'&:hover': {
		color: globalStyle.ACCENT_RED
	}
};

export default {
	topLink: linkStyle,
	bottomLink: {
		...linkStyle,
		fontSize: '1.4rem',
		fontFamily: globalStyle.BEBAS_FONT
	}
};