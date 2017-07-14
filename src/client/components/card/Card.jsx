import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './style.module.scss';

@CSSModules(styles)
class Card extends React.Component {
	render() {
		return (
			<div styleName="card" {...this.props}>
				{this.props.children}
			</div>
		);
	}
}

export default Card;