import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';

class Label extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		const style = {
			fontSize: this.props.fontSize,
			lineHeight: this.props.fontSize
		};

		return (
			<span style={style}
			  	className={
					classNames(
						classes.label,
						className
					)
				}>
				{this.props.children}
			</span>
		);
	}
};

export default withStyles(styles)(Label);

Label.defaultProps = {
	fontSize: '1.25rem',
};

Label.propTypes = {
	fontSize: PropTypes.string,
	accent: PropTypes.string
};
