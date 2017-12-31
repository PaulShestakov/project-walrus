import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';

class Label extends React.Component {

	getFont = (fontFamily, classes) => {
		switch (fontFamily) {
			case 'fontBebas':
				return classes.fontBebas;
			case 'fontOpenSans':
				return classes.fontOpenSans;
			default:
				return '';
		}
	};

	render() {
		const {classes, className, fontFamily, ...other} = this.props;

		const style = {
			fontSize: this.props.fontSize,
			lineHeight: this.props.fontSize
		};

		return (
			<span style={style}
			  	className={
					classNames(
						classes.label,
						className,
						this.getFont(fontFamily, classes)
					)
				}>
				{this.props.children}
			</span>
		);
	}
};

export default withStyles(styles)(Label);

Label.defaultProps = {
	fontSize: '1.25rem',
	fontFamily: 'fontBebas'
};

Label.propTypes = {
	fontSize: PropTypes.string,
	accent: PropTypes.string,
	fontFamily: PropTypes.oneOf(['fontBebas', 'fontOpenSans'])
};
