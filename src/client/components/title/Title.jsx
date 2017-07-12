import React from 'react';
import PropTypes from 'prop-types';

const defaultColor = '#106178';

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
	text: '',
	tag: 'h1',
	fontSize: '1rem',
	fontWeight: 'normal',
	textTransform: 'uppercase',
	color: defaultColor,
};

Title.propTypes = {
	text: PropTypes.string,
	tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'span']),
	fontSize: PropTypes.string,
	fontWeight: PropTypes.string,
	textTransform: PropTypes.string,
	color: PropTypes.string,
};