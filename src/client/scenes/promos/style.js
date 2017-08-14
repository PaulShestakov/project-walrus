import { createStyleSheet } from 'material-ui/styles';
import globalStyle from '../../style';

export default createStyleSheet({
	tabs: {
		'& button': {
			minWidth: 'auto',
			display: 'flex',
			flexGrow: 1,
			justifyContent: 'center',

			'& span': {
				fontFamily: globalStyle.BEBAS_FONT,
				fontSize: '1.2rem'
			}
		}
	},
	searchInput: {
		'& input': {
			textAlign: 'center'
		}
	}
});