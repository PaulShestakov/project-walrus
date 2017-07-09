import React from 'react';
import PropTypes from 'prop-types';

import './styles/style.scss';

export default class Title extends React.Component {
	render() {
		const CustomTag = this.props.tag;

		const style = {
			fontSize: this.props.fontSize,
			fontWeight: this.props.fontWeight,
			textTransform: this.props.textTransform
		};

		return (
			<CustomTag style={style} className={["title", this.props.className].join(' ')}>
				{this.props.text}
			</CustomTag>
		);
	}
};

Title.defaultProps = {
	fontSize: '1rem',
	fontWeight: 'normal',
	textTransform: 'uppercase',
	text: '',
	tag: 'h1'
};

Title.propTypes = {
	fontSize: PropTypes.string,
	fontWeight: PropTypes.string,
	textTransform: PropTypes.string,
	text: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'span'])
};