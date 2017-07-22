import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Form, Tabs as BootstrapTabs, Tab as BootstrapTab, Nav, NavItem } from 'react-bootstrap';

import './style.global.scss';

export default class Tabs extends React.Component {
	render() {
		return (
			<Nav bsStyle="tabs" activeKey={this.props.activeKey} onSelect={this.props.onSelect}
				className={['componentTabs', this.props.className].join(' ')}>
				{
					this.props.options.map(option => {
						return (
							<NavItem eventKey={option.key}>
								{option.tabTitle}
							</NavItem>
						)
					})
				}
			</Nav>
		);
	}
}

Tabs.propTypes = {
	activeKey: PropTypes.activeKey,
	onSelect: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			tabTitle: PropTypes.string
		})
	)
};