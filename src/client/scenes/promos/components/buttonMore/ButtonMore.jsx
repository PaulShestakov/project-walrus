import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Menu, { MenuItem } from 'material-ui/Menu';

import FontAwesome from 'react-fontawesome';

import {Button} from "react-bootstrap";


import styles from './style.module.scss';

@CSSModules(styles)
class ButtonMore extends React.Component {
	render() {
		return (
			<Button styleName="buttonMore" {...this.props}>
				<FontAwesome name="angle-left" className="mr-2"/>
				{this.props.children}
			</Button>
		);
	}
}

export default ButtonMore;