import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import MaterialButton from 'material-ui/Button';
import classNames from 'classnames';

import styles from './style.module.scss';


import globalStyle from '../../style';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet(theme => ({
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
}));


@withStyles(styleSheet)
class Button extends React.Component {

	render() {
		const { accent, classes, className, ...other } = this.props;

		return (
			<MaterialButton raised className={classNames(
				classes.button,
				{
					[classes.redAccent]: accent === 'red',
					[classes.blueAccent]: accent === 'blue'
				},
				className
			)} { ...other }>
				{this.props.children}
			</MaterialButton>
		);
	}
}

Button.propTypes = {
	accent: PropTypes.oneOf(['blue', 'red'])
};

export default Button;