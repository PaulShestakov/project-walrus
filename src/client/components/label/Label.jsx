import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@withStyles(styleSheet)
export default class Label extends React.Component {
	render() {
		const {classes, ...other} = this.props;

		const style = {
			fontSize: this.props.fontSize
		};

		return (
			<span style={style} className={classes.label} {...other}>
				{this.props.children}
			</span>
		);
	}
};

Label.defaultProps = {
	fontSize: '1.3rem',
};

Label.propTypes = {
	fontSize: PropTypes.string,
	accent: PropTypes.string
};
