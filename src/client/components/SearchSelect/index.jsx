import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import styles from './styles';

import { findDOMNode } from 'react-dom';

import Input from 'material-ui/Input';
import Button from '../Button/index';
import ClickAwayListener from 'material-ui/es/utils/ClickAwayListener';

import SearchIcon from 'material-ui-icons/Search';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';
import InputAdornment from 'material-ui/es/Input/InputAdornment';

import { MenuItem } from 'material-ui/Menu';
import Fade from 'material-ui/es/transitions/Fade';


@withStyles(styles)
export default class SearchSelect extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			value: props.value,

			inputValue: '',
			isPopoverOpened: false,
			anchorEl: null
		};
	}

    handleOpenDropdown = () => {
    	this.setState({
    		isPopoverOpened: true
    	});
    };

    handleInputChange = (event) => {
    	this.setState({
    		inputValue: event.target.value
    	});
    	this.props.handleSearch(event.target.value);
    };

    handleSuggestionClick = (suggestion) => {
    	this.setState({
    		isPopoverOpened: false
    	});
    	this.props.onChange(suggestion);
    };

    handleClickAway = () => {
    	this.setState({
    		isPopoverOpened: false
    	});
    };

    renderDropdown = () => {
    	const { classes, suggestions } = this.props;
    	const { inputValue, isPopoverOpened  } = this.state;

    	return (
    		<Fade in={isPopoverOpened} transitionDuration="auto" unmountOnExit>
    			<Paper className={classes.dropdown}>
    				<Input
    					className={classes.input}
    					value={inputValue}
    					onChange={this.handleInputChange}
    					startAdornment={
    						<InputAdornment position="start" className={classes.inputAdornment}>
    							<SearchIcon />
    						</InputAdornment>
    					}
    				/>

    				{
    					suggestions.map(suggestion => (

    						<MenuItem
    							key={suggestion.value}
    							disabled={false}
    							selected={false}
    							onClick={() => this.handleSuggestionClick(suggestion)}
    							className={classes.suggestionItem}>
    							{suggestion.label}
    						</MenuItem>
    					))
    				}
    			</Paper>
    		</Fade>
    	);
    };

    renderButton = () => {
    	const { classes, placeholder, value, disabled } = this.props;

    	let label, clickHandler;
    	const buttonClasses = [classes.button];

    	if (disabled) {
    		label = placeholder;
    		buttonClasses.push(classes.buttonDisabled);
    	} else {
    		const selectedOption = this.props.suggestions.find(item => item.value === value);
    		if (selectedOption) {
    			label = selectedOption.label;
    		} else {
    			label = placeholder;
    		}
    		clickHandler = this.handleOpenDropdown;
    	}


    	return (
    		<Button
    			disabled={disabled}
    			accent='white'
    			className={classNames(...buttonClasses)}
    			onClick={clickHandler}>
    			<span className={classes.buttonLabel}>
    				{label}
    			</span>
    			<KeyboardArrowDown className={classes.buttonArrow}/>
    		</Button>
    	);
    };

    render() {
    	const { classes, className } = this.props;

    	return (
    		<ClickAwayListener onClickAway={this.handleClickAway}>
    			<div className={classNames(classes.main, className)}>
    				{
    					[this.renderButton(), this.renderDropdown()]
    				}
    			</div>
    		</ClickAwayListener>
    	);
    }

}

const suggestionPropType = {
	value: PropTypes.string,
	label: PropTypes.string,
};

SearchSelect.displayName = 'SearchSelect';

SearchSelect.defaultProps = {
	disabled: true
};

SearchSelect.propTypes = {
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	suggestions: PropTypes.arrayOf(suggestionPropType),

	onChange: PropTypes.func,
	handleSearch: PropTypes.func,
};