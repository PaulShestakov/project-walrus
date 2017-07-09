import React from 'react';
import PropTypes from 'prop-types';

import './styles/style.scss';

export default class Text extends React.Component {
	render() {
		const style = {
			fontSize: this.props.fontSize
		};
		return (
			<span style={style} className="text">
				{this.props.text}
			</span>
		);
	}
};

Text.defaultProps = {
	fontSize: '1rem',
	text: ''
};

Text.propTypes = {
	fontSize: PropTypes.string,
	text: PropTypes.string
};
