import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'react-bootstrap';

import styles from './style.scss';

@CSSModules(styles)
class Button extends React.Component {
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
		return (
			<BootstrapButton {...this.props}
				className={[this.props.styles.button, this.props.styles[accentStyleClass], this.props.className].join(' ')}>
				{this.props.text}
			</BootstrapButton>
		);
	}
}

Button.propTypes = {
	accent: PropTypes.oneOf(['blue', 'red'])
};

export default Button;