import React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';

import { withStyles } from 'material-ui/styles';

const styleSheet = {
	main: {
		width: '1.75rem',
		height: '1.75rem',
		marginLeft: '-0.375rem',
		marginRight: 0,

		'& svg': {
			width: '1.5rem',
			height: '1.5rem'
		}
	}
};


@withStyles(styleSheet)
class Checkbox extends React.Component {
	render() {
		const { classes, ...other } = this.props;

		return (
			<MaterialCheckbox {...other} className={classes.main}/>
		);
	}
}

export default Checkbox;