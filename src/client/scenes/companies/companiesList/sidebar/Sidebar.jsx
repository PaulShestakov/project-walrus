import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Popover, Checkbox} from "components";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';
import Separator from "../../../../components/separator/Separator";


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
		}
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadCompanies();
	};

	render() {
		const {t, classes, ...other} = this.props;

		const allCitiesPopover = (
			<Card>
				<Grid container direction="column" spacing={8}>
					{
						this.props.cities.map((city, index) => (
							<Grid item>
								<FormControlLabel
									label={city.label}
									className="my-0 mx-2"
									control={
										<Checkbox name="cities"
											  value={city.value}
											  checked={this.props.filter.selectedCitiesIds.indexOf(city.value) !== -1}
											  onChange={this.handleCheckboxPressed}
										/>
									} />
							</Grid>
						))
					}
				</Grid>
			</Card>
		);

		return (
			<Card className="p-3">
				<Label uppercase bold fontSize="1.5rem">{t('LOCATION')}</Label>
				<Separator className={classes.separator} />
				<div className={classNames(classes.checkboxesContainer, 'mt-3')}>
				{
					this.props.cities.slice(0, 4)
						.concat(
							this.props.cities.slice(4)
								.filter(city => this.props.filter.selectedCitiesIds.indexOf(city.value) > -1)
						)
						.map((city, index) => {
							const checked = this.props.filter.selectedCitiesIds.indexOf(city.value) !== -1;

							return (
								<FormControlLabel className={classNames(classes.checkboxWrapper, 'mt-1')}
									label={city.label}
									control={
										<Checkbox value={city.value}
											name="cities"
											checked={checked}
											onChange={this.handleCheckboxPressed}
										/>
									}/>
							)
						})
				}
				</div>
				<Popover isOpen={this.state.isLocationPopoverOpened}
					body={allCitiesPopover}
					preferPlace="left"
					onOuterAction={this.handleLocationPopoverOuterAction}>

					<Button onClick={this.handleOpenLocationPopover}>
						{t('ALL_CITIES')}
					</Button>
				</Popover>
			</Card>
		);
	}
}