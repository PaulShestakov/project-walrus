import React from 'react';
import CSSModules from 'react-css-modules';
import { FormControl } from 'react-bootstrap';

import styles from './style.module.scss';

@CSSModules(styles)
export default class Textarea extends React.Component {
	render() {
		return (
			<FormControl {...this.props}
				componentClass="textarea"
				styleName="textarea" />
		);
	}
}