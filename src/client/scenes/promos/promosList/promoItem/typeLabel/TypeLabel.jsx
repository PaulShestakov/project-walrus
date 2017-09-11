import React from "react";
import {withStyles, createStyleSheet} from 'material-ui/styles';
import classNames from 'classnames';
import {Label} from 'components';

import styles from './styles';

@withStyles(styles)
export default class TypeLabel extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		return (
			<Label className={classNames(classes.typeLabel, className)} {...other} />
		)
	}
}