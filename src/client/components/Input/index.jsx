import React from 'react';
import { withStyles } from 'material-ui/styles';
import {Input as MaterialInput} from 'material-ui';

import styles from './styles';

class Input extends React.Component {
	render() {
        const { classes, input, meta: { touched, error }, ...other } = this.props;
		return (
			<div>
				{
                    touched && error &&
					<span className={classes.red}>{error}</span>
				}
				<MaterialInput {...input} {...other} />
			</div>

		);
	}
}

export default withStyles(styles)(Input);