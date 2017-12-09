import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress, Typography } from 'material-ui';
import styles from './styles';


@withStyles(styles)
export default class CustomCircularProgress extends React.Component {


	render() {
		const {classes} = this.props;

		return (
			<CircularProgress className={classes.progressCircle} />
		);
	}
};