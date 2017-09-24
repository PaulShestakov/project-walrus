import * as React from "react";
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import {translate} from "react-i18next";
import { Button, Card, Label, Separator, Checkbox, Dropdown, Grid, Popover, Title, ButtonMore } from "components";

import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';

@translate(['promos'])
@withStyles(styles)
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
			isLocationPopoverOpened: false,
			isBreedsPopoverOpened: false,
		};
    }

	handleClick = event => {
		this.setState({ open: !this.state.open, anchorEl: event.currentTarget });
	};


	handleOpenBreedsPopover = () => {
		this.setState({
			isBreedsPopoverOpened: !this.state.isBreedsPopoverOpened,
			isLocationPopoverOpened: false,
		});
	};
	handleOpenLocationPopover = () => {
		this.setState({
			isLocationPopoverOpened: !this.state.isLocationPopoverOpened,
			isBreedsPopoverOpened: false
		});
	};

	handleBreedsPopoverOuterAction = () => {
		this.setState({ isBreedsPopoverOpened: false });
	};
	handleLocationPopoverOuterAction = () => {
		this.setState({ isLocationPopoverOpened: false });
	};


	handleAnimalSelected = option => {
		this.props.setAnimal(option.value, option.label);
		this.props.updateUrlWithStateSource(this.props.history);

		this.props.loadBreeds(option.value);
		this.props.loadPromos();
	};

	handleCheckboxPressed = (event) => {
		switch(event.target.name) {
			case 'breeds': {
				if (event.target.checked) {
					this.props.addBreed(event.target.value);
				} else {
					this.props.removeBreed(event.target.value);
				}
				break;
			}
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
		this.props.loadPromos();
	};

    render() {
        const { t, classes, ...other } = this.props;

		const allBreedsPopover = (
			<Card>
				<Grid container direction="column" spacing={8}>
				{
					this.props.filter.breeds && this.props.filter.breeds.map((breed, index) => (
						<Grid item>
							<FormControlLabel
								label={breed.name}
								className="my-0 mx-2"
								control={
									<Checkbox name="breeds"
										value={breed.id}
										checked={this.props.filter.selectedBreedsIds.indexOf(breed.id) !== -1}
										onFilterChange={this.handleCheckboxPressed}
									/>
								}
							/>
						</Grid>
					))
				}
				</Grid>
			</Card>
		);

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

		// TODO: REMOVE THIS
		const selectedAnimalOption = this.props.animals.find(x => x.value === this.props.filter.selectedAnimalId);
		let selectedAnimalLabel = selectedAnimalOption ? selectedAnimalOption.label : 'Все';

        return (
        	<Grid container direction="column" { ...other }>

				<Grid item md={12}>
					<Button accent="red" disableRipple={true} className='w-100'>
						<Link to="/newPromo" className={classes.link}>
							<FontAwesome name="plus" className="mr-1" />
							{t('CREATE_PROMO')}
						</Link>
					</Button>
				</Grid>


				<Grid item md={12}>
					<Card className="p-3">

						{/* Select animal block */}
						<Label>{t('SELECT_ANIMAL')}</Label>
						<Dropdown name="animal"
							value={selectedAnimalLabel}
							options={this.props.animals}
							onChange={this.handleAnimalSelected}
							className="mt-2"
						/>

						{/* Select breeds block */}
						{
							this.props.filter.breedsAreLoaded
							&&
							<div>
								<Label className="mt-3">{t('SELECT_BREED')}</Label>
								<div>
								{
									this.props.filter.breeds.slice(0, 4).map((breed) => {
										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={breed.name} control={
													<Checkbox name="breeds"
														value={breed.id}
														checked={this.props.filter.selectedBreedsIds.indexOf(breed.id) !== -1}
														onChange={this.handleCheckboxPressed}
													/>
												}/>
											</Grid>
										);
									})
								}
								</div>
								<Popover isOpen={this.state.isBreedsPopoverOpened}
									body={allBreedsPopover}
									preferPlace="left"
									onOuterAction={this.handleBreedsPopoverOuterAction}>

									<ButtonMore onClick={this.handleOpenBreedsPopover}
										disabled={this.props.filter.animal === 'ALL'}>
										{t('ALL_BREEDS')}
									</ButtonMore>
								</Popover>
							</div>

						}


						<Label className="mt-4">{t('SELECT_LOCATION')}</Label>
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

							<ButtonMore onClick={this.handleOpenLocationPopover}>
								{t('ALL_CITIES')}
							</ButtonMore>
						</Popover>
					</Card>
				</Grid>
			</Grid>
		)
	}
}