import React from 'react';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import { PlusOne } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import {Divider, Typography, Paper} from "material-ui";

import { Field, Fields, FieldArray } from 'redux-form'
import WorkingTimes from "../WorkingTimes/index";


@translate(['common'])
@withStyles(styles)
export default class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            subways: [],
            selectedAddress: 0,
            markers: []
        };
    }

    componentWillMount() {
        // const { fields, addresses } = this.props;
        // addresses.forEach(address => {
        //     fields.push({});
        // });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cities: nextProps.cities
        });
    }

    handleTabPress = (event, index) => {
        this.setState({ selectedAddress: index });
    };

    handleMapLocation = (location) => {
        if (location) {
            this.state.markers.splice(0, 1, location[0]);
            this.props.fields.get(this.state.selectedAddress).location = location[0].position;
        }
    };

    handleCityChange = (event, item) => {
        this.setState({
            subways: this.state.cities.find(i => i.value === item.value).subways
        });
    };

    render() {
        const {t, classes, fields, daysOfWeek, ...other} = this.props;
        return (
            <div>
                <Field
                    component={PlusOne}
                    onClick={() => fields.push({})}/>
                <Tabs
                    value={this.state.selectedAddress}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleTabPress}
                    fullWidth>
                    {
                        fields.map((field, index) => (
                            <Tab
                                className={classes.tab}
                                key={field}
                                label={field.get('label')}
                                value={index}/>
                        ))
                    }
                </Tabs>
                <SwipeableViews
                    index={this.state.selectedAddress}
                    onChangeIndex={this.handleTabPress}>
                    {
                        fields.map((member, index) => (
                            <Grid container spacing={0} className="p-2">
                                <Grid item xs={12} className="my-2">
                                    <Title>Город</Title>
                                    <Field name={`${member}.city`}
                                           component={Dropdown}
                                           onChange={this.handleCityChange}
                                           options={this.state.cities}/>
                                </Grid>
                                <Grid item xs={12} className="my-2">
                                    <Title>Метро</Title>
                                    <Field name={`${member}.subway`}
                                           component={Dropdown}
                                           options={this.state.subways}/>
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
                                    <Title>Карта</Title>
                                    <Map search
                                         markers={this.state.markers}
                                         center={{lat: 53.9, lng: 27.5 }}
                                         onMarkersChanged={this.handleMapLocation}/>
                                </Grid>

                                <Grid item xs={12} className="my-2">
                                    <Typography type="headline" component="h1" className="mt-4">
                                        Время работы
                                    </Typography>
                                </Grid>

                                <FieldArray
                                    name="workingTimes"
                                    daysOfWeek={daysOfWeek}
                                    component={WorkingTimes}/>

                            </Grid>
                        ))
                    }
                </SwipeableViews>

                {/*{*/}
                    {/*this.props.daysOfWeek.map((item, index) => {*/}
                        {/*return (*/}
                            {/*<Grid item xs={8}>*/}
                                {/*<Grid container>*/}
                                    {/*<Grid item xs={6}>*/}
                                        {/*<Title>{item.label}</Title>*/}
                                    {/*</Grid>*/}
                                    {/*<FieldArray />*/}
                                    {/*<Grid item xs={3}>*/}
                                        {/*<FormControl className={classes.formControl}>*/}
                                            {/*<InputLabel htmlFor="from">From</InputLabel>*/}
                                            {/*<Field*/}
                                                {/*name={``}*/}
                                                {/*/>*/}
                                            {/*<Select*/}
                                                {/*value={item.from}*/}
                                                {/*onChange={(event) => this.handleWorkingTimeChange(event, item, 'from')}*/}
                                                {/*input={<Input id="from" />}>*/}
                                                {/*<MenuItem value="">*/}
                                                    {/*<em>None</em>*/}
                                                {/*</MenuItem>*/}
                                                {/*{*/}
                                                    {/*[...new Array(24)].map((x, i) => (*/}
                                                        {/*<MenuItem value={i + 1}>{i + 1}</MenuItem>*/}
                                                    {/*))*/}
                                                {/*}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={3}>*/}
                                        {/*<FormControl className={classes.formControl}>*/}
                                            {/*<InputLabel htmlFor="to">To</InputLabel>*/}
                                            {/*<Select*/}
                                                {/*value={item.to}*/}
                                                {/*onChange={(event) => this.handleWorkingTimeChange(event, item, 'to')}*/}
                                                {/*input={<Input id="to" />}>*/}
                                                {/*<MenuItem value="">*/}
                                                    {/*<em>None</em>*/}
                                                {/*</MenuItem>*/}
                                                {/*{*/}
                                                    {/*[...new Array(24)].map((x, i) => (*/}
                                                        {/*<MenuItem value={i + 1}>{i + 1}</MenuItem>*/}
                                                    {/*))*/}
                                                {/*}*/}
                                            {/*</Select>*/}
                                        {/*</FormControl>*/}
                                    {/*</Grid>*/}
                                {/*</Grid>*/}
                            {/*</Grid>*/}
                        {/*)*/}
                    {/*})*/}
                {/*}*/}
            </div>
        );
    }
}