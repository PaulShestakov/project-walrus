import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import globalStyles from '../../style';
import styles from './styles';

class Text extends React.Component {
	render() {
		const {classes, className, fontSize, color, maxLines, ...other} = this.props;

		let style = {
			fontSize,
			color
		};

		if (maxLines) {
			const maxLinesStyle = {
				'display': '-webkit-box',
				'WebkitLineClamp': maxLines,
				'WebkitBoxOrient': 'vertical',
				'overflow': 'hidden'
			};

			style = {
				...style,
				...maxLinesStyle
			}
		}

		return (
			<p style={style} className={classNames(classes.text, className)} {...other}>
				{this.props.children}
			</p>
		);
	}
};

export default withStyles(styles)(Text);

Text.defaultProps = {
	fontSize: '1rem',
	color: globalStyles.DARK_GREY,
};

Text.propTypes = {
	fontSize: PropTypes.string,
	color: PropTypes.string,
	maxLines: PropTypes.number
};
