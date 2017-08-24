import React from 'react';
import PropTypes from 'prop-types';
import MaterialButton from 'material-ui/Button';
import classNames from 'classnames';

import globalStyle from '../../style';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet({
	button: {
		color: 'white'
	},
	redAccent: {
		background: globalStyle.ACCENT_RED,
		'&:hover': {
			background: globalStyle.ACCENT_RED
		}
	},
	blueAccent: {
		background: globalStyle.ACCENT_BLUE,
		'&:hover': {
			background: globalStyle.ACCENT_BLUE
		}
	}
});


@withStyles(styleSheet)
class Button extends React.Component {

	render() {
		const { accent, classes, className, raised, ...other } = this.props;

		return (
			<MaterialButton raised={raised} className={classNames(
					classes.button,
					{
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
	accent: PropTypes.oneOf(['blue', 'red'])
};

export default Button;