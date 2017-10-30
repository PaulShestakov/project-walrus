import React from 'react';
import { Add } from 'material-ui-icons';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Switch, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import { PlusOne } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import {Divider, Typography, Paper} from "material-ui";

import { Field, Fields, FieldArray } from 'redux-form'
import WorkingTimes from "./WorkingTimes/index";
import Phones from "./Phones/index";


@translate(['common'])
@withStyles(styles)
export default class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: 0,
        };
    }

    handleTabPress = (event, index) => {
        this.setState({ selectedAddress: index });
    };

    handleOnAddAddressPress = () => {
        const { fields, cities } = this.props;
        fields.push({
            label: `Адрес ${fields.length + 1}`,
            cities,
            subways: [],
            markers: [{
                position: {
                    lat: 53.9,
                    lng: 27.5
                }
            }],
        });
        this.setState({ selectedAddress: fields.length });
    };

    handleMapLocation = (location, index) => {
        if (location) {
            const { fields } = this.props;
            fields.get(index).markers = [{
                position: location[0].position.toJSON()
            }];
            this.forceUpdate();
        }
    };

    handleCityChange = (item, index) => {
        const { fields, cities } = this.props;
        const foundCity = cities.find(city => item.value === city.value);
        if (foundCity) {
            fields.get(index).city = foundCity;
            fields.get(index).subways = foundCity.subways;
        }
    };

    render() {
        const {t, classes, fields, daysOfWeek, ...other} = this.props;
        return (
            <div>
                <Grid item>
                    <Grid item className="d-flex align-items-center">
                        <Grid container align="center">
                            <Grid item>
                                <Typography type="headline" component="h1" className="mr-4">
                                    Местоположение
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button fab onClick={this.handleOnAddAddressPress}
                                        className={classes.addButton}
                                        color="primary" aria-label="add">
                                    <Add />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Tabs
                    value={this.state.selectedAddress}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    onChange={this.handleTabPress}
                >
                    {
                        fields.map((field, index, fields) => {
                            const curField = fields.get(index);
                            return (
                                <Tab
                                    className={classes.tab}
                                    label={curField.label}
                                    value={index}/>
                            );
                        })
                    }
                </Tabs>
                <SwipeableViews
                    index={this.state.selectedAddress}
                    onChangeIndex={this.handleTabPress}>
                    {
                        fields.map((member, index, fields) => {
                            const curField = fields.get(index);
                            return (
                                <Grid container spacing={0} className="p-2">
                                    <Grid item xs={12} className="my-2">
                                        <Title>Главный офис</Title>
                                        <Field
                                            name={`${member}.isMain`}
                                            component={Switch}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="my-2">
                                        <Title>Город</Title>
                                        <Field name={`${member}.city`}
                                            component={Dropdown}
                                            onChange={(item) => this.handleCityChange(item, index)}
                                            options={curField.cities}/>
                                    </Grid>
                                    <Grid item xs={12} className="my-2">
                                        <Title>Метро</Title>
                                        <Field name={`${member}.subway`}
                                            component={Dropdown}
                                            options={curField.subways}/>
                                    </Grid>

                                    <Grid item xs={12} className="my-2">
                                        <Title>Адрес</Title>
                                        <Field
                                            name={`${member}.address`}
                                            component={Input}
                                            placeholder="Адрес"
                                            fullWidth/>
                                </Grid>

                                    <Grid item xs={12} className="my-2">
                                        <Title className="mb-2">Карта</Title>
                                        <Field
                                            name={`${member}.location`}
                                            component={Map}
                                            search
                                            extMarkers={curField.markers}
                                            mapCenter={curField.markers[0].position}
                                            onMarkersChanged={(item) => this.handleMapLocation(item, index)}/>
                                    </Grid>

                                    <FieldArray
                                        name={`${member}.phones`}
                                        component={Phones}
                                        fullWidth/>

                                    <Grid item xs={12} className="my-2">
                                        <Typography type="headline" component="h1" className="mt-4">
                                            Время работы
                                        </Typography>
                                    </Grid>

                                    <FieldArray
                                        name={`${member}.workingTimes`}
                                        daysOfWeek={daysOfWeek}
                                        component={WorkingTimes}/>

                                </Grid>
                            );
                        })
                    }
                </SwipeableViews>
            </div>
        );
    }
}