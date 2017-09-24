import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import globalStyles from '../../style';
import styles from './styles';


@withStyles(styles)
export default class Text extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		const style = {
			fontSize: this.props.fontSize,
			color: this.props.color
		};

		return (
			<p style={style} className={classNames(classes.text, className)} {...other}>
				{this.props.children}
			</p>
		);
	}
};

Text.defaultProps = {
	fontSize: '1rem',
	color: globalStyles.DARK_GREY,
};

Text.propTypes = {
	fontSize: PropTypes.string,
	color: PropTypes.string,
};
