import React from 'react';
import PropTypes from 'prop-types';
import { Button as BootstrapButton } from 'react-bootstrap';

import './styles/style.scss';

class Button extends React.Component {
	render() {
		let typeStyleClass = '';

		switch (this.props.buttonType) {
			case 'active':
				typeStyleClass = 'activeButton';
				break;
			case 'passive':
				typeStyleClass = 'passiveButton';
				break;
			case 'default':
				typeStyleClass = 'defaultButton';
				break;
		}
		return (
			<BootstrapButton {...this.props}
				className={["button", typeStyleClass, this.props.className].join(' ')}>
				{this.props.text}
			</BootstrapButton>
		);
	}
}

Button.propTypes = {
	buttonType: PropTypes.oneOf(['active', 'passive', 'default'])
};


export default Button;