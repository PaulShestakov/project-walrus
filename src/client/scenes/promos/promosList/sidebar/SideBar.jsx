import * as React from "react";
import FontAwesome from 'react-fontawesome';
import {translate} from "react-i18next";
import { Button, Card, Label, Separator, Checkbox, Dropdown, Grid, Popover, Title } from "components";

import { FormGroup, FormControlLabel } from 'material-ui/Form';
import ButtonMore from "./buttonMore/ButtonMore";


@translate(['promos'])
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
			anchorEl: undefined,
			open: false,
		};
    }


	handleRequestClose = () => {
		this.setState({ open: false });
	};

	handleClick = event => {
		this.setState({ open: !this.state.open, anchorEl: event.currentTarget });
	};

	handlePopoverOuterAction = event => {
		this.setState({ open: false });
	};

	handleAnimalSelected = option => {
		this.props.onAnimalSelected(option.value, option.label);
		this.props.loadBreeds(option.value);
	};


    render() {
        const { t, ...other } = this.props;

		const allBreedsPopover = (
			<Card>
				<FormGroup>
					{
						this.props.filter.breeds && this.props.filter.breeds.map((breed, index) => (
							<FormControlLabel label={breed.name} className="m-0" control={
								<Checkbox name="breeds"
								  	value={breed.id}
									checked={breed.isSelected}
									onFilterChange={this.props.onFilterChange}
								/>
							} />
						))
					}
				</FormGroup>
			</Card>



		);
		//
		// const allCitiesPopover = (
         //    <Popover>
         //        <FormGroup row>
         //            {
         //                this.props.cities && this.props.cities.map((city, index) => (
         //                    <Grid item xs={6}>
         //                        <FormControlLabel styleName="formControlLabel" label={city.name} control={
         //                            <Checkbox value={city.id}
         //                                  name="cities"
         //                                  checked={this.filter.cities.indexOf(city.id) !== -1}
         //                                  onChange={this.props.onFilterChanged}
         //                            />
         //                        } />
         //                    </Grid>
         //                ))
         //            }
         //        </FormGroup>
         //    </Popover>
		// );

        return (
        	<Grid container direction="column" { ...other }>

				<Grid item md={12}>
					<Button href="/newPromo" accent="red" disableRipple={true} className="w-100 text-white">
						<FontAwesome name="plus" className="mr-1" />
						{t('CREATE_PROMO')}
					</Button>
				</Grid>


				<Grid item md={12}>
					<Card className="p-3">

						<Title>{t('SELECT_ANIMAL')}</Title>
						<Dropdown value={this.props.filter.selectedAnimal.label}
							options={this.props.animals}
							onChange={this.handleAnimalSelected}
							placeholder={t('SELECT_CITY')}
							className="mt-2"
						/>


						<Title>{t('SELECT_BREED')}</Title>
						{
							this.props.filter.breeds.slice(0, 4).map((breed) => {
								const checked = this.props.filter.breeds.indexOf(breed.id) !== -1;

								return (
									<Grid item xs={6}>
										<FormControlLabel className="m-0" label={breed.name} control={
										<Checkbox name="breeds"
											  value={breed.id}
											  checked={breed.isSelected}
											  onChange={this.props.onFilterChange}
										/>
									}/>
									</Grid>
								);
							})
						}
						<Popover isOpen={this.state.open}
								 body={allBreedsPopover}
								 preferPlace="left"
								 onOuterAction={this.handlePopoverOuterAction}>

							<ButtonMore onClick={this.handleClick} disabled={this.props.filter.animal === 'ALL'}>
								{t('ALL_BREEDS')}
							</ButtonMore>
						</Popover>







						{/*<Label className="mt-4">{t('LOCATION')}</Label>*/}
						{/*<FormGroup>*/}
							{/*{*/}
								{/*this.props.cities &&*/}
								{/*this.props.cities.slice(0, 4)*/}
									{/*.concat(*/}
										{/*this.props.cities.slice(4)*/}
											{/*.filter(city => this.filter.cities.indexOf(city.id) > -1)*/}
									{/*)*/}
									{/*.map((city, index) => {*/}
										{/*const checked = this.filter.cities.indexOf(city.id) !== -1;*/}

										{/*return (*/}
											{/*<Grid item xs={6}>*/}
												{/*<FormControlLabel className="m-0" label={city.name} control={*/}
													{/*<Checkbox value={city.id}*/}
														{/*name="cities"*/}
														{/*checked={checked}*/}
														{/*onChange={this.props.onFilterChanged}*/}
													{/*/>*/}
												{/*}/>*/}
											{/*</Grid>*/}
										{/*)*/}
									{/*})*/}
							{/*}*/}
						{/*</FormGroup>*/}

					</Card>
				</Grid>
			</Grid>
		)
	}
}