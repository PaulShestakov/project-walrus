import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

@CSSModules(styles)
export default class Text extends React.Component {
	render() {
		const style = {
			fontSize: this.props.fontSize
		};
		return (
			<p style={style} styleName="text">
				{this.props.text}
			</p>
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
