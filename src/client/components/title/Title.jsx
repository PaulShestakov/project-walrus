import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';
const styleSheet = createStyleSheet(styles);

@withStyles(styleSheet)
export default class Title extends React.Component {
	render() {
		const {classes, tag, fontSize, fontWeight, textTransform, className, ...other} = this.props;

		const style = {
			fontSize,
			fontWeight,
			textTransform,
		};

		return (
			<tag style={style} className={classNames(className, classes.title)} {...other}>
				{this.props.children}
			</tag>
		);
	}
};

Title.defaultProps = {
	text: '',
	tag: 'span',
	fontSize: '1rem',
	fontWeight: 'normal',
	textTransform: 'uppercase',
	color: 'black',
};

Title.propTypes = {
	text: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'span']),
	fontSize: PropTypes.string,
	fontWeight: PropTypes.string,
	textTransform: PropTypes.string,
	color: PropTypes.string,
};