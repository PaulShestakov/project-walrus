import React from 'react';
import PropTypes from 'prop-types'

import { FormControl } from 'react-bootstrap';

import './style.module.scss';

export default class SearchInput extends React.Component {
	render() {
		return (
			<FormControl type='text'
				 placeholder={this.props.placeholder}
				 onChange={this.props.handleInputChange}
				 className="searchInput" />
		);
	}
}

SearchInput.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func
};