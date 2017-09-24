import React from 'react';
import FontAwesome from 'react-fontawesome';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Popover, Checkbox} from "components";
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';
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
				<Button accent="red" disableRipple={true} className='w-100 my-2'>
					<Link to="/newCompany" className={classes.link}>
						<FontAwesome name="plus" className="mr-1" />
                        Добавить компанию
					</Link>
				</Button>
				<Title uppercase>{t('CITY')}</Title>
				{
					this.props.cities.slice(0, 4)
						.concat(
							this.props.cities.slice(4)
								.filter(city => this.props.filter.selectedCitiesIds.indexOf(city.value) > -1)
						)
						.map((city, index) => {
							const checked = this.props.filter.selectedCitiesIds.indexOf(city.value) !== -1;

							return (
								<Grid item xs={6}>
									<FormControlLabel className="m-0" label={city.label} control={
										<Checkbox value={city.value}
												  name="cities"
												  checked={checked}
												  onChange={this.handleCheckboxPressed}
										/>
									}/>
								</Grid>
							)
						})
				}
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