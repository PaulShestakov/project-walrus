import * as React from "react";
import CSSModules from 'react-css-modules';

import {Link} from "react-router-dom";

import FontAwesome from 'react-fontawesome';
import {translate} from "react-i18next";
import { Button, Card, Label, Separator, Checkbox, Dropdown, Grid } from "components";

import { FormGroup, FormControlLabel } from 'material-ui/Form';

import styles from './style.module.scss';





import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

const options = [
	'None',
	'Atria',
	'Callisto',
	'Dione',
	'Ganymede',
	'Hangouts Call',
	'Luna',
	'Oberon',
	'Phobos',
	'Pyxis',
	'Sedna',
	'Titania',
	'Triton',
	'Umbriel',
];


@translate(['promos'])
@CSSModules(styles)
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			anchorEl: undefined,
			open: false,
		};
        this.filter = this.props.filter;
    }


	handleRequestClose = () => {
		this.setState({ open: false });
	};

	handleClick = event => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	};

    render() {
        const { t, ...other } = this.props;

		// const allBreedsPopover = (
         //    <Popover>
         //        <FormGroup row>
		// 			{
		// 				this.props.breeds && this.props.breeds.map((breed, index) => (
         //                    <Grid item xs={6}>
         //                        <FormControlLabel styleName="formControlLabel" label={breed.name} control={
         //                            <Checkbox value={breed.id}
         //                                  name="breeds"
         //                                  checked={this.filter.breeds.indexOf(breed.id) !== -1}
         //                                  onChange={this.props.onFilterChanged}
         //                            />
         //                        } />
         //                    </Grid>
		// 				))
		// 			}
         //        </FormGroup>
         //    </Popover>
		// );
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
					<Button href="/newPromo" accent="red" className="w-100 text-white">
						<FontAwesome name="plus" className="mr-1" />
						{t('CREATE_PROMO')}
					</Button>
				</Grid>


				<Grid item md={12}>
					<Card className="p-3">

						<Label>{t('SELECT_BREED')}</Label>
						<FormGroup>
							{
								this.props.breeds &&
								this.props.breeds.slice(0, 4)
									.concat(
										this.props.breeds.slice(4)
											.filter(breed => this.filter.breeds.indexOf(breed.id) > -1)
									)
									.map((breed, index) => {
										const checked = this.filter.breeds.indexOf(breed.id) !== -1;

										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={breed.name} control={
													<Checkbox value={breed.id}
														name="breeds"
														checked={checked}
														onChange={this.props.onFilterChanged}
													/>
												}/>
											</Grid>
										)
									})
							}
						</FormGroup>
						{/*<OverlayTrigger trigger="click" rootClose placement="left" overlay={allBreedsPopover} container={this}>*/}
							{/*<ButtonMore className="w-100">{t('ALL_BREEDS')}</ButtonMore>*/}
						{/*</OverlayTrigger>*/}


						<Label className="mt-4">{t('LOCATION')}</Label>
						<FormGroup>
							{
								this.props.cities &&
								this.props.cities.slice(0, 4)
									.concat(
										this.props.cities.slice(4)
											.filter(city => this.filter.cities.indexOf(city.id) > -1)
									)
									.map((city, index) => {
										const checked = this.filter.cities.indexOf(city.id) !== -1;

										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={city.name} control={
													<Checkbox value={city.id}
															  name="cities"
															  checked={checked}
															  onChange={this.props.onFilterChanged}
													/>
												}/>
											</Grid>
										)
									})
							}
						</FormGroup>
						{/*<OverlayTrigger trigger="click" rootClose placement="left" overlay={allCitiesPopover} container={this}>*/}
							{/*<ButtonMore className="w-100">{t('ALL_CITIES')}</ButtonMore>*/}
						{/*</OverlayTrigger>*/}


						<div>
							<IconButton
								aria-label="More"
								aria-owns={this.state.open ? 'long-menu' : null}
								aria-haspopup="true"
								onClick={this.handleClick}
							>
								34
							</IconButton>
							<Menu
								id="long-menu"
								anchorEl={this.state.anchorEl}
								open={this.state.open}
								onRequestClose={this.handleRequestClose}
								style={{ maxHeight: 48 * 4.5 }}
								MenuListProps={{
									style: {
										width: 200,
									},
								}}
							>
								{options.map(option =>
									<MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleRequestClose}>
										{option}
									</MenuItem>,
								)}
							</Menu>
						</div>

					</Card>
				</Grid>
			</Grid>
		)
	}
}