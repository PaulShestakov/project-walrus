import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Menu, { MenuItem } from 'material-ui/Menu';

import FontAwesome from 'react-fontawesome';

import {Button} from "react-bootstrap";


import styles from './style.module.scss';

@CSSModules(styles)
class Dropdown extends React.Component {
	constructor(props) {
		super();

		const selectedOption = props.options.find(item => item.key === props.selectedOptionKey);

		this.state = {
			anchorEl: undefined,
			open: false,
			selectedOptionKey: props.selectedOptionKey,
			selectedOptionValue: selectedOption.value,

		}
	}

	handleClick = (event) => {
		this.setState({
			open: true,
			anchorEl: event.currentTarget
		});
	};

	handleRequestClose = (event) => {
		const selectedOptionKey = event.target.id;
		const selectedOption = this.props.options.find(item => item.key === selectedOptionKey);

		// Could not find better solution for now
		if (selectedOption) {
			// Set selected value, close
			this.setState({
				open: false,
				selectedOptionKey: selectedOptionKey,
				selectedOptionValue: selectedOption.value
			});

			this.props.onChange({
				key: selectedOptionKey,
				value: selectedOption.value
			});
		} else {
			// Just close dropdown
			this.setState({
				open: false
			});
		}
	};

	render() {
		return (
			<div>
				<Button styleName="dropdownButton" className="w-100" onClick={this.handleClick}>
					<span>{this.state.selectedOptionValue}</span>
					<FontAwesome name="angle-down" className="ml-2"/>
				</Button>

				<Menu anchorEl={this.state.anchorEl}
					open={this.state.open}
					onRequestClose={this.handleRequestClose}>
					{
						this.props.options.map(option => {
							return (
								<MenuItem id={option.key}
									selected={option.key === this.state.selectedOptionKey}
									onClick={this.handleRequestClose}>
									{option.value}
								</MenuItem>
							);
						})
					}
				</Menu>
			</div>
		);
	}
}

Dropdown.propTypes = {
	selectedOption: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			value: PropTypes.string,
		})
	),
	onChange: PropTypes.func
};

export default Dropdown;