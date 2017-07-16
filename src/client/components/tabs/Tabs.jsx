import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Form, Tabs as BootstrapTabs, Tab as BootstrapTab } from 'react-bootstrap';

import './style.global.scss';

export default class Tabs extends React.Component {
	render() {
		return (
			<BootstrapTabs animation={false}
				defaultActiveKey={this.props.defaultActiveKey}
				onSelect={this.props.onSelect}
				className={['componentTabs', this.props.className].join(' ')}>
				{
					this.props.options.map(option => {
						return (
							<BootstrapTab eventKey={option.key} title={option.tabTitle} mountOnEnter={true} unmountOnExit={true}>
								{option.component}
							</BootstrapTab>
						)
					})
				}
			</BootstrapTabs>
		);
	}
}

Tabs.propTypes = {
	defaultActiveKey: PropTypes.string,
	onSelect: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			tabTitle: PropTypes.string,
			component: PropTypes.node
		})
	)
};