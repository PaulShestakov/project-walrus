import React from 'react';
import FontAwesome from 'react-fontawesome';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Label, Grid, ImageUploader, TextField, Tabs, Tab, Card, Popover, Checkbox} from "components";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';
import Separator from "../../../../components/Separator/index";
import CheckboxesBlock from "./checkboxesBlock/CheckboxesBlock";

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {Link} from "react-router-dom";


@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLocationPopoverOpened: false,
		};
	}

	handleOpenLocationPopover = () => {
		this.setState({
			isLocationPopoverOpened: !this.state.isLocationPopoverOpened
		});
	};

	handleLocationPopoverOuterAction = () => {
		this.setState({
			isLocationPopoverOpened: false
		});
	};

	handleCheckboxPressed = (event) => {
		switch(event.target.name) {
			case 'cities': {
				if (event.target.checked) {
					this.props.addCity(event.target.value);
				} else {
					this.props.removeCity(event.target.value);
				}
				break;
			}
			case 'daysOfWeek': {
				if (event.target.checked) {
					this.props.addDayOfWeek(event.target.value);
				} else {
					this.props.removeDayOfWeek(event.target.value);
				}
				break;
			}
		}
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadCompanies();
	};

	handleChange = () => {

	};


	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Card className={classNames(classes.card, 'mb-3 py-3 text-center')}>

				<Link to="/newCompany" className={classNames(classes.link)}>
					<Button accent="red" disableRipple={true} >
						<FontAwesome name="plus" className="mr-1" />
						Добавить компанию
					</Button>
				</Link>


				<CheckboxesBlock
					formGroupName="cities"
					title={t('LOCATION')}
					showMoreLabel={t('ALL_CITIES')}

					numberOfItemsToShowDefault={4}

					items={this.props.cities}
					selectedIds={this.props.filter.selectedCitiesIds}

					handleCheckboxPressed={this.handleCheckboxPressed}
				/>

				<CheckboxesBlock
					formGroupName="daysOfWeek"
					title={t('WORKING_TIME')}
					showMoreLabel={t('DAYS_OF_WORK')}

					numberOfItemsToShowDefault={0}

					items={this.props.daysOfWeek}
					selectedIds={this.props.filter.selectedDaysOfWeekIds}

					handleCheckboxPressed={this.handleCheckboxPressed}
				/>

				<div className={classNames(classes.timeSelectionContainer, 'p-3')}>
					<Label>{t('FROM') + ':'}</Label>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="from">From</InputLabel>
						<Select
							value={9}
							onChange={this.handleChange('age')}
							input={<Input id="from" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{
								[...new Array(24)].map((x, i) => (
									<MenuItem value={i + 1}>{i + 1}</MenuItem>
								))
							}
						</Select>
					</FormControl>

					<Label>{t('TO') + ':'}</Label>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="to">To</InputLabel>
						<Select
							value={24}
							onChange={this.handleChange('age')}
							input={<Input id="to" />}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{
								[...new Array(24)].map((x, i) => (
									<MenuItem value={i + 1}>{i + 1}</MenuItem>
								))
							}
						</Select>
					</FormControl>
				</div>
			</Card>
		);
	}
}