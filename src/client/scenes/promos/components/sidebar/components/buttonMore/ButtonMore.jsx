import React from 'react';
import FontAwesome from 'react-fontawesome';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Button } from 'components';
import classNames from 'classnames';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@withStyles(styleSheet)
export default class ButtonMore extends React.Component {
	render() {
		const {classes, className, text, ...other} = this.props;

		return (
			<Button className={classNames(classes.button, className)} {...other}>
				<FontAwesome name="angle-left" className="mr-1" />
				{text}
			</Button>
		);
	}
}
