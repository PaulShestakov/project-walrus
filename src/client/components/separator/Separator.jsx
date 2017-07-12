import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './style.scss';

@CSSModules(styles)
export default class Separator extends React.Component {
	render() {
		return (
			<div {...this.props} styleName="separator"></div>
		);
	}
}