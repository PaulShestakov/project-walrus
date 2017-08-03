import React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

const styleSheet = createStyleSheet({
	root: {
		width: '1.75rem',
		height: '1.75rem',
		'margin-left': '-0.375rem',

		'& svg': {
			width: '1.25rem',
			height: '1.25rem'
		}
	},
	checked: {
		color: grey[900]
	}
});


@withStyles(styleSheet)
class Checkbox extends React.Component {
	render() {
		const classes = this.props.classes;

		return (
			<MaterialCheckbox {...this.props} classes={{
				root: classes.root,
				checked: classes.checked,
			}}/>
		);
	}
}

export default Checkbox;