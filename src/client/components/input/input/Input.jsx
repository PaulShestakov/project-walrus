import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types'

import { FormControl } from 'react-bootstrap';

import styles from './style.module.scss';

@CSSModules(styles)
class Input extends React.Component {
	render() {
		return (
			<div className={this.props.className}>
				<FormControl type='text'
					name={this.props.name}
					placeholder={this.props.placeholder}
					onChange={this.props.handleInputChange}
					styleName="inputWithUnderline" />

				<div styleName="inputUnderline"></div>
			</div>
		);
	}
}

Input.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func
};

export default Input;