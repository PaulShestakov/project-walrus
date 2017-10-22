import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import styles from './styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import classNames from 'classnames';

import {Divider, Typography, Paper} from "material-ui";

@translate(['common'])
@withStyles(styles)
export default class LocationItem extends React.Component {

    constructor(props) {
        super(props);
    }

    openPhones = (event) => {
        event.preventDefault();
    };

    render() {
        const { item, classes } = this.props;
        const today = moment().isoWeekday() - 1;
        let todayWorking;
        if (item.workingTimes) {
            todayWorking = item.workingTimes.find(time => {
                return time.day === today;
            });
        }
        return (
            <Card className="w-100">
                <Grid container spacing={0}
                      className="w-100 p-2"
                      key={item.id}>
                    <Grid item xs={12} className="my-2">
                        Город : {item.city}
                    </Grid>
                    <Grid item xs={12} className="my-2">
                        Адрес : {item.address}
                    </Grid>
                    <Button className="mt-2 text-white"
                            accent="white"
                            onClick={this.props.onLocationClick}>
                        Телефоны
                    </Button>
                    {
                        todayWorking && (
                            <Grid item xs={12}>
                                Сегодня todayWorking ? до {todayWorking.close} : не работает
                            </Grid>
                        )
                    }
                    <Divider className="mt-4 mb-1"/>
                </Grid>
            </Card>

        )
    }
}