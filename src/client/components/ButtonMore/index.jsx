import React from 'react';
import FontAwesome from 'react-fontawesome';
import { withStyles } from 'material-ui/styles';
import Label from '../Label';
import Button from 'material-ui/Button';
import classNames from 'classnames';
import styles from './styles';

class ButtonMore extends React.Component {
	render() {
		const {classes, className, label, ...other} = this.props;

		return (
			<Button
				classes={{
					disabled: classes.disabled,
				}}
				className={
					classNames(classes.button, className)
				}
				{...other}>

				<FontAwesome name="angle-left" className={classNames(classes.arrowIcon, "mr-2")} />
				<Label uppercase fontSize="1.25rem">{label}</Label>
			</Button>
		);
	}
}

export default withStyles(styles)(ButtonMore);