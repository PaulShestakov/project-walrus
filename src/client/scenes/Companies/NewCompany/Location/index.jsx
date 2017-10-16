import React from 'react';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';


@translate(['common'])
@withStyles(styles)
export default class Location extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, classes, common, number, ...other} = this.props;

        return (
            <div>
                {number}
                {/*<Grid item xs={8}>*/}
                    {/*<Title>Город</Title>*/}
                    {/*<Dropdown name="city"*/}
                              {/*onChange={(option) =>*/}
                                  {/*this.setState({  selectedCity: option, subways: this.props.common.cities.find(i => i.value === option.value).subways })}*/}
                              {/*value={this.state.selectedCity.label}*/}
                              {/*options={this.props.common.cities}*/}
                              {/*className="mt-2"/>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={8}>*/}
                    {/*<Title>Метро</Title>*/}
                    {/*<Dropdown name="subway"*/}
                              {/*onChange={(option) => this.setState({  selectedSubway: option })}*/}
                              {/*value={this.state.selectedSubway.label}*/}
                              {/*options={this.state.subways}*/}
                              {/*className="mt-2"/>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={8}>*/}
                    {/*<Title>Адрес</Title>*/}
                    {/*<Input name="address" placeholder="Адрес" fullWidth className="mt-2" onChange={(event) => this.setState({ address: event.target.value })}/>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={8}>*/}
                    {/*<Title>Карта</Title>*/}
                    {/*<Map search*/}
                         {/*markers={this.state.markers}*/}
                         {/*center={{lat: 53.9, lng: 27.5 }}*/}
                         {/*onMarkersChanged={(markers) => this.setState({ markers })}*/}
                         {/*className="mt-2"/>*/}
                {/*</Grid>*/}

                {/*<Grid item xs={8}>*/}
                    {/*<Typography type="headline" component="h1" className="mt-4">*/}
                        {/*Время работы*/}
                    {/*</Typography>*/}
                {/*</Grid>*/}

                {/*{*/}
                    {/*this.state.workingTimes.map((item, index) => {*/}
                        {/*return (*/}
                            {/*<Grid item xs={8}>*/}
                                {/*<Grid container>*/}
                                    {/*<Grid item xs={6}>*/}
                                        {/*<Title>{item.label}</Title>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={3}>*/}
                                        {/*<FormControl className={classes.formControl}>*/}
                                            {/*<InputLabel htmlFor="from">From</InputLabel>*/}
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