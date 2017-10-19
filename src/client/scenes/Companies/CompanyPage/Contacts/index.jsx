import React from 'react';
import { translate } from 'react-i18next';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import classNames from 'classnames';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";


@translate(['common'])
export default class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultCenter: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        const { locations } = nextProps;
        if (locations && locations.length > 0) {
            this.setState({ defaultCenter: locations[0].position });
        }
    }

    render() {
        const {t, classes, locations = [], ...other} = this.props;
        const today = moment().isoWeekday() - 1;
        return (
                <div className="my-4">
                {
                    locations && locations.length > 0 && (
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                            <Paper>
                                {
                                    locations && locations.map(item => {
                                        let todayWorking;
                                        if (item.workingTimes) {
                                            todayWorking = item.workingTimes.find(time => {
                                                return time.day === today;
                                            });
                                        }
                                        return (
                                            <div className="w-100 p-2"
                                                 onClick={e => this.setState({ defaultCenter: item.position})}
                                                 key={item.id}>
                                                <div>
                                                    {item.address}
                                                </div>
                                                <p>Телефоны</p>
                                                <div className="d-flex-column">
                                                    {
                                                        item.phones && item.phones.map(phone => (
                                                            <div key={phone.id}>
                                                                {phone.phone}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                {
                                                    todayWorking && (
                                                        <div>
                                                            Сегодня до {todayWorking.close}
                                                        </div>
                                                    ) || (
                                                        <div>
                                                            Сегодня не работает
                                                        </div>
                                                    )
                                                }
                                                <Divider/>
                                            </div>
                                        )
                                    })
                                }
                            </Paper>
                        </Grid>
                            <Grid item xs={8}>
                                <Map markers={locations} center={this.state.defaultCenter}/>
                            </Grid>
                        </Grid>
                    )
                }
                </div>

        );
    }
}