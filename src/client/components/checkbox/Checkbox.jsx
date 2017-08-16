import React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet({
	root: {
		width: '1.75rem',
		height: '1.75rem',
		marginLeft: '-0.375rem',
		marginRight: 0,

		'& svg': {
			width: '1.25rem',
			height: '1.25rem'
		}
	}
});


@withStyles(styleSheet)
class Checkbox extends React.Component {
	render() {
		const { classes, ...other } = this.props;

		return (
			<MaterialCheckbox {...other} classes={{
				root: classes.root
			}}/>
		);
	}
}

export default Checkbox;