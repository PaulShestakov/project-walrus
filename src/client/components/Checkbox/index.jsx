import React from 'react';
import MaterialCheckbox from 'material-ui/Checkbox';
import classNames from 'classnames';
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
		const { classes, className, ...other } = this.props;

		return (
			<MaterialCheckbox {...other} className={classNames(classes.main, className)} />
		);
	}
}

export default Checkbox;