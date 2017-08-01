import * as React from "react";
import CSSModules from 'react-css-modules';
import Col from "react-bootstrap/es/Col";
import {Link} from "react-router-dom";
import Button from "../../../../components/button/Button";
import Card from "../../../../components/card/Card";
import Label from "../../../../components/label/Label";
import {Overlay, OverlayTrigger, Popover, Button as BootstrapButton, Row, FormControl, DropdownButton} from "react-bootstrap";
import FontAwesome from 'react-fontawesome';
import {translate} from "react-i18next";
import { Separator, Dropdown } from "components";

import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

import Grid from 'material-ui/Grid';
import Menu, { MenuItem } from 'material-ui/Menu';


import styles from './style.module.scss';
import ButtonMore from "../buttonMore/ButtonMore";



import { withStyles, createStyleSheet } from 'material-ui/styles';
import grey from 'material-ui/colors/grey';

const styleSheet = createStyleSheet({
	checked: {
		color: grey[900],
	},
});


@translate(['promos'])
@withStyles(styleSheet)
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
		const classes = this.props.classes;

        const animals = this.props.animals.map(animal => {
            return {
                key: animal,
                value: animal
            }
        });

		const allBreedsPopover = (
            <Popover>
                <FormGroup row>
					{
						this.props.breeds && this.props.breeds.map((item, index) => (
                            <Grid item xs={6}>
                                <FormControlLabel styleName="formControlLabel" label={item} control={
                                    <Checkbox value={item}
                                          name="breeds"
                                          checked={this.filter.breeds.indexOf(item) !== -1}
                                          onChange={this.props.onFilterChanged}
                                          classes={{
                                              checked: classes.checked,
                                          }}
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
                        this.props.cities && this.props.cities.map((item, index) => (
                            <Grid item xs={6}>
                                <FormControlLabel styleName="formControlLabel" label={item} control={
                                    <Checkbox value={item}
                                          name="breeds"
                                          checked={this.filter.cities.indexOf(item) !== -1}
                                          onChange={this.props.onFilterChanged}
                                          classes={{
                                              checked: classes.checked,
                                          }}
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
                        <Dropdown options={animals} selectedOptionKey={this.filter.animal} />


                        <Label className="mt-4">{t('SELECT_BREED')}</Label>
                        <FormGroup row>
                            {
								this.props.breeds && this.props.breeds.slice(0, 4).map((item, index) => (
									<FormControlLabel styleName="formControlLabel" label={item} control={
									    <Checkbox value={item}
                                              name="breeds"
                                              checked={this.filter.breeds.indexOf(item) !== -1}
                                              classes={{
                                                  checked: classes.checked,
                                              }}
                                        />
									} />
								))
                            }
                        </FormGroup>
                        <OverlayTrigger trigger="click" rootClose placement="left" overlay={allBreedsPopover} container={this}>
                            <ButtonMore className="w-100">{t('ALL_BREEDS')}</ButtonMore>
                        </OverlayTrigger>


                        <Label className="mt-4">{t('LOCATION')}</Label>
                        <FormGroup row>
							{
								this.props.cities && this.props.cities.slice(0, 4).map((item, index) => (
                                    <Grid item xs={6}>
                                        <FormControlLabel styleName="formControlLabel" label={item} control={
                                            <Checkbox value={item}
                                                  name="breeds"
                                                  checked={this.filter.cities.indexOf(item) !== -1}
                                                  onChange={this.props.onFilterChanged}
                                                  classes={{
                                                      checked: classes.checked,
                                                  }}
                                            />
										} />
                                    </Grid>
								))
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