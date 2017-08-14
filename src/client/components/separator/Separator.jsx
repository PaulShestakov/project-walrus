import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@withStyles(styleSheet)
export default class Separator extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		return (
			<div className={classNames(className, classes.separator)} {...other} />
		);
	}
}