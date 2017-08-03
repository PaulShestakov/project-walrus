import * as React from "react";
import CSSModules from 'react-css-modules';
import Col from "react-bootstrap/es/Col";
import {Link} from "react-router-dom";
import { OverlayTrigger, Popover, Row } from "react-bootstrap";
import FontAwesome from 'react-fontawesome';
import {translate} from "react-i18next";
import { Button, Card, Label, Separator, Checkbox } from "components";
import Dropdown from "react-dropdown";

import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Grid from 'material-ui/Grid';

import styles from './style.module.scss';
import ButtonMore from "../buttonMore/ButtonMore";


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

	handleClick = event => {
		this.setState({ open: true, anchorEl: event.currentTarget });
	};

	handleRequestClose = () => {
		this.setState({ open: false });
	};

    render() {
        const t = this.props.t;

        const animals = this.props.animals.map(animal => {
            return {
                value: animal.animalId,
                label: animal.name
            }
        });
        let selectedOptionLabel = animals.find(item => item.value === this.filter.animal);

        if (selectedOptionLabel) {
            selectedOptionLabel = selectedOptionLabel.label;
        }

		const allBreedsPopover = (
            <Popover>
                <FormGroup row>
					{
						this.props.breeds && this.props.breeds.map((breed, index) => (
                            <Grid item xs={6}>
                                <FormControlLabel styleName="formControlLabel" label={breed.name} control={
                                    <Checkbox value={breed.breedId}
                                          name="breeds"
                                          checked={this.filter.breeds.indexOf(breed.breedId) !== -1}
                                          onChange={this.props.onFilterChanged}
                                    />
                                } />
                            </Grid>
						))
					}
                </FormGroup>
            </Popover>
		);

		const allCitiesPopover = (
            <Popover>
                <FormGroup row>
                    {
                        this.props.cities && this.props.cities.map((city, index) => (
                            <Grid item xs={6}>
                                <FormControlLabel styleName="formControlLabel" label={city.name} control={
                                    <Checkbox value={city.cityId}
                                          name="cities"
                                          checked={this.filter.cities.indexOf(city.cityId) !== -1}
                                          onChange={this.props.onFilterChanged}
                                    />
                                } />
                            </Grid>
                        ))
                    }
                </FormGroup>
            </Popover>
		);


        return (
            <Row>
                <Col md={12}>
                    <Link to="/promos/new">
                        <Button accent="red" className="w-100 text-white">
                            <FontAwesome name="plus" />
                            {t('CREATE_PROMO')}
                        </Button>
                    </Link>
                </Col>
                <Col md={12}>
                    <Card className="mt-2 p-3">
                        <Label accent="blue" className="p-2">{t('FILTERS')}</Label>


                        <Label className="mt-4">{t('SELECT_PET')}</Label>
                        <Dropdown options={animals} onChange={this.props.onFilterChanged} value={selectedOptionLabel} />


						<Label className="mt-4">{t('SELECT_BREED')}</Label>
						<FormGroup>
							{
								this.props.breeds &&
								this.props.breeds.slice(0, 4)
									.concat(
										this.props.breeds.slice(4)
											.filter(breed => this.filter.breeds.indexOf(breed.breedId) > -1)
									)
									.map((breed, index) => {
										const checked = this.filter.breeds.indexOf(breed.breedId) !== -1;

										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={breed.name} control={
													<Checkbox value={breed.breedId}
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
						<OverlayTrigger trigger="click" rootClose placement="left" overlay={allBreedsPopover} container={this}>
							<ButtonMore className="w-100">{t('ALL_BREEDS')}</ButtonMore>
						</OverlayTrigger>


						<Label className="mt-4">{t('LOCATION')}</Label>
						<FormGroup>
							{
								this.props.cities &&
								this.props.cities.slice(0, 4)
									.concat(
										this.props.cities.slice(4)
											.filter(city => this.filter.cities.indexOf(city.cityId) > -1)
									)
									.map((city, index) => {
										const checked = this.filter.cities.indexOf(city.cityId) !== -1;

										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={city.name} control={
													<Checkbox value={city.cityId}
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
						<OverlayTrigger trigger="click" rootClose placement="left" overlay={allCitiesPopover} container={this}>
							<ButtonMore className="w-100">{t('ALL_CITIES')}</ButtonMore>
						</OverlayTrigger>
					</Card>
				</Col>
			</Row>
		)
	}

}