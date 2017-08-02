import React from 'react';
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules';
import { FormControl } from 'react-bootstrap';

import styles from './style.module.scss';


@CSSModules(styles)
export default class SearchInput extends React.Component {
	render() {
		return (
			<FormControl type='text'
				 placeholder={this.props.placeholder}
				 onChange={this.props.handleInputChange}
				 styleName="searchInput" />
		);
	}
}

SearchInput.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func
};