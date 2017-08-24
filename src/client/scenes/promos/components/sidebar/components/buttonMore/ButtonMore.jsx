import React from 'react';
import FontAwesome from 'react-fontawesome';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import classNames from 'classnames';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@withStyles(styleSheet)
export default class ButtonMore extends React.Component {
	render() {
		const {classes, className, ...other} = this.props;

		return (
			<Button
				classes={{
					disabled: classes.disabled,
				}}
				className={
					classNames(classes.button, className)
				}
				{...other}>



				<FontAwesome name="angle-left" className="mr-2" />
				{this.props.children}
			</Button>
		);
	}
}
