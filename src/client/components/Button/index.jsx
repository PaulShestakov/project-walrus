import React from 'react';
import PropTypes from 'prop-types';
import MaterialButton from 'material-ui/Button';
import classNames from 'classnames';

import globalStyle from '../../style';

import { withStyles } from 'material-ui/styles';

const styleSheet = {
	button: {
		color: 'white'
	},
	whiteAccent: {
		color: globalStyle.DARK_GREY,
		background: globalStyle.ACCENT_WHITE,
		'&:hover': {
			background: globalStyle.ACCENT_WHITE
		}
	},
	redAccent: {
		color: 'white',
		background: globalStyle.ACCENT_RED,
		'&:hover': {
			background: globalStyle.ACCENT_RED
		}
	},
	blueAccent: {
		color: 'white',
		background: globalStyle.ACCENT_BLUE,
		'&:hover': {
			background: globalStyle.ACCENT_BLUE
		}
	}
};


@withStyles(styleSheet)
class Button extends React.Component {

	render() {
		const { accent, classes, className, raised, ...other } = this.props;

		return (
			<MaterialButton raised={raised} className={classNames(
					classes.button,
					{
						[classes.whiteAccent]: accent === 'white',
						[classes.redAccent]: accent === 'red',
						[classes.blueAccent]: accent === 'blue'
					},
					className
				)}
				{ ...other }>
				{this.props.children}
			</MaterialButton>
		);
	}
}

Button.defaultProps = {
	raised: true,
	accent: 'red'
};

Button.propTypes = {
	raised: PropTypes.bool,
	accent: PropTypes.oneOf(['white', 'blue', 'red'])
};

export default Button;