import React from 'react';
import { withStyles } from 'material-ui/styles';
import {TextField as MaterialText} from 'material-ui';

import styles from './styles';

class TextField extends React.Component {
	render() {
        const { classes, input, meta: { touched, error }, ...other } = this.props;
		return (
			<MaterialText {...input} {...other} />
		);
	}
}

export default withStyles(styles)(TextField);