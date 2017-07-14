import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

@CSSModules(styles)
export default class Label extends React.Component {
	render() {
		let accentStyleClass = '';

		switch (this.props.accent) {
			case 'blue':
				accentStyleClass = 'accentBlue';
				break;
			case 'red':
				accentStyleClass = 'accentRed';
				break;
		}

		const className = [
			this.props.styles.label,
			this.props.styles[accentStyleClass],
			this.props.className
		].join(' ');

		const style = {
			fontSize: this.props.fontSize
		};

		return (
			<span style={style} className={className}>
				{this.props.children}
			</span>
		);
	}
};

Label.defaultProps = {
	fontSize: '1rem',
};

Label.propTypes = {
	fontSize: PropTypes.string,
};
