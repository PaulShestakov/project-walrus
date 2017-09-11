import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';

@withStyles(styles)
export default class Label extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		const style = {
			fontSize: this.props.fontSize
		};

		return (
			<span style={style}
			  	className={
					classNames(
						classes.label,
						className
					)
				}
			  	{...other}>
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
