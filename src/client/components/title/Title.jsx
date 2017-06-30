import React from 'react';
import PropTypes from 'prop-types';

import './styles/style.scss';

export default class Title extends React.Component {
	render() {
		const CustomTag = this.props.tag;

		return (
			<CustomTag className='title'>
				{this.props.text}
			</CustomTag>
		);
	}
};

Title.propTypes = {
	text: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'span'])
}
