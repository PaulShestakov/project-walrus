import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';

class Title extends React.Component {
	render() {
		const {classes, tag, fontSize, bold, uppercase, color, className, ...other} = this.props;

		const Tag = tag;

		const style = {
			fontSize,
			color,
			textTransform: uppercase ? 'uppercase' : 'none',
			fontWeight: bold ? 'bold' : 'normal'
		};

		return (
			<Tag style={style} className={classNames(className, classes.title)} {...other}>
				{this.props.children}
			</Tag>
		);
	}
};

export default withStyles(styles)(Title);

Title.defaultProps = {
	text: '',
	tag: 'span',
	fontSize: '1rem',
	bold: false,
	uppercase: false,
	color: 'black',
};

Title.propTypes = {
	text: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'span']),
	fontSize: PropTypes.string,
	bold: PropTypes.bool,
	uppercase: PropTypes.bool,
	color: PropTypes.string,
};