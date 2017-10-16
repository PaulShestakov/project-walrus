import React from 'react';
import { withStyles } from 'material-ui/styles';
import {Input as MaterialInput} from 'material-ui';

import styles from './styles';

class Input extends React.Component {
	render() {
        const { classes, meta, input, ...other } = this.props;
		return (
			<MaterialInput {...input} {...other} />
		);
	}
}

export default withStyles(styles)(Input);