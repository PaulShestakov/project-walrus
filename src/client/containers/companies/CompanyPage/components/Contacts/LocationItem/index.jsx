import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import styles from './styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import classNames from 'classnames';

@translate(['common'])
@withStyles(styles)
export default class LocationItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { item, classes } = this.props;
        const today = moment().isoWeekday() - 1;
        let todayWorking;
        if (item.workingTimes && item.workingTimes.length > 0) {
            todayWorking = item.workingTimes.find(time => {
                return time.day === today;
            });
        }
        todayWorking = todayWorking ? `до ${todayWorking.close}` : 'не работает';
        return (
            <Grid container spacing={16}
                  className="w-100 px-2 py-1"
                  key={item.id}>
                <Grid item xs={12}>
                    {item.address}
                </Grid>
                <Grid item xs={12} className={classes.workingTime}>
                    Сегодня {todayWorking}
                </Grid>
                <Grid item xs={12}>
                    <Button className="text-white"
                            accent="white"
                            onClick={this.props.onLocationClick}>
                        Телефоны
                    </Button>
                </Grid>
            </Grid>
        )
    }
}