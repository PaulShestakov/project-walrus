import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'react-bootstrap';

import styles from './style.module.scss';




import { withStyles, createStyleSheet } from 'material-ui/styles';


const styleSheet = createStyleSheet(theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
}));


import MaterialButton from 'material-ui/Button';




@withStyles(styleSheet)
class Button extends React.Component {

	render() {

		const classes = this.props.classes;

		// let accentStyleClass = '';
		//
		// switch (this.props.accent) {
		// 	case 'blue':
		// 		accentStyleClass = 'accentBlue';
		// 		break;
		// 	case 'red':
		// 		accentStyleClass = 'accentRed';
		// 		break;
		// }
		return (
			<MaterialButton raised color="primary" className={classes.button} {...this.props}>
				{this.props.children}
			</MaterialButton>
		);
	}
}

Button.propTypes = {
	accent: PropTypes.oneOf(['blue', 'red'])
};

export default Button;