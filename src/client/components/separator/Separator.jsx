import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';

@withStyles(styles)
export default class Separator extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		return (
			<div className={classNames(className, classes.separator)} {...other} />
		);
	}
}